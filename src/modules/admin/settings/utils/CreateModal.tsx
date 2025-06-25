"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { omit } from "lodash";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IUser,
  USER_ROLE_OPTIONS,
  UserRole,
  UserType,
} from "@/modules/auth/types";
import {
  User,
  UserTeam,
  UserTeamSchema,
} from "@/modules/auth/schemas/auth.schema";
import {
  useCreateUserToTeam,
  useUpdateUser,
} from "@/modules/auth/services/auth.service";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  user?: Partial<User>;
  onRefetch?: () => void; // 👈 esto es lo nuevo
}

export const CreateModal = ({ open, onClose, user, onRefetch }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserTeam>({
    resolver: zodResolver(UserTeamSchema),
    defaultValues: {
      name: "",
      lName: "",
      email: "",
      roles: [],
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        lName: user.lName || "",
        email: user.email || "",
        roles: user.roles || [], // ✅ también aquí
      });
    } else {
      reset(); // reset to defaults on new user
    }
  }, [user, open, reset]);
  const createUser = useCreateUserToTeam();
  const updateUser = user?.id ? useUpdateUser(user.id) : null;

  const onSubmit = async (data: UserType) => {
    const payload = {
      ...data,
      roles: [data.roles[0]], // ✅ mantiene el campo esperado
    };
    if (user?.id && updateUser) {
      await updateUser.mutateAsync(payload, {
        onSuccess: () => {
          toast.success("User has been updated!");
          onRefetch?.(); // 👈 ejecuta si existe
          reset();
          onClose();
        },
      });
    } else {
      await createUser.mutateAsync(data, {
        onSuccess: () => {
          toast.success("User has been added to the team");
          onRefetch?.(); // 👈 ejecuta si existe
          reset();
          onClose();
        },
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="name">First Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="lName">Last Name</Label>
            <Input id="lName" {...register("lName")} />
            {errors.lName && (
              <p className="text-red-500 text-sm">{errors.lName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="role">Role</Label>
            <Select
              value={watch("roles")?.[0] ?? ""}
              onValueChange={(value) => setValue("roles", [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {USER_ROLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.roles && (
              <p className="text-red-500 text-sm">{errors.roles.message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">{user ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
