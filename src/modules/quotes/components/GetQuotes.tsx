'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetQuote } from '../services/quote.service';
import { CustomModal } from '@/shared/components/ui/Modals/customModal/CustomModal';
import { QuoteBreakDown } from './QuoteBreakDown';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { AssignQuoteModal } from './AssignQuoteModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  limit: number;
  page: number;
  setPage: (page: number) => void;
  search: string;
}

export const GetQuotes = ({ limit, page, setPage, search }: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignMode, setAssignMode] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();


  const { data, isLoading } = useGetQuote(limit, page, search, selectedStatus);
  const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className=" mx-auto mt-6 ">
      <div className="mb-4 flex justify-end">
        <Select onValueChange={(val) => setSelectedStatus(val)} defaultValue="">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
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
                <TableCell>{capitalize(quote.status.toString())}</TableCell>
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
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedQuote(quote);
                          setIsModalOpen(true);
                          setAssignMode(true);
                        }}
                      >
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedQuote(quote);
                            setIsModalOpen(true);
                            setAssignMode(true);
                          }}
                        >
                          {quote.assignedTo ? 'Edit Assigned' : 'Assign'}
                        </DropdownMenuItem>
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
      {selectedQuote && isModalOpen && !assignMode && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedQuote(null);
          }}
        >
          <QuoteBreakDown
            materials={selectedQuote}
            summary={{
              materialCost: selectedQuote,
              cutsCost: selectedQuote,
              combinedCost: selectedQuote,
              markup: selectedQuote,
              pricePlus15Markup: selectedQuote + selectedQuote,
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

      {assignMode && selectedQuote && (
        <AssignQuoteModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedQuote(null);
            setAssignMode(false);
          }}
          quoteId={selectedQuote.id}
          onAssigned={() => {
            setIsModalOpen(false);
            setSelectedQuote(null);
            setAssignMode(false);
          }}
          assignedTo={selectedQuote.assignedTo}

        />
      )}
    </div>
  );
};
