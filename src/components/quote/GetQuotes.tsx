"use client";

import { useQuery } from "@tanstack/react-query";
import { FaEllipsisV } from "react-icons/fa";
import { getQuotes } from "@/api/QuoteApi";
import { ActionMenu } from "../ui/ActionMenu/ActionMenu";
import { useRouter } from "next/navigation";

interface Props {
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

export const GetQuotes = ({ limit, page, setPage }: Props) => {
      const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["quotes", limit, page],
    queryFn: () => getQuotes(limit, page),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto h-full">
      <table className="min-w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-sm text-gray-700">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Last Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((quote: any) => (
            <tr key={quote.id} className="border-t text-sm">
              <td className="px-4 py-2">{quote.customerName}</td>
              <td className="px-4 py-2">{quote.customerLastName}</td>
              <td className="px-4 py-2">{quote.customerEmail}</td>
              <td className="px-4 py-2">{quote.customerPhone}</td>
              <td className="px-4 py-2">${quote.total.toFixed(2)}</td>
              <td className="px-4 py-2 relative">
                <ActionMenu
                  onView={() => router.push(`/admin/quotes/${quote.id}`)}
                  onEdit={() => console.log("Edit", quote.id)}
                  onDelete={() => console.log("Delete", quote.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
