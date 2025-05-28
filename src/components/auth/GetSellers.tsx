'use client';

import { findSellers } from '@/api/AuthApi';
import { DistributorAndSeller } from '@/types';
import Pagination from '@/utils/Pagination';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

type Props = {
  limit: number;
  page: number;
  setPage: (page: number) => void;
};

type SellerResponse = {
  data: DistributorAndSeller[];
  totalPages: number;
  currentPage: number;
};

export const GetSeller = ({ limit, page, setPage }: Props) => {
  const { data, isLoading, isError, error } = useQuery<SellerResponse>({
    queryKey: ['sellers', limit, page],
    queryFn: () => findSellers(limit, page),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const sellers = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || page;

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="text-center text-gray-500">Loading sellers...</div>
      )}
      {isError && (
        <div className="text-center text-red-500">
          {(error as Error).message}
        </div>
      )}

      {!isLoading && !sellers.length && (
        <div className="text-center text-gray-400 italic">No sellers found.</div>
      )}

      {!isLoading && sellers.length > 0 && (
        <>
          <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-[#f9fafb]">
                <tr>
                  {['Name', 'Email', 'Company', 'Status', 'Created'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {sellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium">{seller.name}</td>
                    <td className="px-6 py-3">{seller.email}</td>
                    <td className="px-6 py-3">{seller.company?.name || '—'}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          seller.status
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {seller.status ? (
                          <>
                            <FaCheckCircle size={12} /> Active
                          </>
                        ) : (
                          <>
                            <FaTimesCircle size={12} /> Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500 text-xs">
                      {new Date(seller.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
};
