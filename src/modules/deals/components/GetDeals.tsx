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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useGetAssignedQuotes } from "@/modules/quotes/services/quote.service";
import { FaCircle, FaTrash } from "react-icons/fa6";
import Link from "next/link";

interface Props {
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

export const SalesDealsTable = ({ limit, page, setPage }: Props) => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  );

  const { data, isLoading } = useGetAssignedQuotes(limit, page, selectedStatus);
  console.log(data);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="mt-6">
      <div className="mb-4 flex justify-end">
        <Select
          onValueChange={(val) =>
            setSelectedStatus(val === "all" ? undefined : val)
          }
          defaultValue="all"
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status">
              {selectedStatus ? capitalize(selectedStatus) : "All"}
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
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.map((quote: any) => (
              <TableRow key={quote.id}>
                <TableCell><Link href={`deals/${quote.id}`}>{quote.customerName} {quote.customerLastName}</Link></TableCell>
                <TableCell><Link href={`deals/${quote.id}`}>{quote.customerEmail}</Link></TableCell>
                <TableCell>{quote.customerPhone}</TableCell>
                <TableCell>{capitalize(quote.status)}</TableCell>
                <TableCell>${quote.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer ">
                        <FaTrash size={22} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
