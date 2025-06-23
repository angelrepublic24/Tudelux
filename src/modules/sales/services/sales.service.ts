import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSales, findSales, findSalesById} from "../api/sales.api";
import { toast } from "react-toastify";
import { RegisterSaleFormType } from "../schema/sales.schema";

export const useFindSales = (limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['sales', limit, page],
    queryFn: () => findSales(limit, page),
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
  });
};


export const useCreateSales = () => {
  return useMutation({
    mutationFn: (data: RegisterSaleFormType) => createSales(data),
    onError: (error) => toast.error(error.message)
  })
}

export const useFindSalesById = (id) => {
 return useQuery({
     queryKey: ['sales', id],
     queryFn: () => findSalesById(Number(id)),
     enabled: !!id,
   });
}