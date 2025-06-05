import { BaseProduct, ParsedAddOn, RenderState } from "@/shared/types";
import { chooseProduct } from "@/shared/utils/chooseProduct";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type Colors = {
  name: string;
  image: string;
  description: string;
  colors: {
    color: string;
    hex: string;
  }[];
};

type Props = {
  color: Colors;
  handleState: (selectedBtn: string) => void;
  isSelected?: boolean;
  className?: string;
};

export function ChooseColorOption({
  color,
  handleState,
  isSelected,
  className,
}: Props) {
  const getBgClass = (hex: string) => {
    switch (hex) {
      case "black":
        return "bg-black";
      case "white":
        return "bg-white text-black";
      case "yellow-800":
        return "bg-yellow-800";
      case "zinc-400":
        return "bg-zinc-400";
      case "yellow-900":
        return "bg-yellow-900";
      default:
        return "bg-gray-300";
    }
  };
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="mb-12 bg-white w-full flex flex-col items-center justify-start h-[320px] overflow-visible relative rounded-lg shadow">
        <div className="relative w-full bg-[#f0f0f0] h-[320px] flex items-center justify-center">
          {color.image && (
            <Image
              src={color.image}
              alt={color.name}
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
        {color.name}
      </div>

      <div className="bg-gray-100 border border-gray-300 p-8  w-full h-full space-y-6  rounded-b-2xl">
        <p className=" text-black mb-2 text-[19px] py-8 text-left">
          {color.description}
        </p>
        <div className="flex flex-col items-center justify-center p-2 space-y-4">
          {color.colors &&
            color.colors.map((c, i) => (
              <button
                onClick={() => {
                  handleState(c.color);
                }}
                className={clsx(
                  getBgClass(c.hex),
                  "px-6 py-3 rounded-2xl w-full hover:opacity-80",
                  c.hex === 'white' ? 'text-black' : 'text-white'
                )}
              >
                {c.color}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
