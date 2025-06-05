import { StepTitle } from '@/shared/components/ui/StepTitle/StepTitle';
import { supportsData } from '@/shared/data/suportsData';
import { RenderState } from '@/shared/types';
import { ChooseProductGrid } from '../grid/ChooseProductGrid';
import { ContinueButton } from '@/shared/components/ui/continueButton/ContinueButton';

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
