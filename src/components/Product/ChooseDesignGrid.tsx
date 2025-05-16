import { BaseProduct, ParsedAddOn, RenderState } from "@/types";
import { chooseProduct } from "@/utils/chooseProduct";
import Image from "next/image";
import React from "react";

type Props= {
  addOn: ParsedAddOn | Record<string, any>,
  handleState: (selectedBtn: string) => void,
  buttonToShow?: string[]
  isSelected?: boolean;
  className?: string
};

export function ChooseDesignGrid({addOn, handleState, isSelected, buttonToShow, className
}: Props) {
  return (
    <div  className={`flex flex-col items-center text-center ${className}`}>
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
          {buttonToShow && buttonToShow.map((btnAdd, i) => (
            <button
            onClick={() => {
              handleState(btnAdd)
            }}
            className="bg-[#ff5100] px-6 py-3 text-white hover:opacity-80 rounded-2xl w-full">{btnAdd}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
