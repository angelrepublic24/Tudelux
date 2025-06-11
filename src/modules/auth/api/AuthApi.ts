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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include', // 🔥 Esto permite recibir la cookie TUDELU_TOKEN
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return {
      success: true,
      user: data.user,
      message: data.message,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || 'Something went wrong',
    };
  }
}

// export async function login(formData: LoginFormType) {
//   try {
//       const res = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     console.log(res)

//     if (!res.ok) {
//       const error = await res.json();
//       throw new Error(error.message);
//     }

//     return await res.json(); // puedes devolver { success: true }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

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
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!res.ok) throw new Error('Logout failed');

    window.location.href = '/auth/login';
  } catch (error) {
    console.error('Logout error:', error);
  }
}




