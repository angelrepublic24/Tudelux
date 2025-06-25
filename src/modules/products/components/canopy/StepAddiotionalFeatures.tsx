import { extraFeatures } from "@/shared/data/extraFeatures";
import { RenderState } from "@/shared/types";
import React, { useEffect } from "react";
import { ChooseProductGrid } from "../grid/ChooseProductGrid";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";

type Props = {
  renderState: RenderState;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setIsRenderOpen?: (open: boolean) => void;
  scrollToRef: (ref: React.RefObject<HTMLElement>) => void;
  setActiveStep: (step: number) => void;
  directionRef: React.RefObject<HTMLElement>;
  lightingRef: React.RefObject<HTMLElement>;
  supportRef: React.RefObject<HTMLElement>;
};
export const StepAddiotionalFeatures = ({
  renderState,
  setRenderState,
  setIsRenderOpen,
  setActiveStep,
  scrollToRef,
  directionRef,
  lightingRef,
  supportRef,
}: Props) => {
  const filteredExtras = extraFeatures.filter((extra) => {
    if (
      renderState.productType === "Sunshades" &&
      extra.name.includes("Skylight")
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
  const extra = renderState.extraF?.toLowerCase();

  if (extra === "louvers") {
    setActiveStep(9);
    scrollToRef(directionRef);
  } else if (extra === "skylight") {
    setActiveStep(13);
    scrollToRef(lightingRef);
  } else if (extra === "none") {
    setActiveStep(14);
    scrollToRef(supportRef);
  }
}, [renderState.extraF]);
  return (
    <section>
      <StepTitle step={9} title={"Addiotional features"} />

      <div className="flex flex-col lg:flex-row  justify-center gap-10 mb-4">
        {filteredExtras.map((extra) => (
          <ChooseProductGrid
            key={extra.id}
            product={extra}
            className="w-md"
            handleState={() =>
              setRenderState((prev) => {
                const name = extra.name.toLowerCase();
                let value = "";

                if (name.includes("louvers")) value = "Louvers";
                else if (name.includes("skylight")) value = "Skylight";
                else value = "None";

                return {
                  ...prev,
                  extraF: value,
                };
              })
            }
          />
        ))}
      </div>
      {/* <ContinueButton onContinue={onContinue}/> */}
    </section>
  );
};
