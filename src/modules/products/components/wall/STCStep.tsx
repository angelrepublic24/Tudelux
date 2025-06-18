import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { RenderState } from "@/shared/types";
import React from "react";

const stcOption = [
    {
    name: "36 STC "
    },
    {
    name: "48 STC "
    }
];

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const STCStep = ({ setRenderState, onContinue, setIsRenderOpen,
}: Props) => {
  return (
    <div className="py-16">
      <StepTitle step={5} title="Select your STC" />

      <div className="hidden md:flex justify-center space-x-4 mt-4 md:mt-0">
        {stcOption.map((stc, i) => (
          <button
            key={i}
            onClick={() => {
               onContinue()
            }}
            className="px-8 py-6 font-semibold bg-gray-200 rounded-2xl w-full hover:bg-gray-300 text-xl focus:bg-[#ff5100] focus:text-[#ece83a]"
          >
            {stc.name}
          </button>
        ))}
      </div>
    </div>
  );
};
