import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignQuote, getAssignedQuotes, getQuoteById, getQuoteByIdForSales, getQuotes } from "../api/QuoteApi";
import { toast } from "react-toastify";

export const useGetQuote = (limit: number, page: number, search: string, status?: string) => {
  return useQuery({
    queryKey: ['quote', limit, page, search, status],
    queryFn: () => getQuotes(limit, page, search, status),
  });
};
export const useGetQuoteById = (id: number) => {
  return useQuery({
    queryKey: ["quote", id],
    queryFn: () => getQuoteById(id),
    enabled: !!id,
  });
};

export const useGetQuoteByIdForSales = (id: number) => {
  return useQuery({
    queryKey: ['quote', id],
    queryFn: () => getQuoteByIdForSales(id),
    enabled: !!id,
  });
};
export const useAssignQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quoteId, userId }: { quoteId: number; userId: number }) =>
      assignQuote(quoteId, userId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['quote'] });
      toast.success(res.message)
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message)
    }
  });

  
};

export const useGetAssignedQuotes = ( limit: number, page: number, status?: string
) => {
  return useQuery({
    queryKey: ['assigned-quotes', limit, page, status],
    queryFn: () => getAssignedQuotes(limit, page, status),
  });
};