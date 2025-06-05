'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "../../services/auth.service";
import { ProfileType } from "../../types";

const ProfileForm = () => {
  const { data, isLoading } = useProfile()
  const { register, handleSubmit, reset, watch } = useForm<ProfileType>();

  if (isLoading || !data) 
    return <p>Loading...</p>;

  const handleUpdate = () => {};

  return (
    <>
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
        {/* Row 1: Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lName"
              value={data.lName}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* Address Fields */}
        <div>
          <label className="block font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            name="address_street"
            value={data.address_street}
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium text-gray-700">City</label>
            <input
              type="text"
              name="address_city"
              value={data.address_city}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">State</label>
            <input
              type="text"
              name="address_state"
              value={data.address_state}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              name="address_zip"
              value={data.address_zip}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#ff5100] text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
