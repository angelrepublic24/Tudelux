import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { RenderState } from "@/shared/types";
import { chooseShape } from "@/shared/utils/chooseShape";
import Image from "next/image";
import React from "react";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setIsRenderOpen: (open: boolean) => void;
  onContinue: () => void;
};
export const StepChooseShape = ({ setRenderState, setIsRenderOpen, onContinue }: Props)=> {
  return (
    <section className="py-16">
      <StepTitle step={4} title={'Choose a shape'} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        {chooseShape.map((shape, i) => (
          <button
            key={i}
            onClick={() => {
              setRenderState((prev) => ({
                ...prev,
                shape: shape.name,
              }));
              setIsRenderOpen(true);
              onContinue();
            }}
            className="flex flex-col border border-transparent  focus:border-[#ff5100]  rounded-xl items-center bg-gray-100 hover:bg-gray-200 py-8"
          >
            <Image
              src={shape.image}
              alt={shape.name}
              width={300}
              height={300}
            />
            <span className="text-center text-[19px] text-[#ff5100]">
              {shape.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
