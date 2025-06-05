import { StepTitle } from '@/components/ui/StepTitle/StepTitle';
import { extraFeatures } from '@/shared/data/extraFeatures';
import { RenderState } from '@/shared/types';
import React from 'react'
import { ChooseProductGrid } from '../ChooseProductGrid';
import { ContinueButton } from '@/components/ui/continueButton/ContinueButton';

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepAddiotionalFeatures = ({setRenderState, onContinue, setIsRenderOpen}:Props) => {
  return (
    <section>
      <StepTitle step={9} title={'Addiotional features'} />

      <div className='flex flex-col lg:flex-row  justify-between gap-10 mb-4'>
        {extraFeatures.map(extra => (
          <ChooseProductGrid key={extra.id} product={extra} className='w-md' handleState={() => 
                    setRenderState((prev) => ({
                        ...prev,
                        extraF: extra.name.split(" ")[1]
                    }))
                } />
        ))}
      </div>
      <ContinueButton onContinue={onContinue}/>
    </section>
  )
}
