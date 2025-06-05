'use client'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/AuthApi";
import {useRouter } from "next/navigation";
import { LoginSchema } from "../../schemas/auth.schema";
import { LoginFormType } from "../../types";
import { useLogin } from "../../services/auth.service";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ resolver: zodResolver(LoginSchema) });
  const { mutate: loginRequest, isPending } = useLogin();

  const handleLogin = (formData: LoginFormType) => {
    loginRequest(formData);
  };

  return (
    <>
      <form
        className="mt-14 space-y-5"
        noValidate
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl text-[#ff5100]">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("email")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl text-[#ff5100]">Password</label>

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("password")}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-[#ff5100] hover:opacity-80 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
