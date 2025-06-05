"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionMenu } from "@/shared/components/ui/ActionMenu/ActionMenu";
import { CustomModal } from "@/shared/components/ui/customModal/CustomModal";
import { QuoteBreakDown } from "./QuoteBreakDown";
import { useGetQuote, useGetQuoteById } from "../services/quote.service";

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

  console.log({selectedQuote});

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
                  onBreakdown={() => {
                    setSelectedQuote(quote); // ✅ Guarda el quote completo
                    setIsModalOpen(true);   // ✅ Abre el modal
                  }}
                  onEdit={() => console.log("Edit", quote.id)}
                  onDelete={() => console.log("Delete", quote.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    pricePlus15Markup: selectedQuote.subtotal + selectedQuote.markup, // si lo necesitas
    finalMarkup: 0, // o algún valor real si aplica
    finalTotal: selectedQuote.total,
  }}
  customerInfo={{
    name: selectedQuote.customerName,
    lName: selectedQuote.customerLastName,
    email: selectedQuote.customerEmail,
    phone: selectedQuote.customerPhone,
    address: selectedQuote.address_street, // o combínalo si necesitas full address
  }}
  quoteNumber={`Q-${selectedQuote.id}`}
  quoteDate={new Date(selectedQuote.createdAt).toLocaleDateString()}
/>

        </CustomModal>
      )}
    </div>
  );
};
