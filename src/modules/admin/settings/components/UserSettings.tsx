'use client';

import { useState } from 'react';
import { HiOutlineUsers } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { CreateModal } from '../utils/CreateModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FaTrash } from 'react-icons/fa6';

const mockUsers = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'ADMIN' },
  { id: 2, name: 'Ana Rivera', email: 'ana@example.com', role: 'SALES' },
];

export const UsersSettings = () => {
  const [open, setOpen] = useState(false);

  const handleCreateUser = (data: Record<string, string>) => {
    console.log('Creating user...', data);
    // Aquí puedes hacer tu lógica de creación
  };

  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <HiOutlineUsers size={24} /> Users
        </h2>
        <Button onClick={() => setOpen(true)}>Add User</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Name</TableHead>
              <TableHead className="w-[40%]">Email</TableHead>
              <TableHead className="w-[20%]">Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">                                           
                      <DropdownMenuItem onClick={() => console.log()}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("")} className="text-red-500">
                        <FaTrash size={20} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateUser}
        title="Create User"
        fields={[
          { name: 'name', label: 'Full Name', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'role', label: 'Role', type: 'select', options: ['ADMIN', 'SALES', 'DISTRIBUTOR'] },
        ]}
      />
    </section>
  );
};
