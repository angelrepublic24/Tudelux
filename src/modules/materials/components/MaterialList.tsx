'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MaterialModal } from './MaterialModal';
import { MaterialFormType } from '../schemas/materials.schema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useGetMaterials } from '../services/material.service';

export const MaterialList = () => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialFormType & { id?: number } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: materials = [], isLoading } = useGetMaterials();

  const filtered = materials.filter((mat) =>
    mat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (material: any) => {
    setSelectedMaterial(material);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedMaterial(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Materials</h1>
        <Button onClick={handleCreate}>+ Create Material</Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search materials..."
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
              <TableHead>Compatible With</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((mat) => (
              <TableRow key={mat.id}>
                <TableCell>{mat.name}</TableCell>
                <TableCell>{mat.description || '-'}</TableCell>
                <TableCell>{mat.compatibleWith.join(', ')}</TableCell>
                <TableCell>{mat.variants?.length || 0}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(mat)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert('Coming soon')}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => alert('Delete logic coming soon')}
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

      {/* Modal */}
      <MaterialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultValues={selectedMaterial ?? undefined}
        isEditing={isEditing}
      />
    </div>
  );
};
