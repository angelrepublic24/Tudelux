"use client";
import { CustomerContactInfo } from "@/modules/customer/components/ContactInfo";
import { CustomerDetailSidebar } from "@/modules/customer/components/CustomerDetailsSidebar";
import { useFindCustomerByIdCreatedBy } from "@/modules/customer/services/customer.service";
import { DealContactInfo } from "@/modules/deals/components/DealContactInfo";
import { DealDetailsSidebar } from "@/modules/deals/components/DealDetailsSidebar";
import { useGetQuoteById, useGetQuoteByIdForSales } from "@/modules/quotes/services/quote.service";
import { Spinner } from "@/shared/components/ui/Spinner/Spinner";
import { useAuth } from "@/shared/store/ui/useAuth";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const customerId = Number(id);
  const { userId } = useAuth();

const { data, isLoading, isError } = useFindCustomerByIdCreatedBy(customerId);
  if (isLoading) return <Spinner />;
  if (isError || !data) {
    toast.error("Failed to load quote");
    return <p className="text-center text-red-500">Error loading quote.</p>;
  }
  return (
    <main className="flex pt-16 h-screen overflow-hidden">
      {/* Sidebar Izquierdo */}
      <aside className="w-[300px] fixed top-16  h-[calc(100vh-64px)] border-r bg-white shadow-r-md z-10 ">
        <div className="h-full overflow-y-auto p-4  scrollbar-thin-modern">
          <CustomerDetailSidebar customerDetail={data} />
        </div>
      </aside>

      {/* Contenido central */}
      <section className="flex-1 ml-[300px] mr-[300px] mt-0 h-[calc(100vh-64px)] overflow-y-auto p-4">
        {/* <DealOverview deal={data} />
    <EmailThread messages={data.messages || []} />
    <TaskList tasks={data.tasks || []} /> */}
      </section>

      {/* Sidebar Derecho */}
      <aside className="w-[300px] fixed top-16 right-0 h-[calc(100vh-64px)] border-l bg-white shadow-md z-10">
        <div className="h-full overflow-y-auto p-4">
          <CustomerContactInfo contact={data} />
        </div>
      </aside>
    </main>
  );
}
