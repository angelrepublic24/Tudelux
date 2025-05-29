import axios, { isAxiosError } from "axios";
import type { LoginFormType, RegisterFormType } from "./../types/index";
import { Api } from "@/global/Global";
import { RegisterDistributorFormType } from "@/schemas";

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

export async function registerDistributor(formData: RegisterDistributorFormType) {
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

export async function login(formData: LoginFormType){
  try {
    const {data} = await Api.post('/auth/login', formData, {
      withCredentials: true
    })
    return data
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function profile (){
  try {
    const {data} = await Api.get('/auth/profile', {
      withCredentials: true
    })
    return data
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}


// src/api/AuthApi.ts o donde tengas tus funciones API
export async function logout() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    if (!res.ok) throw new Error("Logout failed");

    // Puedes redirigir aquí si deseas
    window.location.href = "/auth/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
}


export async function findDistributors(limit = 10, page = 1) {
  const parsedLimit = Number(limit);
  const parsedPage = Number(page);

  if (isNaN(parsedLimit) || isNaN(parsedPage)) {
    throw new Error('Invalid pagination values');
  }

  try {
    const { data } = await Api.get(`/auth/distributors?limit=${parsedLimit}&page=${parsedPage}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error('Error fetching distributors:', error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error fetching distributors');
    }
    throw new Error('Unexpected error occurred');
  }
}

export async function findSellers(limit = 10, page = 1) {
  const parsedLimit = Number(limit);
  const parsedPage = Number(page);

  if (isNaN(parsedLimit) || isNaN(parsedPage)) {
    throw new Error('Invalid pagination values');
  }

  try {
    const { data } = await Api.get(`/auth/sellers?limit=${parsedLimit}&page=${parsedPage}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error('Error fetching distributors:', error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error fetching distributors');
    }
    throw new Error('Unexpected error occurred');
  }
}

