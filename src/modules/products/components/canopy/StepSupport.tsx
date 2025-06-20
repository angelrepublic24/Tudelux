import { StepTitle } from '@/shared/components/ui/StepTitle/StepTitle';
import { supportsData } from '@/shared/data/suportsData';
import { MaterialItemTable, RenderState } from '@/shared/types';
import { ChooseProductGrid } from '../grid/ChooseProductGrid';
import { ContinueButton } from '@/shared/components/ui/continueButton/ContinueButton';
import { Input } from '@/components/ui/input';
import { getSupports } from '@/api/HubspotAPi';
import { mapSupports } from '../../utils/mapSupports';
import { useState } from 'react';

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const rawSupports = await getSupports();
const supports = mapSupports(rawSupports);

export const StepSupport = ({setRenderState, onContinue, setMaterialsData, setIsRenderOpen}: Props) => {
  const support = supports[0]; // único soporte
  const [quantity, setQuantity] = useState(1);

   const handleContinue = () => {
    setRenderState((prev) => ({
      ...prev,
      support: support.name,
    }));

    setMaterialsData((prev) => [
      ...prev,
      {
        name: support.name,
        color: 'Standard',
        inches: 0,
        quantity,
        pricePerInch: support.price,
        total: quantity * support.price,
        sourceStep: 'Support',
      },
    ]);

    onContinue();
  };

 return (
    <section>
      <StepTitle step={13} title="Support" />
      <div className="max-w-sm space-y-4">
        <p className="font-medium text-lg">{support.name}</p>
        <label className="text-sm font-semibold">How many supports?</label>
        <input
          type="number"
          min={1}
          className="rounded-xl px-8 py-4 bg-gray-100 border focus:border-[#ff5100]"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="mt-6">
        <ContinueButton disabled={quantity <=0 } onContinue={handleContinue} />
      </div>
    </section>
  );
}

           {/* <div className='grid gid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
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
        </div> */}