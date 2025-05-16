import { ContinueButton } from "@/components/ui/continueButton/ContinueButton";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";
import { RenderState } from "@/types";
import React from "react";
import { ChooseProductGrid } from "../ChooseProductGrid";
import { ChooseDesignGrid } from "../ChooseDesignGrid";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const colors = [
  {
    name: "Standars color",
    image: "",
    description:
      "Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
    cta: "Standards",
    about: {
      text: "Pergola is:",
      benefits: [
        "Retractable",
        "Occlusive",
        "Remote-controlled",
        "Single sided decor finish",
      ],
    },
  },
  {
    name: "Standars color custom locations",
    image: "",
    description:
      "Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
    cta: "Standars color custom locations",
    about: {
      text: "Pergola is:",
      benefits: [
        "Retractable",
        "Occlusive",
        "Remote-controlled",
        "Single sided decor finish",
      ],
    },
  },
  {
    name: "Custom colors custom location",
    image: "",
    description:
      "Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
    cta: "Custom colors custom location",
    about: {
      text: "Pergola is:",
      benefits: [
        "Retractable",
        "Occlusive",
        "Remote-controlled",
        "Single sided decor finish",
      ],
    },
  },
];

export const StepColors = ({
  setRenderState,
  onContinue,
  setIsRenderOpen,
}: Props) => {
  return (
    <section>
      <StepTitle step={15} title="Colors" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-22">
        {colors.map((color, i) => (
          <ChooseProductGrid
            product={color}
            handleState={() => {
              setRenderState((prev) => ({
                ...prev,
                color: color.name,
              }));
            }}
          />
        ))}
      </div>
      <ContinueButton onContinue={onContinue} />
    </section>
  );
};
