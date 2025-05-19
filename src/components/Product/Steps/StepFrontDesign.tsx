import { chooseDesign } from "@/utils/chooseDesign";
import React from "react";
import { ChooseProductGrid } from "../ChooseProductGrid";
import { RenderState } from "@/types";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue : (selectedName?: string) => void
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepFrontDesign = ({ setRenderState, onContinue, setIsRenderOpen }: Props) => {
  return (
    <section className="py-16">
      <StepTitle step={6} title={'Will your canopy have a front design?'} />
      <div className={`flex flex-col lg:flex-row justify-center gap-10 px-4`}>
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
              onContinue(chooseDesign.name)
            }}
            className="flex flex-col items-center text-center w-full lg:w-1/4"
          />
        ))}
      </div>
    </section>
  );
};
