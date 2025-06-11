"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { CustomModal } from "@/shared/components/ui/customModal/CustomModal";
import { QuoteBreakDown } from "./QuoteBreakDown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAssignedQuotes } from "../services/quote.service";

interface Props {
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

export const SalesQuotesTable = ({ limit, page, setPage }: Props) => {
  const router = useRouter();
const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetAssignedQuotes(limit, page, selectedStatus);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="mb-4 flex justify-end">
        <Select onValueChange={(val) => setSelectedStatus(val === 'all' ? undefined : val)} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status">
              {selectedStatus ? capitalize(selectedStatus) : 'All'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.map((quote: any) => (
              <TableRow key={quote.id}>
                <TableCell>{quote.customerName}</TableCell>
                <TableCell>{quote.customerLastName}</TableCell>
                <TableCell>{quote.customerEmail}</TableCell>
                <TableCell>{quote.customerPhone}</TableCell>
                <TableCell>${quote.total.toFixed(2)}</TableCell>
                <TableCell>{capitalize(quote.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/sales/quotes/${quote.id}`)}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedQuote(quote);
                          setIsModalOpen(true);
                        }}
                      >
                        Breakdown
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Breakdown Modal */}
      {selectedQuote && isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedQuote(null);
          }}
        >
          <QuoteBreakDown
            materials={selectedQuote.materials}
            summary={{
              materialCost: selectedQuote.materialCost,
              cutsCost: selectedQuote.cutCost,
              combinedCost: selectedQuote.subtotal,
              markup: selectedQuote.markup,
              pricePlus15Markup: selectedQuote.subtotal + selectedQuote.markup,
              finalMarkup: 0,
              finalTotal: selectedQuote.total,
            }}
            customerInfo={{
              name: selectedQuote.customerName,
              lName: selectedQuote.customerLastName,
              email: selectedQuote.customerEmail,
              phone: selectedQuote.customerPhone,
              address: selectedQuote.address_street,
            }}
            quoteNumber={`Q-${selectedQuote.id}`}
            quoteDate={new Date(selectedQuote.createdAt).toLocaleDateString()}
          />
        </CustomModal>
      )}
    </div>
  );
};
