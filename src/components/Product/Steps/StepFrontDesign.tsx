import { chooseDesign } from "@/utils/chooseDesign";
import React from "react";
import { ChooseProductGrid } from "../ChooseProductGrid";
import { RenderState } from "@/types";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepFrontDesign = ({ setRenderState, setIsRenderOpen }: Props) => {
  return (
    <section className="py-16">
      <div className="flex items-center gap-4 my-10">
        <h4 className="text-[#ff5100] font-semibold text-4xl  whitespace-nowrap">
          <span className="bg-[#ece83a] py-3 px-4 rounded-4xl mr-2">7</span>
          Choose a product
        </h4>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <div className={`flex justify-center gap-10 px-4`}>
        {chooseDesign.map((chooseDesign, index) => (
          <ChooseProductGrid
            key={index}
            product={chooseDesign}
            onSelect={(product) => {
              setRenderState((prev) => ({
                ...prev,
                frontDesign: chooseDesign.name, // o usa product.title si lo defines así
              }));
              setIsRenderOpen?.(true);
            }}
          />
        ))}
      </div>
    </section>
  );
};
