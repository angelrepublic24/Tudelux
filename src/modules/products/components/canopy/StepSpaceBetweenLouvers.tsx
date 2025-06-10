import { ContinueButton } from '@/shared/components/ui/continueButton/ContinueButton';
import { StepTitle } from '@/shared/components/ui/StepTitle/StepTitle';
import { RenderState, MaterialItemTable } from '@/shared/types';
import { useState } from 'react';
import { generateLouversMaterial } from '../../utils/generateLouverMaterial';

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  renderState: RenderState;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepSpaceBetweenLouvers = ({
  setRenderState,
  renderState,
  setMaterialsData,
  onContinue,
  setIsRenderOpen
}: Props) => {
const [inputValue, setInputValue] = useState<number>(0);

  return (
    <section>
      <StepTitle step={12} title='Spacing between the louvers' />
      <div className='my-8'>
        <input
          type="number"
          className='rounded-xl px-8 py-4 bg-gray-100 border focus:border-[#ff5100]'
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
        />
      </div>
      <ContinueButton
  onContinue={() => {
  console.log("➡️ Step 12 - clicked Continue");

  const updatedState = {
    ...renderState,
    spacingLouver: inputValue
  };
  setRenderState(updatedState);
  console.log("🧠 updatedState:", updatedState);

  const louverItem = generateLouversMaterial(updatedState);
  console.log("📦 Generated louverItem:", louverItem);

  if (louverItem) {
    setMaterialsData((prev) => {
      const filtered = prev.filter((item) => item.sourceStep !== "Louvers");
      const updated = [...filtered, louverItem];
      console.log("🧾 New materialsData:", updated);
      return updated;
    });
  } else {
    console.warn("⚠️ Louvers not generated (missing values?)");
  }

  onContinue();
}}
/>
    </section>
  );
};
