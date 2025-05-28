'use client';

import { useState } from 'react';

export default function CompanyPage({ company }: { company: any }) {
  const [form, setForm] = useState({
    name: company?.name || '',
    phoneNumber: company?.phoneNumber || '',
    address: company?.address || '',
    city: company?.city || '',
    state: company?.state || '',
    zipCode: company?.zipCode || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/company/${company.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Update failed');
      alert('Company info updated!');
    } catch (err) {
      alert('Error updating company');
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-[#ff5100] mb-4">Edit Company Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Company Name" className="input" />
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone" className="input" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Street" className="input" />
        <div className="grid grid-cols-3 gap-4">
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="input" />
          <input name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="Zip" className="input" />
        </div>
        <button type="submit" className="bg-[#ff5100] text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600">
          Save Company Info
        </button>
      </form>
    </section>
  );
}
