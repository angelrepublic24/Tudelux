import { Company, CompanySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export const EditCompanyForm = ({company}: {company: Company & { id: number }}) => {
     const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Company>({
    resolver: zodResolver(CompanySchema),
    defaultValues: company,
  });


  useEffect(() => {
    reset(company);
  }, [company, reset]);

  const onSubmit = (data: Company) => {
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Company Name"
          className="input"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <input {...register("phone")} placeholder="Phone" className="input" />

        <input
          {...register("address_street")}
          placeholder="Street"
          className="input"
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            {...register("address_city")}
            placeholder="City"
            className="input"
          />
          <input
            {...register("address_state")}
            placeholder="State"
            className="input"
          />
          <input
            {...register("address_zip")}
            placeholder="Zip"
            className="input"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#ff5100] text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Company Info"}
        </button>
      </form>
    </>
  );
};
