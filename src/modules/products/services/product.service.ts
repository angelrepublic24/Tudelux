import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductFormType } from "../schema/product.schema";
import {
  createProduct,
  deletProduct,
  findProductById,
  findProducts,
  updateProduct,
} from "../api/product.api";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: ProductFormType) => createProduct(data),
    onError: (error) => toast.error(error.message),
  });
};

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: findProducts,
  });
}

export function useGetProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => findProductById(id),
    enabled: !!id,
  });
}

export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({id, data}: {id:number, data:ProductFormType}) => updateProduct(id, data),
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
