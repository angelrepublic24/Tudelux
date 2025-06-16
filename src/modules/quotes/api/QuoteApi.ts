import { Api } from "@/shared/global/Global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export async function createQuote(formData) {
  try {
    const { data } = await Api.post("/quotes", formData);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getQuotes( limit: number, page: number, search = "", status?: string) {
  try {
    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    params.append("page", page.toString());
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    const { data } = await Api.get(`/quotes?${params.toString()}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
// export async function getQuotes(limit: number, page: number, search = "", status?: string) {
//   const params = new URLSearchParams();
//   params.append("limit", limit.toString());
//   params.append("page", page.toString());
//   if (search) params.append("search", search);
//   if (status) params.append("status", status);

//   const res = await fetch(`/api/quotes?${params.toString()}`, {
//     method: 'GET',
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Error fetching quotes");
//   }

//   return data;
// }

export async function getQuoteById(id: number) {
  try {
    const { data } = await Api.get(`/quotes/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getQuoteByIdForSales(id: number){
  try {
    const {data} = await Api.get(`/quotes/sales/${id}`, {withCredentials: true});
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error assigning quote");
    }
    throw new Error("Unexpected error");
  }
}

export async function assignQuote(quoteId: number, salesId: number) {
  try {
    const { data } = await Api.post(
      `/quotes/assign/`,
      {
        quoteId,
        salesId,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error assigning quote");
    }
    throw new Error("Unexpected error");
  }
}

export async function getAssignedQuotes(
  limit: number,
  page: number,
  status?: string
) {
  try {
    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    params.append("page", page.toString());
    if (status) params.append("status", status);

    const { data } = await Api.get(`/quotes/assigned?${params.toString()}`, {withCredentials: true});
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error getting assigned quotes");
    }
    throw new Error("Unexpected error");
  }
}

