'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Company, CompanySchema } from '@/schemas';

export default function CompanyPage({ company }: { company: Company & { id: number } }) {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors, isSubmitting },
  // } = useForm<Company>({
  //   resolver: zodResolver(CompanySchema),
  //   defaultValues: company,
  // });

  // const mutation = useMutation({
  //   mutationFn: async (data: Company) => {
  //     const res = await fetch(`/api/company/${company.id}`, {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });
  //     if (!res.ok) throw new Error('Update failed');
  //     return res.json();
  //   },
  //   onSuccess: () => {
  //     alert('Company info updated!');
  //   },
  //   onError: () => {
  //     alert('Error updating company');
  //   },
  // });

  // useEffect(() => {
  //   reset(company);
  // }, [company, reset]);

  // const onSubmit = (data: Company) => {
  //   mutation.mutate(data);
  // };

  // return (
  //   <section className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
  //     <h2 className="text-2xl font-bold text-[#ff5100] mb-4">Edit Company Info</h2>
  //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  //       <input {...register('name')} placeholder="Company Name" className="input" />
  //       {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

  //       <input {...register('phone')} placeholder="Phone" className="input" />

  //       <input {...register('address_street')} placeholder="Street" className="input" />

  //       <div className="grid grid-cols-3 gap-4">
  //         <input {...register('address_city')} placeholder="City" className="input" />
  //         <input {...register('address_state')} placeholder="State" className="input" />
  //         <input {...register('address_zip')} placeholder="Zip" className="input" />
  //       </div>

  //       <button
  //         type="submit"
  //         disabled={isSubmitting}
  //         className="bg-[#ff5100] text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 disabled:opacity-50"
  //       >
  //         {isSubmitting ? 'Saving...' : 'Save Company Info'}
  //       </button>
  //     </form>
  //   </section>
  // );
}
