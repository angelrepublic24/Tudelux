import axios, { isAxiosError } from "axios";
import { Api } from "@/shared/global/Global";
import { LoginFormType, RegisterFormType } from "../types";

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

export async function login(formData: LoginFormType) {
  try {
      const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    console.log(res)

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    return await res.json(); // puedes devolver { success: true }
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
    const res = await fetch('/auth/logout', {
      method: 'POST',
    });

    if (!res.ok) throw new Error('Logout failed');

    window.location.href = '/auth/login';
  } catch (error) {
    console.error('Logout error:', error);
  }
}




