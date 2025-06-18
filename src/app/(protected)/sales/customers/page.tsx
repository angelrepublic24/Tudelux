'use client';

import { GetCustomersBySales } from '@/modules/auth/components/find/CustomerBySales';
import { SearchInput } from '@/shared/components/ui/searchInput/SearchInput';
import { useState } from 'react';

type Props = {
  salesId: number; // puedes obtenerlo del user auth o pasarlo desde ruta
};

export default function CustomersBySalesPage({ salesId }: Props) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  return (
    <section className="p-6 rounded-xl max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Customers Assigned</h1>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <SearchInput
          value={search}
          onChange={(val) => {
            setPage(1);
            setSearch(val);
          }}
          placeholder="Search customers..."
        />

        <div className="flex items-center">
          <label className="text-sm mr-2 text-gray-600">Rows per page:</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <GetCustomersBySales
        salesId={salesId}
        limit={limit}
        page={page}
        setPage={setPage}
        search={search}
      />
    </section>
  );
}
