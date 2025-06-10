"use client";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/shared/components/ui/ErrorMessage/ErrorMessage";
import { useCreateSales } from "../services/sales.service";
import { RegisterSaleFormType, RegisterSaleSchema } from "../schema/sales.schema";
import { toast } from "react-toastify";

export default function RegisterSalesForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSaleFormType>({
    resolver: zodResolver(RegisterSaleSchema),
  });

  const { mutate: submitRegister, isPending } = useCreateSales()

  const handleRegister = (formData: RegisterSaleFormType) => {
    setFormError("");
    submitRegister(formData, {
        onSuccess: (data) => {
            console.log(data);
            toast.success(data)
        }
    });
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

      {/* Address */}
      <div className="grid md:grid-cols-2 gap-2">
        <div>
          <label className="font-bold text-2xl text-[#ff5100]">Street</label>
          <input
            type="text"
            placeholder="Street"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("address_street")}
          />
          {errors.address_street && <ErrorMessage>{errors.address_street.message}</ErrorMessage>}
        </div>
        <div>
          <label className="font-bold text-2xl text-[#ff5100]">City</label>
          <input
            type="text"
            placeholder="City"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("address_city")}
          />
          {errors.address_city && <ErrorMessage>{errors.address_city.message}</ErrorMessage>}
        </div>
        <div>
          <label className="font-bold text-2xl text-[#ff5100]">State</label>
          <input
            type="text"
            placeholder="State"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("address_state")}
          />
          {errors.address_state && <ErrorMessage>{errors.address_state.message}</ErrorMessage>}
        </div>
        <div>
          <label className="font-bold text-2xl text-[#ff5100]">ZIP Code</label>
          <input
            type="text"
            placeholder="ZIP"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("address_zip")}
          />
          {errors.address_zip && <ErrorMessage>{errors.address_zip.message}</ErrorMessage>}
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
