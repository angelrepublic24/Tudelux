"use client";

import { Material } from "@/modules/materials/schemas/materials.schema";
import { useGetMaterials } from "@/modules/materials/services/material.service";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { MaterialItemTable, RenderState } from "@/shared/types";
import React from "react";

const stcOption = [
  { name: "36 STC" },
  { name: "48 STC" },
];

type Props = {
  renderState: RenderState;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
};

export const STCStep = ({
  renderState,
  setRenderState,
  onContinue,
  setMaterialsData,
}: Props) => {
  const { data: materials, isLoading } = useGetMaterials();

  const width = Number(renderState.dimensionWall?.width ?? 10);
  const selectedColor = renderState.color ?? "White"; // ✅ default

  const handleSelectSTC = (stcName: string) => {
    if (!materials) return;

    const selectedMaterial = materials.find(
      (mat: Material) => mat.name === stcName
    );

    if (!selectedMaterial) return;

    const variant = selectedMaterial.variants?.find(
      (v) => Number(v.unit) === width && v.color === selectedColor
    );

    if (!variant) return;

    // Actualizar renderState
    setRenderState((prev) => ({
      ...prev,
      selectedSTC: stcName as "36 STC" | "48 STC",
      selectedMaterial,
      selectedVariant: variant,
    }));

    // Agregar al carrito
    setMaterialsData((prev) => [
  ...prev,
  {
    name: stcName,
    color: variant.color,
    inches: width * 12,
    quantity: 1,
    total: variant.pricePerUnit,
  },
]);

    onContinue();
  };

  return (
    <div className="py-16">
      <StepTitle step={5} title="Select your STC" />

      {isLoading ? (
        <p className="text-center text-lg">Loading materials...</p>
      ) : (
        <div className="flex justify-center space-x-4 mt-4 md:mt-0">
          {stcOption.map((stc, i) => (
            <button
              key={i}
              onClick={() => handleSelectSTC(stc.name)}
              className="px-4 py-3 lg:px-8 lg:py-6 font-semibold bg-gray-200 rounded-2xl w-full hover:bg-gray-300 text-base lg:text-xl focus:bg-[#ff5100] focus:text-[#ece83a]"
            >
              {stc.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
