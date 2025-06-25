import { Api } from "@/shared/global/Global";
import { isAxiosError } from "axios";
import { CreateClientType } from "../schema/customer.schema";

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

export async function findCustomersByCreatedId({
  limit = 10,
  page = 1,
  search = "",
}: {
  limit?: number;
  page?: number;
  search?: string;
}) {
  const parsedLimit = Number(limit);
  const parsedPage = Number(page);

  if (isNaN(parsedLimit) || isNaN(parsedPage)) {
    throw new Error("Invalid pagination values");
  }

  try {
    const queryParams = new URLSearchParams({
      page: String(parsedPage),
      limit: String(parsedLimit),
    });

    if (search) {
      queryParams.append("search", search);
    }

    const { data } = await Api.get(
      `/auth/customers/by-created?${queryParams.toString()}`,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    console.error("Error fetching customers by creator:", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function createCustomer(customerData: CreateClientType) {
  try {
    const { data } = await Api.post("/auth/create-client", customerData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error creating customer:", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function findCustomerByIdCreatedBy(customerId: number) {
  try {
    const { data } = await Api.get(`/auth/customers/${customerId}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function updateCustomerById(customerId: number, customerData: Partial<CreateClientType>) {
  try {
    const { data } = await Api.patch(`/auth/update/customers/${customerId}`, customerData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error updating customer:", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unexpected error occurred");
  }
}

