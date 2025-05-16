import { ContinueButton } from '@/components/ui/continueButton/ContinueButton'
import { StepTitle } from '@/components/ui/StepTitle/StepTitle'
import { RenderState } from '@/types';
import { useState } from 'react';

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepSpaceBetweenLouvers = ({setRenderState, onContinue, setIsRenderOpen}: Props) => {
    const [inputValue, setInputValue] = useState<number>()
  return (
    <section>
        <StepTitle step={12} title='Spacing between the louvers' />
        <div className='my-8'>
            <input 
            type="number" 
            className='rounded-xl px-8 py-4 bg-gray-100 border  focus:border-[#ff5100]' 
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))} />
        </div>
        <ContinueButton onHandle={() => {
          setRenderState((prev) => ({
                    ...prev,
                    spacingLouver: inputValue
                }))
        }} onContinue={onContinue} />
    </section>
  )
}
