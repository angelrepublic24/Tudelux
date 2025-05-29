"use client";

import { useQuery } from "@tanstack/react-query";
import { FaEllipsisV } from "react-icons/fa";
import { ActionMenu } from "../ui/ActionMenu/ActionMenu";
import { useRouter } from "next/navigation";
import { findCustomers } from "@/api/AuthApi";

interface Props {
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

export const CustomerList = ({ limit, page, setPage }: Props) => {
      const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["customers", limit, page],
    queryFn: () => findCustomers(limit, page),
  });

  if (isLoading) return <p>Loading...</p>;

  console.log(data);
  return (
    <div className="overflow-x-auto h-full">
      <table className="min-w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-sm text-gray-700">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Last Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            {/* <th className="px-4 py-2 text-left">Total</th> */}
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((customer: any) => (
            <tr key={customer.id} className="border-t text-sm">
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">{customer.lName}</td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.phone}</td>
              {/* <td className="px-4 py-2">${customer.total.toFixed(2)}</td> */}
              <td className="px-4 py-2 relative">
                <ActionMenu
                  onView={() => router.push(`/admin/customers/${customer.id}`)}
                  onEdit={() => console.log("Edit", customer.id)}
                  onDelete={() => console.log("Delete", customer.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
