import { extraFeatures } from '@/shared/data/extraFeatures';
import { RenderState } from '@/shared/types';
import React from 'react'
import { ChooseProductGrid } from '../grid/ChooseProductGrid';
import { ContinueButton } from '@/shared/components/ui/continueButton/ContinueButton';
import { StepTitle } from '@/shared/components/ui/StepTitle/StepTitle';


type Props = {
  renderState: RenderState;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepAddiotionalFeatures = ({renderState, setRenderState, onContinue, setIsRenderOpen}:Props) => {
  const filteredExtras = extraFeatures.filter((extra) => {
    if (renderState.productType === "Sunshades" && extra.name.includes("Skylight")) {
      return false;
    }
    return true;
  });
  return (
    <section>
      <StepTitle step={9} title={'Addiotional features'} />

      <div className='flex flex-col lg:flex-row  justify-center gap-10 mb-4'>
        {filteredExtras.map((extra) => (
          <ChooseProductGrid
            key={extra.id}
            product={extra}
            className='w-md'
            handleState={() =>
              setRenderState((prev) => ({
                ...prev,
                extraF: extra.name.split(" ")[1], // "Louvers", "Skylight", etc.
              }))
            }
          />
        ))}
      </div>
      <ContinueButton onContinue={onContinue}/>
    </section>
  )
}
