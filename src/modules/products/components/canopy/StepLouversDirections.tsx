import { RenderState } from '@/shared/types';
import React from 'react'
import { ChooseProductGrid } from '../grid/ChooseProductGrid';
import { StepTitle } from '@/shared/components/ui/StepTitle/StepTitle';
import { ContinueButton } from '@/shared/components/ui/continueButton/ContinueButton';


type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const louversDirectionData = [
    {
        id: 1,
        name: "On Width",
        description:"Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        image: "",
        render: "https://24116371.fs1.hubspotusercontent-na1.net/hubfs/24116371/Modulux%20C8SR00.glb",
        about: {
          text: "Louver is:",
          benefits: [
            "Retractable",
            "Occlusive",
            "Remote-controlled",
            "Single sided decor finish",
          ],
        },
        cta: "On  Width"

      },
      {
        id: 1,
        name: "On Projection",
        description:"Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        image: "",
        render: "https://24116371.fs1.hubspotusercontent-na1.net/hubfs/24116371/Modulux%20C8SR00.glb",
        about: {
          text: "Louver is:",
          benefits: [
            "Retractable",
            "Occlusive",
            "Remote-controlled",
            "Single sided decor finish",
          ],
        },
        cta: "On  Projection"

      },
]

export const StepLouversDirections = ({setRenderState, onContinue, setIsRenderOpen}: Props) => {
  return (
    <section>
        <StepTitle step={10} title={"Louvers direction"} />
        <div className='flex flex-col lg:flex-row  justify-center gap-10 mb-5'>
            {louversDirectionData.map(louverD => (
                <ChooseProductGrid 
                product={louverD} 
                className='lg:w-1/3'
                handleState={() => 
                    setRenderState((prev) => ({
                        ...prev,
                        directions: louverD.name.split(" ")[1]
                    }))
                }
                />
            ))}
        </div>
        <ContinueButton onContinue={onContinue}/>
    </section>
  )
}
