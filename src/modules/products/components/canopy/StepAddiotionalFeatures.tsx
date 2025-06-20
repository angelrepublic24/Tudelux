import { extraFeatures } from '@/shared/data/extraFeatures';
import { RenderState } from '@/shared/types';
import React, { useEffect } from 'react'
import { ChooseProductGrid } from '../grid/ChooseProductGrid';
import { StepTitle } from '@/shared/components/ui/StepTitle/StepTitle';


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
;

export const StepAddiotionalFeatures = ({
  renderState,
  setRenderState,
  setIsRenderOpen,
  setActiveStep,
  scrollToRef,
  directionRef,
  lightingRef,
  supportRef
}: Props) => {
  const filteredExtras = extraFeatures.filter((extra) => {
    if (renderState.productType === "Sunshades" && extra.name.includes("Skylight")) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (renderState.extraF === "Louvers") {
      setActiveStep(9);
      scrollToRef(directionRef);
    } else if (renderState.extraF === "Skylight") {
      setActiveStep(13);
      scrollToRef(lightingRef);
    } else if (renderState.extraF) {
      setActiveStep(14);
      scrollToRef(supportRef);
    }
  }, [renderState.extraF]);
  return (
    <section>
      <StepTitle step={9} title={'Addiotional features'} />

      <div className='flex flex-col lg:flex-row  justify-center gap-10 mb-4'>
        {filteredExtras.map((extra) => (
          <ChooseProductGrid
            key={extra.id}
            product={extra}
            className="w-md"
            handleState={() =>
              setRenderState((prev) => ({
                ...prev,
                extraF: extra.name.split(" ")[1], // por ejemplo "Louvers"
              }))
            }
          />
        ))}
      </div>
      {/* <ContinueButton onContinue={onContinue}/> */}
    </section>
  )
}
