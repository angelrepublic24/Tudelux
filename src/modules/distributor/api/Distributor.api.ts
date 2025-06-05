import { Api } from "@/shared/global/Global";
import { RegisterDistributorFormType } from "@/modules/auth/schemas/auth.schema";
import { isAxiosError } from "axios";

export async function registerDistributor(
  formData: RegisterDistributorFormType
) {
  try {
    const { password_confirmation, ...dataToSend } = formData;
    const { data } = await Api.post("/auth/create-account", dataToSend);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function findDistributors(limit = 10, page = 1, search = "") {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    });

  
    if (search.trim()) {
      params.append("search", search.trim());
    }
    const { data } = await Api.get(`/auth/distributors?${params.toString()}`, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function findDistributorById(id: number) {
  try {
    const { data } = await Api.get(`auth/distributor/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unexpected error occurred");
  }
}