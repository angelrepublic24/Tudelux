import { ContinueButton } from '@/components/ui/continueButton/ContinueButton'
import { StepTitle } from '@/components/ui/StepTitle/StepTitle'
import { lightingData } from '@/data/components'
import React from 'react'
import { ChooseProductGrid } from '../ChooseProductGrid'
import { RenderState } from '@/types'

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};
export const StepLighting = ({setRenderState, onContinue, setIsRenderOpen}: Props) => {
  return (
    <section>
        <StepTitle step={14} title='Lighting' />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-22'>
            {
                lightingData.map((light) => (
                    <ChooseProductGrid key={light.id} product={light} handleState={() => {
                        setRenderState((prev) => ({
                            ...prev,
                            lighting: light.name
                        }))
                    }} />
                ))
            }
        </div>
        <ContinueButton onContinue={onContinue} />
    </section>
  )
}
