import axios, { isAxiosError } from "axios";
import { Api } from "@/shared/global/Global";
import { IUser, LoginFormType, RegisterFormType, UserRole, UserType } from "../types";
import { UserTeam } from "../schemas/auth.schema";

export async function register(formData: RegisterFormType) {
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

export async function confirmAccount(token: string) {
  try {
    const { data } = await Api.post("/auth/confirm-account", { token });
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function forgotPassword(email: string) {
  try {
    const { data } = await Api.post("/auth/forgot-password", { email });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function validateToken(token: string) {
  try {
    const { data } = await Api.post("/auth/validate-token", { token });
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    const { data } = await Api.post(`/auth/reset-password/${token}`, {
      password,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function login(formData: LoginFormType) {
  try {
    const { data } = await Api.post("/auth/login", formData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function profile() {
  try {
    const { data } = await Api.get("/auth/profile", {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function logout() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!res.ok) throw new Error("Logout failed");

    window.location.href = "/auth/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export async function findCustomerBySales(limit = 10, page = 1, search = "") {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    });

    if (search.trim()) {
      params.append("search", search.trim());
    }

    const { data } = await Api.get(
      `/auth/sales/customers?${params.toString()}`,
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function findUsersByRoles({
  roles,
  page = 1,
  limit = 10,
  search = "",
}: {
  roles: UserRole[];
  page?: number;
  limit?: number;
  search?: string;
}) {
  try {
    const params = new URLSearchParams();
    if (roles.length > 0) params.append("roles", roles.join(","));
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (search.trim()) params.append("search", search.trim());

    const { data } = await Api.get(`/auth`, {
      params,
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

export async function createUserToTeam(formData: UserTeam) {
  try {
    const { data } = await Api.post("/auth/create-account/team", formData);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function updateUser(id: number, formData: UserType) {
  try {
    const { data } = await Api.patch(`/auth/update/${id}`, formData);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
