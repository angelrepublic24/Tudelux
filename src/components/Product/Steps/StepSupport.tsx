import { ContinueButton } from '@/components/ui/continueButton/ContinueButton'
import { StepTitle } from '@/components/ui/StepTitle/StepTitle'
import { supportsData } from '@/data/suportsData';
import { RenderState } from '@/types';
import { ChooseProductGrid } from '../ChooseProductGrid';

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepSupport = ({setRenderState, onContinue, setIsRenderOpen}: Props) => {
  return (
    <section>
        <StepTitle step={13} title="Support" />
        <div className='grid gid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {supportsData.map(support => (
                <ChooseProductGrid 
                product={support}
                handleState={() => {
                    setRenderState((prev) => ({
                        ...prev,
                        support: support.name
                    }))
                }}
                />
            ))}
        </div>
        <ContinueButton onContinue={onContinue} />
    </section>
  )
}
