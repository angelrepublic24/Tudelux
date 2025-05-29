'use client';

import { findDistributors } from '@/api/AuthApi';
import { DistributorAndSeller } from '@/types';
import Pagination from '@/utils/Pagination';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

type Props = {
  limit: number;
  page: number;
  setPage: (page: number) => void;
  search: string;
};
type DistributorsResponse = {
  data: DistributorAndSeller[];
  totalPages: number;
  currentPage: number;
};

export const GetDistributors = ({ limit, page, setPage, search }: Props) => {
  const { data, isLoading, isError, error } = useQuery<DistributorsResponse>({
    queryKey: ['distributors', limit, page, search],
    queryFn: () => findDistributors(limit, page, search),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const distributors = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || page;

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="text-center text-gray-500">Loading distributors...</div>
      )}
      {isError && (
        <div className="text-center text-red-500">
          {(error as Error).message}
        </div>
      )}
      {!isLoading && !distributors.length && (
        <div className="text-center text-gray-400 italic">
          No distributors found.
        </div>
      )}

      {!isLoading && distributors.length > 0 && (
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
                {distributors.map((distributor) => (
                  <tr key={distributor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium">{distributor.name}</td>
                    <td className="px-6 py-3">{distributor.email}</td>
                    <td className="px-6 py-3">{distributor.company?.name || '—'}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          distributor.status
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {distributor.status ? (
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
                      {new Date(distributor.createdAt).toLocaleDateString()}
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
