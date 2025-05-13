"use client";
import { RenderState } from "@/types";
import Image from "next/image";
import { useState } from "react";

type Props = {
  productType: {
    name: string;
    type: {
      name: string;
      description: string;
      image: string;
      render: string;
      about: {
        text: string;
        benefits: string[];
      };
    }[];
  };
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setIsRenderOpen: (open: boolean) => void;

};

export const StepKindOfProduct = ({ productType, setRenderState, setIsRenderOpen }: Props) => {
  const [selectedType, setSelectedType] = useState<
    (typeof productType.type)[0] | null
  >(null);
  const howManyTypes = productType.type.length;

  return (
    <section className="py-16">
      <div className="flex items-center gap-4 my-10">
        <h4 className="text-[#ff5100] font-semibold text-4xl  whitespace-nowrap">
          <span className="bg-[#ece83a] py-3 px-4 rounded-4xl mr-2">3</span>
          Choose a product
        </h4>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <div
        className={`flex justify-center gap-10 px-4`}
      >
        {productType.type.map((product, index) => (
          <div key={index} className="flex flex-col items-center text-center w-1/4">
            <div className="mb-12 bg-white w-full flex flex-col items-center justify-start h-[320px] overflow-visible relative rounded-lg shadow">
              <div className="relative w-full bg-[#f0f0f0] h-[320px] flex items-center justify-center">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
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
              {product.name}
            </div>

            <div className="bg-gray-100 border border-gray-300 p-8  w-full h-full space-y-6  rounded-b-2xl">
              <p className=" text-black mb-2 text-[19px] py-8 text-left">
                {product.description}
              </p>
              <div className="bg-white w-full h-[1px]"></div>
              <p className="text-[#ff5100] text-[19px] text-left font-semibold mb-1 py-4">
                {product.about.text}
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                {product.about.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-[19px] text-left">
                    {benefit}
                  </li>
                ))}
              </ul>
              <button
              onClick={() => {
                setRenderState(prev => ({
                  ...prev,
                  title: product.name,
                  renderUrl: product.render,
                }));
                setIsRenderOpen(true);
              }}
              className="mt-6 bg-[#ff5100] w-[70%] text-white font-semibold py-6 px-10 rounded-2xl hover:opacity-80 transition focus:bg-[#ece83a] focus:text-[#ff5100]"
            >
                Go {product.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
