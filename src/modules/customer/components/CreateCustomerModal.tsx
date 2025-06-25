"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateClientSchema,
  CreateClientType,
} from "../schema/customer.schema";
import { createCustomer } from "../api/customer.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateCustomer } from "../services/customer.service";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCustomerModal({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientType>({
    resolver: zodResolver(CreateClientSchema),
  });
  const queryClient = useQueryClient();

  const mutation = useCreateCustomer();

  const onSubmit = (data: CreateClientType) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Customer created!");
        reset();
        onClose();
        queryClient.invalidateQueries({ queryKey: ["customers-by-created"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Customer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lName">Last Name</Label>
            <Input id="lName" {...register("lName")} />
            {errors.lName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.lName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="address_street">Street</Label>
            <Input id="address_street" {...register("address_street")} />
          </div>

          <div>
            <Label htmlFor="address_city">City</Label>
            <Input id="address_city" {...register("address_city")} />
          </div>

          <div>
            <Label htmlFor="address_state">State</Label>
            <Input id="address_state" {...register("address_state")} />
          </div>

          <div>
            <Label htmlFor="address_zip">Zip Code</Label>
            <Input id="address_zip" {...register("address_zip")} />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
