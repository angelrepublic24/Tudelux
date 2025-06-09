"use client";

import { GetDistributors } from "@/modules/distributor/components/GetDistributors";
import { SearchInput } from "@/shared/components/ui/searchInput/SearchInput";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

export default function DistributorsPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);

  useEffect(() => {
    // Reset page to 1 when search changes
    setPage(1);
  }, [debouncedSearch]);

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Distributors</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search Input */}
        <SearchInput
          value={search}
          onChange={(val) => setSearch(val)} // 👈 solo setSearch
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

      <GetDistributors
        limit={limit}
        page={page}
        setPage={setPage}
        search={search}
      />
    </section>
  );
}
