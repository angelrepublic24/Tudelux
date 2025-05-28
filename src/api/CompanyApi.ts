import { Api } from "@/global/Global";
import { isAxiosError } from "axios";

export async function getCompanyId(id: string) {
  try {
    const { data } = await Api.get(`/api/company/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Error fetching distributors"
      );
    }
  }
}
