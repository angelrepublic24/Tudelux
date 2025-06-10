'use client';

import { DistributorAndSeller } from '@/modules/auth/types';
import Pagination from '@/shared/utils/Pagination';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { findSales } from '../api/sales.api';

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
    queryFn: () => findSales(limit, page),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const sales = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || page;

  return (
    <div className="space-y-6 max-w-6cl">
      {/* Loading / Error / Empty States */}
      {isLoading && (
        <div className="text-center text-gray-500">Loading sales...</div>
      )}
      {isError && (
        <div className="text-center text-red-500">{(error as Error).message}</div>
      )}
      {!isLoading && !sales.length && (
        <div className="text-center text-gray-400 italic">No sales found.</div>
      )}

      {/* Table */}
      {!isLoading && sales.length > 0 && (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.name}</TableCell>
                    <TableCell>{sale.email}</TableCell>
                    <TableCell>{sale.company?.name || '—'}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          sale.status
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {sale.status ? (
                          <>
                            <FaCheckCircle size={12} /> Active
                          </>
                        ) : (
                          <>
                            <FaTimesCircle size={12} /> Inactive
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500 text-xs">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};
