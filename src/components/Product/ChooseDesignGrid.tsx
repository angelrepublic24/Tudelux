"use client";
import { BaseProduct, ParsedAddOn, RenderState } from "@/types";
import { chooseProduct } from "@/utils/chooseProduct";
import Image from "next/image";
import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { toast } from "react-toastify";

type Props = {
  addOn: ParsedAddOn | Record<string, any>;
  handleState: (selectedBtn: string[]) => void;
  validateCombo: (btn: string) => boolean; // ✅ nueva prop
  buttonToShow?: string[];
  isSelected?: boolean;
  className?: string;
};

export function ChooseDesignGrid({
  addOn,
  validateCombo,
  handleState,
  isSelected,
  buttonToShow,
  className,
}: Props) {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const toggleSelection = (btn: string) => {
    const isDisabled = !validateCombo(btn);

    if (isDisabled) {
      toast.error(
        `"${addOn.name}" cannot be placed on "${btn}" due to a conflict with an existing add-on.`
      );
      return;
    }

    const newSelection = selectedButtons.includes(btn)
      ? selectedButtons.filter((b) => b !== btn)
      : [...selectedButtons, btn];

    setSelectedButtons(newSelection);
    handleState(newSelection); // pasa los seleccionados al padre
  };
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="mb-12 bg-white w-full flex flex-col items-center justify-start h-[320px] overflow-visible relative rounded-lg shadow">
        <div className="relative w-full bg-[#f0f0f0] h-[320px] flex items-center justify-center">
          {addOn.image && (
            <Image
              src={addOn.image}
              alt={addOn.name}
              width={300}
              height={200}
              className="w-full h-full object-contain z-10"
            />
          )}
          <svg
            width="60"
            height="60"
            viewBox="0 0 104 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-[30px] left-1/2 -translate-x-1/2 z-20"
          >
            <rect
              x="-4"
              y="52"
              width="79.196"
              height="79.196"
              rx="10"
              transform="rotate(-45 -4 52)"
              fill="#f0f0f0"
            />
          </svg>
        </div>
      </div>

      <div className="bg-[#ff5100] relative z-10 text-white font-semibold py-6 px-4 rounded-t-2xl w-full text-[19px]">
        {addOn.name}
      </div>

      <div className="bg-gray-100 border border-gray-300 p-8  w-full h-full space-y-6  rounded-b-2xl">
        <p className=" text-black mb-2 text-[19px] py-8 text-left">
          {addOn.description}
        </p>
        <div className="flex flex-col items-center justify-center p-2 space-y-4">
          {buttonToShow &&
            buttonToShow.map((btn) => {
              const isDisabled = !validateCombo(btn);
              const isActive = selectedButtons.includes(btn);

              return (
                <div key={btn} className="w-full flex gap-2">
                  <button
                    onClick={() => toggleSelection(btn)}
                    className={`flex-1 px-4 py-3 rounded-2xl font-semibold text-white transition 
                       ${
                         isDisabled
                           ? "bg-[#ff5100] opacity-50 cursor-not-allowed"
                           : isActive
                           ? "bg-orange-700"
                           : "bg-[#ff5100] hover:opacity-80"
                       }
                      ${
                        isActive
                          ? "bg-orange-700"
                          : "bg-[#ff5100] hover:opacity-80"
                      }`}
                  >
                    {btn}
                  </button>

                  {isActive && (
                    <div className="w-[50px] flex items-center justify-center rounded-2xl bg-yellow-300 text-black text-xl font-bold">
                      <IoCheckmark />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
