import { useQuery } from "@tanstack/react-query";
import { getQuoteById, getQuotes } from "../api/QuoteApi";

export const useGetQuote = (limit: number, page: number, search: string) => {
  return useQuery({
    queryKey: ["quotes", limit, page, search],
    queryFn: () => getQuotes(limit, page, search),
  });
};
export const useGetQuoteById = (id: number) => {
  return useQuery({
    queryKey: ["quote", id],
    queryFn: () => getQuoteById(id),
    enabled: !!id,
  });
};
