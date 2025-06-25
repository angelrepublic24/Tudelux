import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCustomer,
  findCustomerByIdCreatedBy,
  findCustomersByCreatedId,
  updateCustomerById,
} from "../api/customer.api";
import { CreateClientType } from "../schema/customer.schema";

export function useFindCustomersByCreatedId({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["customers-by-created", page, limit, search],
    queryFn: () => findCustomersByCreatedId({ page, limit, search }),
  });
}

export function useCreateCustomer() {
  return useMutation({
    mutationFn: async (data: CreateClientType) => {
      return await createCustomer(data);
    },
  });
}

export function useFindCustomerByIdCreatedBy(customerId: number) {
  return useQuery<CreateClientType>({
    queryKey: ["customer-by-id-created", customerId],
    queryFn: () => findCustomerByIdCreatedBy(customerId),
    enabled: !!customerId,
  });
}

export function useUpdateCustomer() {
  return useMutation({
    mutationFn: ({
      customerId,
      data,
    }: {
      customerId: number;
      data: Partial<CreateClientType>;
    }) => updateCustomerById(customerId, data),
  });
}
