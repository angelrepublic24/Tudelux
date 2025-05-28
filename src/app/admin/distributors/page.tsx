'use client';

import { useState } from 'react';
import { useDistributor } from '@/hooks/useDistributor';

export default function DistributorsPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useDistributor(limit, page);
  const distributors = data?.data || [];

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#ff5100]">Sellers</h1>
        <div>
          <label className="text-sm mr-2 text-gray-600">Rows per page:</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={limit}
            onChange={(e) => {
              setPage(1); // Reset page when limit changes
              setLimit(Number(e.target.value));
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {isLoading && <p className="text-gray-600">Loading sellers...</p>}
      {isError && <p className="text-red-500">{(error as Error).message}</p>}

      {!isLoading && !distributors.length && (
        <p className="text-gray-500 italic">No sellers found.</p>
      )}

      {!isLoading && distributors.length > 0 && (
        <div className="overflow-auto border rounded-lg shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {distributors.map((distributor) => (
                <tr key={distributor.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2 font-medium">{distributor.name}</td>
                  <td className="px-4 py-2">{distributor.email}</td>
                  <td className="px-4 py-2">{distributor.company?.name || '—'}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        distributor.status
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {distributor.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(distributor.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
