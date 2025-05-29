'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getDistributorById } from '@/api/DistributorApi';
import { Loader } from '@/components/ui/Loader';
import { Card } from '@/components/ui/card/Card';
import { MetricCard } from '@/components/ui/card/MetricCard';

export default function DistributorDetailPage() {
  const { id } = useParams();

  const { data: distributor, isLoading } = useQuery({
    queryKey: ['distributor', id],
    queryFn: () => getDistributorById(id),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-[#ff5100] mb-4">
        Distributor: {distributor?.name} {distributor?.lName}
      </h1>

      {/* Datos generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Company">{distributor?.company?.name || 'N/A'}</Card>
        <Card title="Email">{distributor?.email}</Card>
        <Card title="Phone">{distributor?.phone || 'N/A'}</Card>
        <Card title="Status">{distributor?.status ? 'Active' : 'Inactive'}</Card>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <MetricCard title="Quotes" value={distributor?.quoteCount || 0} />
        <MetricCard title="Orders" value={distributor?.orderCount || 0} />
        <MetricCard title="Pending Orders" value={distributor?.pendingOrders || 0} />
        <MetricCard title="Completed Orders" value={distributor?.completedOrders || 0} />
      </div>

      {/* Lista detallada de órdenes si lo deseas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {/* Aquí podrías usar un <OrdersTable orders={distributor.orders} /> */}
      </div>
    </section>
  );
}
