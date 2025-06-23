"use client";

import { GetDistributors } from "@/modules/distributor/components/GetDistributors";
import { SearchInput } from "@/shared/components/ui/searchInput/SearchInput";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

const tabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
];

export default function DistributorsPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeTab]);

  const filtersByTab: Record<string, any> = {
    all: {},
    pending: { isApproved: false, companyStatus: "pending" },
    approved: { isApproved: true, companyStatus: "approved" },
  };

  return (
    <section className="p-6  mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Distributors</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top bar: Search + limit */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <SearchInput
          value={search}
          onChange={(val) => setSearch(val)}
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

      {/* Table */}
      <GetDistributors
        limit={limit}
        page={page}
        setPage={setPage}
        search={debouncedSearch}
        filters={filtersByTab[activeTab]}
      />
    </section>
  );
}
