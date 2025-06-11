'use client';
import { SalesQuotesTable } from '@/modules/quotes/components/SaleQuoteTable';
import { SearchInput } from '@/shared/components/ui/searchInput/SearchInput';
import { useState } from 'react';

export default function SalesQuotesPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <section className="p-6 rounded-xl max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Quotes</h1>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <SearchInput
          value={search}
          onChange={(val) => {
            setPage(1);
            setSearch(val);
          }}
          placeholder="Search by name or email..."
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

      <SalesQuotesTable limit={limit} page={page} setPage={setPage} />
    </section>
  );
}
