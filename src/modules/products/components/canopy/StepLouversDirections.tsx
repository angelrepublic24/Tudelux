import { RenderState } from "@/shared/types";
import React, { useState } from "react";
import { ChooseProductGrid } from "../grid/ChooseProductGrid";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { ContinueButton } from "@/shared/components/ui/continueButton/ContinueButton";
import { Button } from "@headlessui/react";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const louversDirectionData = [
  {
    id: 1,
    name: "On Width",
  },
  {
    id: 1,
    name: "On Projection",
  },
];

export const StepLouversDirections = ({
  setRenderState,
  onContinue,
  setIsRenderOpen,
}: Props) => {
  const [selected, setSelected] = useState("");

  return (
    <section>
      <StepTitle step={10} title={"Louvers direction"} />
      <div className="lg:max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row  justify-center gap-10 mb-5">
          {louversDirectionData.map((louverD) => (
            <Button
              className={`px-8 py-6 font-semibold rounded-2xl w-full text-xl ${
                selected === louverD.name
                  ? "bg-[#ff5100] text-[#ece83a]"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => {
                setRenderState((prev) => ({
                  ...prev,
                  directions: louverD.name.split(" ")[1],
                }));
                onContinue();
              }}
            >
              {louverD.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
