"use client";

import { useFindSalesByCode } from "@/modules/sales/services/sales.service";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { useQuoteStore } from "@/shared/store/ui/useQuoteStore";
import { stepRole } from "@/shared/utils/role";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  onContinue: (code?: string) => void; // <-- ahora acepta código
  onReset: () => void;
};

export const StepRole = ({ onContinue, onReset }: Props) => {
const { setSalesCode: setSalesCodeGlobal } = useQuoteStore();

  const [selected, setSelected] = useState("");
  const [salesCode, setSalesCode] = useState("");
  const [validated, setValidated] = useState(false);

  const { refetch, isFetching } = useFindSalesByCode(salesCode);

  const handleSelect = (roleName: string) => {
    setSelected(roleName);
    setValidated(false);
    setSalesCode("");

    if (roleName === "Sales Representative") {
      onReset(); // Resetea si se cambia a Sales Rep
    } else {
      onContinue(); // Avanza si es otro rol
    }
  };

  const handleValidateSalesCode = async () => {
    try {
      const { data } = await refetch();
      if (!data) throw new Error("Sales code not found");

      setValidated(true);
      setSalesCodeGlobal(salesCode);
      toast.success("Sales code validated");
      onContinue(salesCode); // <-- pasa el código al padre
    } catch (err: any) {
      toast.error(err.message || "Invalid Sales Code");
      setValidated(false);
      onReset(); // Si estaba visible el paso siguiente, lo oculta
    }
  };

  const handleSalesCodeChange = (value: string) => {
    // Solo acepta 4 dígitos numéricos
    const clean = value.replace(/\D/g, "").slice(0, 4);
    setSalesCode(clean);
  };

  return (
    <div className="py-6 mb-4">
      <StepTitle step={1} title="Choose your role" />

      {/* Mobile select */}
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

      {/* Desktop buttons */}
      <div className="hidden md:flex justify-between space-x-4 mt-4 md:mt-0">
        {stepRole.map((role, i) => (
          <button
            key={i}
            onClick={() => handleSelect(role.name)}
            className={`px-8 py-6 font-semibold rounded-2xl w-full text-xl ${
              selected === role.name
                ? "bg-[#ff5100] text-[#ece83a]"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {role.name}
          </button>
        ))}
      </div>

      {/* Sales code input */}
      {selected === "Sales Representative" && (
        <div className="mt-6 space-y-4 flex flex-col items-end ">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="Enter 4-digit sales code"
            value={salesCode}
            onChange={(e) => handleSalesCodeChange(e.target.value)}
            className="border border-gray-300 rounded-2xl px-4 py-3 text-lg"
          />
          <button
            disabled={isFetching || salesCode.length !== 4}
            onClick={handleValidateSalesCode}
            className="bg-[#ff5100] text-white px-6 py-3 rounded-2xl disabled:opacity-50"
          >
            {isFetching ? "Validating..." : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
};
