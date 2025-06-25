"use client";

import { useState } from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { CreateModal } from "../utils/CreateModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaTrash } from "react-icons/fa6";
import { USER_ROLE_OPTIONS, UserRole } from "@/modules/auth/types";
import { useFindUsersByRoles } from "@/modules/auth/services/auth.service";
import { Spinner } from "@/shared/components/ui/Spinner/Spinner";

interface Props {
  page: number;
  limit: number;
  search: string;
  onPageChange: (page: number) => void;
}
export const UsersSettings = ({ page, limit, search, onPageChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);

  const { data, isLoading, error, refetch } = useFindUsersByRoles({
    roles: [UserRole.ADMIN, UserRole.SALES, UserRole.ROOT, UserRole.BDR],
    page,
    limit,
    search,
  });
  console.log(data);

  if (isLoading) return <Spinner />;

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
              <TableHead className="w-[40%]">Full Name</TableHead>
              <TableHead className="w-[40%]">Email</TableHead>
              <TableHead className="w-[20%]">Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.name} {user.lName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles}</TableCell>
                <TableCell className="text-right space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditUser(user);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("")}
                        className="text-red-500"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data && (
          <div className="flex justify-end mt-4 gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page >= data.totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {open && (
        <CreateModal
          open={open}
          onClose={() => {
            setOpen(false);
            setEditUser(null);
          }}
          title={editUser ? "Edit User" : "Create User"}
          onRefetch={refetch} // 👈 nuevo prop
          user={
            editUser
              ? {
                  ...editUser,
                  role: editUser.roles?.[0] || "",
                }
              : undefined
          }
        />
      )}
    </section>
  );
};
