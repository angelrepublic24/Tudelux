"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";
import { ConfirmModal } from "@/shared/components/ui/Modals/ConfirmActionModal/ConfirmActionModal";
import { useDeleteProduct, useGetProducts } from "../../services/product.service";
import { ProductFormType } from "../../schema/product.schema";
import { ProductModal } from "./ProductModal";

export const ProductList = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (ProductFormType & { id?: number }) | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const { data: products = [], isLoading } = useGetProducts();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsReadOnly(false);
    setModalOpen(true);
  };

  const handleView = (product: any) => {
    setSelectedProduct(product);
    setIsEditing(false);
    setIsReadOnly(true);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsReadOnly(false); // <- esto es lo que faltaba
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setProductToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete != null) {
      try {
        await deleteProduct(productToDelete);
        toast.success("Product deleted");
      } catch {
        toast.error("Failed to delete product");
      } finally {
        setConfirmOpen(false);
        setProductToDelete(null);
      }
    }
  };

  function truncate(text: string, maxLength = 75) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
        <Button onClick={handleCreate}>+ Create Product</Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{truncate(product.description) || "-"}</TableCell>
                <TableCell>{product.variants?.length || 0}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(product)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleView(product)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultValues={selectedProduct ?? undefined}
        isEditing={isEditing}
        isReadOnly={isReadOnly}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        message="This will permanently delete the product. Are you sure?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};