'use client';

import React, { useState } from 'react';
import { StepTitle } from '@/shared/components/ui/StepTitle/StepTitle';
import { ChooseDesignGrid } from '../grid/ChooseDesignGrid';
import { ContinueButton } from '@/shared/components/ui/continueButton/ContinueButton';
import { getLouvers } from '@/api/HubspotAPi';
import { mapLouvers, GroupedLouver, LouverVariant } from '../../utils/mapLouvers';
import { RenderState } from '@/shared/types';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const buttonsLouver = ['Straight', 'Angled right', 'Angled left', 'Flat'];

const rawLouvers = await getLouvers();
const groupedLouvers: GroupedLouver[] = mapLouvers(rawLouvers);

export const StepLouverDetails = ({ setRenderState, onContinue }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('');
  const [currentVariants, setCurrentVariants] = useState<LouverVariant[]>([]);

  const handleSelection = (
    name: string,
    direction: string,
    variants: LouverVariant[]
  ) => {
    setSelectedName(name);
    setSelectedDirection(direction);
    setCurrentVariants(variants);
    setOpen(true);
  };

  const handleVariantSelect = (variant: LouverVariant) => {
  setRenderState((prev) => ({
    ...prev,
    details: `Louver ${selectedName} - ${selectedDirection} - ${variant.color} ($${variant.pricePerInch}/in)`,
    selectedLouverVariant: {
      id: variant.id.toString(), // 👈 puede ser number originalmente
      color: variant.color,
      pricePerInch: variant.pricePerInch,
      unitLength: "1in", // 🔧 valor por defecto
      roofProjection: 0,   // 🔧 valor por defecto
      cutPrice: 0          // 🔧 valor por defecto
    },
  }));
  setOpen(false);
};

  return (
    <section>
      <StepTitle step={11} title="Louver details" />

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 px-4">
        {groupedLouvers.map((group, i) => (
          <ChooseDesignGrid
            key={i}
            addOn={{ name: `Louver ${group.name}` }}
            className="w-3/4"
            buttonToShow={buttonsLouver}
            handleState={(selectedBtn) =>
              handleSelection(group.name, (selectedBtn as unknown as string), group.variants)
            }
          />
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Select a color for Louver {selectedName}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            {currentVariants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantSelect(variant)}
                className="w-full border rounded-xl p-4 text-left hover:bg-gray-100"
              >
                <div className="font-semibold">{variant.color}</div>
                <div className="text-sm text-gray-500">
                  ${variant.pricePerInch} per inch
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <ContinueButton onContinue={onContinue} />
    </section>
  );
};
