import { Api } from "@/global/Global";

export async function createQuote(formData) {
  try {
    const { data } = await Api.post("/quotes", formData);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getQuotes(limit: number, page: number, search = '') {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    })

    if(search.trim()){
      params.append('search', search.trim())
    }
    const { data } = await Api.get(`/quotes?${params.toString()}`, {
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
