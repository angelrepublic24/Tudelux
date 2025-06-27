import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { RenderState } from "@/shared/types";
import React, { useState } from "react";
import { ChooseProductGrid } from "../grid/ChooseProductGrid";
import { ContinueButton } from "@/shared/components/ui/continueButton/ContinueButton";
import { Button } from "@/components/ui/button";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const colors = [
  {
    name: "Standars color",
  },
  {
    name: "Standars color custom locations",
  },
  {
    name: "Custom colors custom location",
  },
];

export const StepColors = ({
  setRenderState,
  onContinue,
  setIsRenderOpen,
}: Props) => {
    const [selected, setSelected] = useState("");
  
  return (
    <section>
      <StepTitle step={15} title="Colors" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {colors.map((color, i) => (
          <Button
            onClick={() => {
              setRenderState((prev) => ({
                ...prev,
                color: color.name,
              }));
              onContinue()
            }}
            className={`px-8 py-8 font-semibold rounded-2xl text-black w-full text-xl ${
                selected === color.name
                  ? "bg-[#ff5100] text-[#ece83a]"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {color.name}
          </Button>
        ))}
      </div>
      {/* <ContinueButton onContinue={onContinue} /> */}
    </section>
  );
};
