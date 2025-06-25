"use client";
import { useRouter } from "next/navigation";
import { ActionMenu } from "@/shared/components/ui/ActionMenu/ActionMenu";
import { useFindCustomersByCreatedId } from "@/modules/customer/services/customer.service";
import { Spinner } from "@/shared/components/ui/Spinner/Spinner";
import { CreateClientType } from "@/modules/customer/schema/customer.schema";
import { CustomerActionMenu } from "@/modules/customer/components/CustomerActionMenu";
import Link from "next/link";

interface Props {
  limit: number;
  page: number;
  search: string;
  setPage: (page: number) => void;
}

export const BusinessDeveloperCustomerList = ({
  limit,
  page,
  search,
  setPage,
}: Props) => {
  const router = useRouter();
  const { data, isLoading } = useFindCustomersByCreatedId({
    limit,
    page,
    search,
  });
  const customer = data?.data ?? [];

  console.log(data);
  if (isLoading) return <Spinner />;

  return (
    <div className="overflow-x-auto h-full">
      <table className="min-w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-sm text-gray-700">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Last Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">State</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((customer: CreateClientType & { id: number }) => (
            <tr key={customer.id} className="border-t text-sm">
              <td className="px-4 py-2">
                <Link href={`customers/${customer.id}`}>{customer.name}</Link>
              </td>
              <td className="px-4 py-2">
                <Link href={`customers/${customer.id}`}>{customer.lName}</Link>
              </td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.phone}</td>
              <td className="px-4 py-2">{customer.address_state}</td>
              <td className="px-4 py-2 relative">
                <CustomerActionMenu
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
