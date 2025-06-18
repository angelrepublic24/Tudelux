'use client';
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Pagination from '@/shared/utils/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFindCustomersBySales } from '../../services/auth.service';

type Props = {
  limit: number;
  page: number;
  setPage: (page: number) => void;
  search: string;
};

export const GetCustomersBySales = ({limit, page, setPage, search }: Props) => {
  const { data, isLoading, isError, error } = useFindCustomersBySales(limit, page, search);
  const customers = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || page;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Feedback */}
      {isLoading && <div className="text-center text-gray-500">Loading customers...</div>}
      {isError && <div className="text-center text-red-500">{(error as Error).message}</div>}
      {!isLoading && !customers.length && (
        <div className="text-center text-gray-400 italic">No customers found for this sales rep.</div>
      )}

      {/* Table */}
      {!isLoading && customers.length > 0 && (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((c) => (
                  <TableRow key={c.id} className="text-sm">
                    <TableCell>{c.name} {c.lName}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          c.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {c.status ? (
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
                      {new Date(c.createdAt).toLocaleDateString()}
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
