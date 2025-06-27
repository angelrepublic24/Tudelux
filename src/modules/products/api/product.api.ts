import { Api } from "@/shared/global/Global";
import { isAxiosError } from "axios";
import { ProductFormType } from "../schema/product.schema";

export async function createProduct(productFormData: ProductFormType) {
  try {
    const { data } = await Api.post("/products", productFormData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
  }
}

export async function findProducts() {
  try {
    const { data } = await Api.get("/products");
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
  }
}

export async function findProductById(id: number) {
  try {
    const { data } = await Api.get(`/product/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
  }
}

export async function updateProduct( id: number, productFormData: ProductFormType ) {
  try {
    const { data } = await Api.patch(`/products/${id}`, productFormData, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw new Error("Network error or unexpected failure");
  }
}

export async function deletProduct(id: number) {
  try {
    const { data } = await Api.delete(`/products/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
  }
}
