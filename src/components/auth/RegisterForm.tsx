"use client";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerRequest } from "@/api/AuthApi"; // ajusta si tienes otra ruta
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import type { RegisterFormType } from "@/types";
import { ErrorMessage } from "../ui/ErrorMessage/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function RegisterForm() {
  type RegisterFormType = z.infer<typeof RegisterSchema>;

  const ref = useRef<HTMLFormElement>(null);
  const [formError, setFormError] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({ resolver: zodResolver(RegisterSchema) });

  const { mutate: submitRegister, isPending } = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRegister = (formData: RegisterFormType) => {
    setFormError("")
    submitRegister(formData);
  };

  return (
    <>
      <form
        ref={ref}
        className="mt-14 space-y-5"
        noValidate
        onSubmit={handleSubmit(handleRegister)}
      >
        {/* {state.errors.map(error => <ErrorMessage>{error}</ErrorMessage>)}
        {state.success && <SuccessMessage>{state.success}</SuccessMessage>} */}

        <div className="flex flex-col md:flex-row justify-between  gap-2">
          <div className="w-full">
            <label className="font-bold text-2xl text-[#ff5100]">Name</label>
            <input
              type="name"
              placeholder="Name"
              className="w-full border border-gray-300 p-3 rounded-lg"
              {...register("name")}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          <div className="w-full">
            <label className="font-bold text-2xl text-[#ff5100]">
              Last Name
            </label>
            <input
              type="lName"
              placeholder="Last Name"
              className="w-full border border-gray-300 p-3 rounded-lg"
              {...register("lName")}
            />
            {errors.lName && (
              <ErrorMessage>{errors.lName.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl text-[#ff5100]" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl text-[#ff5100]">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl text-[#ff5100]">
            Repeat Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("password_confirmation")}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Sign up"
          className="bg-[#ff5100] hover:opacity-80 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
        />
      </form>
    </>
  );
}
