import { Api } from "@/global/Global";

export async function createQuote(formData) {
  try {
    const { data } = await Api.post("/quotes", formData);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getQuotes(limit: number, page: number) {
  try {
    const { data } = await Api.get(`/quotes?limit=${limit}&page=${page}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getQuoteById(id: number) {
  try {
    const { data } = await Api.get(`/quotes/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
