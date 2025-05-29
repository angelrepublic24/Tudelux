'use client';

import { CustomerList } from '@/components/customers/CustomerList';
import { useState } from 'react';

export default function CustomerPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#ff5100]">Customers</h1>
        <div>
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

      <CustomerList limit={limit} page={page} setPage={setPage} />
    </section>
  );
}
