"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IUser, LoginFormType, RegisterFormType, UserRole, UserType } from "../types";
import {
  confirmAccount,
  createUserToTeam,
  findCustomerBySales,
  findUsersByRoles,
  forgotPassword,
  login,
  profile,
  register,
  resetPassword,
  updateUser,
  validateToken,
} from "../api/AuthApi";
import { toast } from "react-toastify";
import { Api } from "@/shared/global/Global";
import { UserTeam } from "../schemas/auth.schema";

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

export const useFindUsersByRoles = ({
  roles,
  page = 1,
  limit = 10,
  search = "",
}: {
  roles: UserRole[];
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["users-by-roles", roles, page, limit, search],
    queryFn: () => findUsersByRoles({ roles, page, limit, search }),
  });
};

export const useCreateUserToTeam = () => {
  return useMutation({
    mutationFn: (data: UserTeam) => createUserToTeam(data),
    onError: (error) => toast.error(error.message)
  })
}

export const useUpdateUser = (id: number) => {
  return useMutation({
    mutationFn: (data: UserType) => updateUser(id, data),
    onError: (error) => toast.error(error.message)
  })
}