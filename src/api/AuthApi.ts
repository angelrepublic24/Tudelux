import axios, { isAxiosError } from "axios";
import type { LoginFormType, RegisterDistributorFormType, RegisterFormType } from "./../types/index";
import { Api } from "@/global/Global";

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
    console.log(data)
    return data
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

// export async function login(formData: LoginFormType) {
//   try {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(data.error || "Login failed");
//     }
//     return data;
//   } catch (error) {
//     console.log(error);
//     if (isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.message);
//     }
//   }
// }

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
