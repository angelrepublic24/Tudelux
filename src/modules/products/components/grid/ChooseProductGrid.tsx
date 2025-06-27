import React from "react";
import { ProductFormType } from "../../schema/product.schema";

type Props = {
  product: ProductFormType & { id: number };
  handleState?: () => void;
  onSelect?: (product: ProductFormType & { id: number }) => void;
  isSelected?: boolean;
  className?: string;
  onContinue?: () => void;
};

export function ChooseProductGrid({
  product,
  handleState,
  onSelect,
  isSelected,
  className,
  onContinue,
}: Props) {
  const cta = product.name.split(" ")[1];

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="mb-12 bg-white w-full flex flex-col items-center justify-start h-[320px] overflow-visible relative rounded-lg shadow">
        <div className="relative w-full bg-[#f0f0f0] h-[320px] flex items-center justify-center">
          {product.video && (
            <video autoPlay loop muted className="h-full">
              <source src={product.video} />
            </video>
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
        {product.name}
      </div>

      <div className="bg-gray-100 border border-gray-300 p-8 w-full h-full flex flex-col justify-between rounded-b-2xl">
        <p className=" text-black mb-2 py-8 text-left">{product.description}</p>
        <div className="bg-white w-full h-[1px]"></div>
        <p className="text-[#ff5100] text-left font-semibold mb-1 py-4">
          {product.name} are:
        </p>
        <ul className="text-gray-700 space-y-1">
          {product.benefits.map((benefit, idx) => (
            <li key={idx} className="text-left">
              {benefit}
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            onSelect?.(product);
            handleState && handleState();
            onContinue?.();
          }}
          className="mt-6 bg-[#ff5100] w-[70%] text-white hover:text-[#ff5100] font-semibold py-4 px-6 rounded-2xl hover:opacity-80 transition hover:bg-[#ece83a] focus:bg-[#ece83a] focus:text-[#ff5100]"
        >
          Go {cta}
        </button>
      </div>
    </div>
  );
}
