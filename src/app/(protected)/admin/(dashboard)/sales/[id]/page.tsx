"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/shared/components/ui/Spinner/Spinner";
import { Card } from "@/shared/components/ui/card/Card";
import { MetricCard } from "@/shared/components/ui/card/MetricCard";
import {
  useFindSales,
  useFindSalesById,
} from "@/modules/sales/services/sales.service";

export default function SalesDetailPage() {
  const { id } = useParams();

  const { data: sales, isLoading } = useFindSalesById(id);

  if (isLoading) return <Spinner />;

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-[#ff5100] mb-4">
        Sales: {sales?.name} {sales?.lName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Email">{sales?.email}</Card>
        <Card title="Phone">{sales?.phone || "N/A"}</Card>
        <Card title="Address">
          {sales?.address_street || ""}, {sales?.address_city || ""},{" "}
          {sales?.address_state || ""} {sales?.address_zip || ""}
        </Card>
        <Card title="Status">{sales?.status ? "Active" : "Inactive"}</Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <MetricCard title="Quotes" value={sales?.quoteCount || 0} />
        <MetricCard title="Orders" value={sales?.orderCount || 0} />
        <MetricCard title="Pending Orders" value={sales?.pendingOrders || 0} />
        <MetricCard
          title="Completed Orders"
          value={sales?.completedOrders || 0}
        />
      </div>
    </section>
  );
}
