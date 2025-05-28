"use client";
import { z } from "zod";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerDistributor as registerRequest } from "@/api/AuthApi";
import { useForm } from "react-hook-form";
import { RegisterDistributorFormType, RegisterDistributorSchema } from "@/schemas";
import { ErrorMessage } from "../ui/ErrorMessage/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function RegisterDistributorForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDistributorFormType>({
    resolver: zodResolver(RegisterDistributorSchema),
  });

  const { mutate: submitRegister, isPending } = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRegister = (formData: RegisterDistributorFormType) => {
    setFormError("");
    submitRegister(formData);
  };

  return (
    <form
      ref={ref}
      className="mt-14 space-y-5"
      noValidate
      onSubmit={handleSubmit(handleRegister)}
    >
      {/* Nombre y Apellido */}
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="w-full">
          <label className="font-bold text-2xl text-[#ff5100]">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("name")}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="w-full">
          <label className="font-bold text-2xl text-[#ff5100]">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("lName")}
          />
          {errors.lName && <ErrorMessage>{errors.lName.message}</ErrorMessage>}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl text-[#ff5100]">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("email")}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl text-[#ff5100]">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("password")}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl text-[#ff5100]">Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("password_confirmation")}
        />
        {errors.password_confirmation && (
          <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl text-[#ff5100]">Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("phone")}
        />
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
      </div>

      {/* Company */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl text-[#ff5100]">Company</label>
        <input
          type="text"
          placeholder="Company Name"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("company")}
        />
        {errors.company && <ErrorMessage>{errors.company.message}</ErrorMessage>}
      </div>

      {/* Address */}
      <div className="grid md:grid-cols-2 gap-2">
        <div>
          <label className="font-bold text-2xl text-[#ff5100]">Street</label>
          <input
            type="text"
            placeholder="Street"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("address.street")}
          />
          {errors.address?.street && <ErrorMessage>{errors.address.street.message}</ErrorMessage>}
        </div>
        <div>
          <label className="font-bold text-2xl text-[#ff5100]">City</label>
          <input
            type="text"
            placeholder="City"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("address.city")}
          />
          {errors.address?.city && <ErrorMessage>{errors.address.city.message}</ErrorMessage>}
        </div>
        <div>
          <label className="font-bold text-2xl text-[#ff5100]">State</label>
          <input
            type="text"
            placeholder="State"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("address.state")}
          />
          {errors.address?.state && <ErrorMessage>{errors.address.state.message}</ErrorMessage>}
        </div>
        <div>
          <label className="font-bold text-2xl text-[#ff5100]">ZIP Code</label>
          <input
            type="text"
            placeholder="ZIP"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("address.zip")}
          />
          {errors.address?.zip && <ErrorMessage>{errors.address.zip.message}</ErrorMessage>}
        </div>
      </div>

      <input
        type="submit"
        value="Sign up"
        className="bg-[#ff5100] hover:opacity-80 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
}
