"use client";

import { GetQuotes } from "@/modules/quotes/components/GetQuotes";
import { SearchInput } from "@/shared/components/ui/searchInput/SearchInput";
import { useState } from "react";

export default function QuotesPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); // ✅ agregar el estado search

  return (
    <section className="p-6 rounded-xl">
      <h1 className="text-xl font-bold text-[#ff5100] mb-4">Quotes</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search Input */}
        <SearchInput
          value={search}
          onChange={(val) => {
            setPage(1);
            setSearch(val);
          }}
          placeholder="Search by name or email..."
        />

        {/* Rows per page */}
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

      <GetQuotes limit={limit} page={page} setPage={setPage} search={search} />
    </section>
  );
}
