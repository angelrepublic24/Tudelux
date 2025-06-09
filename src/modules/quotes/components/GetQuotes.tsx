'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetQuote } from '../services/quote.service';
import { CustomModal } from '@/shared/components/ui/customModal/CustomModal';
import { QuoteBreakDown } from './QuoteBreakDown';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

interface Props {
  limit: number;
  page: number;
  setPage: (page: number) => void;
  search: string;
}

export const GetQuotes = ({ limit, page, setPage, search }: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);

  const { data, isLoading } = useGetQuote(limit, page, search);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6 ">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total</TableHead>
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
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/admin/quotes/${quote.id}`)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedQuote(quote);
                        setIsModalOpen(true);
                      }}>
                        Breakdown
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Edit", quote.id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Delete", quote.id)} className="text-red-500">
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
