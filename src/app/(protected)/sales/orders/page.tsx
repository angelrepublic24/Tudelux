'use client';
import { OrderCard } from '@/modules/orders/components/OrderCard';
import { orders } from '@/shared/data/orderData';

export default function OrdersPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sales Projects</h2>

      {/* Filtros (placeholder) */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <select className="border rounded px-3 py-2 text-sm">
          <option>Filter by</option>
        </select>
        <select className="border rounded px-3 py-2 text-sm">
          <option>Product Type</option>
        </select>
        <select className="border rounded px-3 py-2 text-sm">
          <option>Status</option>
        </select>
      </div>

      {/* Grid de órdenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, i) => (
          <OrderCard key={i} order={order} />
        ))}
      </div>
    </div>
  );
}
