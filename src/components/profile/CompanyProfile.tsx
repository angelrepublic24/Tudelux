'use client';

import { Company } from '@/schemas';
import { EditCompanyForm } from '@/components/company/EditCompanyForm';

export default function CompanyProfile({ company }: { company: Company & { id: number } }) {
  return (
    <section className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-[#ff5100] mb-4">Edit Company Info</h2>
      <EditCompanyForm company={company} />
    </section>
  );
}
