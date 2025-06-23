'use client';
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useGetDistributors } from '../services/distributor.service';
import Pagination from '@/shared/utils/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

type Props = {
  limit: number;
  page: number;
  setPage: (page: number) => void;
  search: string;
  filters?: {
    isApproved?: boolean;
    companyStatus?: string;
  };
};

export const GetDistributors = ({ limit, page, setPage, search, filters = {} }: Props) => {
  const { data, isLoading, isError, error } = useGetDistributors(limit, page, search, filters);
  const distributors = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || page;

  return (
    <div className="space-y-6 ">
      {isLoading && <div className="text-center text-gray-500">Loading distributors...</div>}
      {isError && <div className="text-center text-red-500">{(error as Error).message}</div>}
      {!isLoading && !distributors.length && (
        <div className="text-center text-gray-400 italic">No distributors found.</div>
      )}

      {!isLoading && distributors.length > 0 && (
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
                {distributors.map((d) => (
                  <TableRow key={d.id} className="text-sm">
                    <TableCell>
                      <Link href={`/admin/distributors/${d.id}`}>{d.name}</Link>
                    </TableCell>
                    <TableCell>{d.email}</TableCell>
                    <TableCell>{d.company?.name || '—'}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          d.status
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {d.status ? (
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
                      {new Date(d.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

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
