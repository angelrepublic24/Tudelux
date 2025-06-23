"use client";

import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../services/auth.service";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "../../schemas/auth.schema";
import { z } from "zod";

type ForgotPasswordFormType = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>({ resolver: zodResolver(ForgotPasswordSchema) });;

  const sendRequest = useForgotPassword();
  const onSubmit = (data: ForgotPasswordFormType) => {
    sendRequest.mutate(data.email, {
      onSuccess: (data) => {
        toast.success(data.message)
        reset();
      },
      
    });
  };

  return (
    <form
      className=" mt-14 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 mb-10">
        <label className="font-bold text-2xl">Email</label>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <input
        type="submit"
        value="Send  Instructions"
        className="border border-[#ff5100] hover:bg-[#ff5100] w-full p-3 rounded-lg text-[#ff5100] hover:text-white font-black  text-xl cursor-pointer "
      />
    </form>
  );
}
