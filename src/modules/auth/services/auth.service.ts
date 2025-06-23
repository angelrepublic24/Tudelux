"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginFormType, RegisterFormType } from "../types";
import {
  confirmAccount,
  findCustomerBySales,
  forgotPassword,
  login,
  profile,
  register,
  resetPassword,
  validateToken,
} from "../api/AuthApi";
import { toast } from "react-toastify";
import { Api } from "@/shared/global/Global";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginFormType) => login(data),
    onSuccess: () => {
      return router.push("/dashboard");
    },
    onError: (error: any) => toast.error(error.message),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterFormType) => register(data),
    onSuccess: (data) => toast.success(data),
    onError: (error) => toast.error(error.message),
  });
};

export const useConfirmAccount = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
      toast.success(data);
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profile,
  });
};

export const useFindCustomersBySales = ( limit: number, page: number, search: string ) => {
  return useQuery({
    queryKey: ['customers', limit, page, search],
    queryFn: () => findCustomerBySales(limit, page, search),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onError: (error) => toast.error(error.message)
  })
}

export const useValidateToken = () => {
  return useMutation({
    mutationFn: (token: string) => validateToken(token),
  })
}

export const useResetPassword = (token: string) => {
  return useMutation({
    mutationFn: ( password: string ) => resetPassword(token, password),
  })
}
