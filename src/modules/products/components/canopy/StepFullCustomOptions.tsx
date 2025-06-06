import { StepTitle } from '@/shared/components/ui/StepTitle/StepTitle';
import { RenderState } from '@/shared/types';
import React from 'react'
import { ChooseColorOption } from '../grid/ChooseColorOption';
import { ContinueButton } from '@/shared/components/ui/continueButton/ContinueButton';


type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const colorOptionData = [
    {
        name: "Canopy color",
        image: "",
        description: "Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        colors: [
            {
                color: "Black",
                hex: "black"
            },
            {
                color: "White",
                hex: "white"
            },
            {
                color: "Bronze",
                hex: "yellow-800"
            },
            {
                color: "Natural",
                hex: "zinc-400"
            }
        ]
    },
    {
        name: "Louver color",
        image: "",
        description: "Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        colors: [
            {
                color: "Black",
                hex: "black"
            },
            {
                color: "Wood",
                hex: "yellow-900"
            }
        ]
    }
]

export const StepFullCustomOptions = ({setRenderState, onContinue, setIsRenderOpen}: Props) => {
  return (
        <section>
            <StepTitle step={16} title='Custom colors custom location' />
    
            <div className='flex justify-center gap-20'>
                {colorOptionData.map((color, i) => (
                    
                    <ChooseColorOption 
                    color={color} 
                    className='w-1/3'
                    key={i} 
                    handleState={(selectedBtn) => {
                    setRenderState((prev) => ({
                      ...prev,
                      details: `${color.name} - ${selectedBtn} `
                    }))
                  }}
                    />
                ))}
            </div>
    
            <ContinueButton onContinue={onContinue} />
        </section>
      )
}
