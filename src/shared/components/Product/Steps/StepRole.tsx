"use client";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";
import { stepRole } from "@/shared/utils/role";
import React, { useState } from "react";

type Props = {
  onContinue: () => void;
};

export const StepRole = ({ onContinue }: Props) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (roleName: string) => {
    setSelected(roleName);
    onContinue(); // activa siguiente paso y hace scroll
  };
  return (
    <div className="py-6 mb-4">
      <StepTitle step={1} title={"Choose your role"} />
      <div className="block md:hidden w-full">
        <select
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-lg"
        >
          <option value="" disabled>
            Select a role
          </option>
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
            onClick={() => handleSelect(role.name)}
            className="px-8 py-6 font-semibold bg-gray-200 rounded-2xl w-full hover:bg-gray-300 text-xl focus:bg-[#ff5100] focus:text-[#ece83a]"
          >
            {role.name}
          </button>
        ))}
      </div>
    </div>
  );
};
