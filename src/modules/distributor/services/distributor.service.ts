import { useMutation, useQuery } from "@tanstack/react-query";
import { findDistributors, registerDistributor } from "../api/Distributor.api";
import { toast } from "react-toastify";
import { RegisterDistributorFormType } from "@/modules/auth/schemas/auth.schema";
import { DistributorAndSeller } from "@/modules/auth/types";

type DistributorsResponse = {
  data: DistributorAndSeller[];
  totalPages: number;
  currentPage: number;
};

export const useRegisterDistributor = () => {
  return useMutation({
    mutationFn: (data: RegisterDistributorFormType) =>
      registerDistributor(data),
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetDistributors = (limit: number, page: number, search: string) => {
  return useQuery<DistributorsResponse>({
    queryKey: ["distributors", limit, page, search],
    queryFn: () => findDistributors(limit, page, search),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};
