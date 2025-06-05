import { Api } from "@/shared/global/Global";
import { isAxiosError } from "axios";

export async function findCustomers(limit = 10, page = 1) {
  const parsedLimit = Number(limit);
  const parsedPage = Number(page);

  if (isNaN(parsedLimit) || isNaN(parsedPage)) {
    throw new Error("Invalid pagination values");
  }

  try {
    const { data } = await Api.get(
      `/auth/customers?limit=${parsedLimit}&page=${parsedPage}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unexpected error occurred");
  }
}
