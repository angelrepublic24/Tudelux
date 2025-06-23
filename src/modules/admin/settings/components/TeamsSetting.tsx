'use client';

import { useRouter } from 'next/navigation';
import { MdOutlineGroup } from 'react-icons/md';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const rolesSummary = [
  { role: 'ADMIN', members: 3 },
  { role: 'SALES', members: 12 },
  { role: 'DISTRIBUTOR', members: 8 },
  { role: 'SUPPORT', members: 5 },
];

export const TeamsSettings = () => {
  const router = useRouter();

  const handleViewUsers = (role: string) => {
    router.push(`/admin/users?role=${role}`);
  };

  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <MdOutlineGroup size={24} /> Teams Overview
        </h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%]">Role</TableHead>
              <TableHead className="w-[20%]">Members</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rolesSummary.map((item) => (
              <TableRow key={item.role}>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.members}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleViewUsers(item.role)}>
                    View Users
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
