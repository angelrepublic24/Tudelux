import { StepTitle } from '@/components/ui/StepTitle/StepTitle'
import React from 'react'
import { ChooseDesignGrid } from '../ChooseDesignGrid'
import { louverDetailsData } from '@/shared/data/louverDetailsData'
import { RenderState } from '@/shared/types';
import { ContinueButton } from '@/components/ui/continueButton/ContinueButton';

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const buttonsLouver = ["Straight", "Angled right", "Angled left", "flat"]

export const StepLouverDetails = ({setRenderState, onContinue, setIsRenderOpen}: Props) => {
  return (
    <section>
        <StepTitle step={11} title='Louver details'/>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 w-full'>
          {
            louverDetailsData.map((louverDetails, i) => (
              <ChooseDesignGrid 
              key={i} 
              addOn={louverDetails} 
              className='w-3/4' 
              buttonToShow={buttonsLouver} 
              handleState={(selectedBtn) => {
                setRenderState((prev) => ({
                  ...prev,
                  details: `${louverDetails.name} - ${selectedBtn} `
                }))
              }} />
            ))
          }
        </div>

        <ContinueButton onContinue={onContinue} />
    </section>
  )
}
