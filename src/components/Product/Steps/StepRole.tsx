'use client'
import { stepRole } from "@/utils/role";
import React, { useState } from "react";

export const StepRole = () => {
  const [selected, setSelected] = useState('');
  return (
    <div className="py-6 mb-4">
      <div className="flex items-center gap-4 my-10">
        <h4 className="text-[#ff5100] font-semibold text-4xl  whitespace-nowrap">
          <span className="bg-[#ece83a] py-3 px-4 rounded-4xl mr-2">1</span>Choose your role
        </h4>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <div className="block md:hidden w-full">
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-lg"
        >
          <option value="" disabled>Select a role</option>
          {stepRole.map((role, i) => (
            <option key={i} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden md:flex justify-between space-x-4 mt-4 md:mt-0">
       {stepRole.map((role, i) => (
        <button 
        key={i}
        onClick={() => setSelected(role.name)}
        className="px-8 py-6 font-semibold bg-gray-200 rounded-2xl w-full hover:bg-gray-300 text-xl focus:bg-[#ff5100] focus:text-[#ece83a]">{role.name}</button>
       ))}
      </div>
    </div>
  );
};
