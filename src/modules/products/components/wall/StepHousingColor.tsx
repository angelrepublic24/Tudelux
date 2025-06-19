"use client";

import { Material } from "@/modules/materials/schemas/materials.schema";
import { useGetMaterials } from "@/modules/materials/services/material.service";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { MaterialItemTable, RenderState } from "@/shared/types";
import React from "react";

type Props = {
  materialsData:MaterialItemTable[];
  renderState: RenderState;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  setIsRenderOpen: (val: boolean) => void;
  onContinue: () => void;
};

export const StepHousingColor = ({
    materialsData,
  renderState,
  setRenderState,
  setMaterialsData,
  setIsRenderOpen,
  onContinue,
}: Props) => {
  const { data: materials, isLoading } = useGetMaterials();
  const width = renderState.dimensionWall?.width ? Number(renderState.dimensionWall.width) : 10;
  const selectedSTC = renderState.selectedSTC;

  if (!selectedSTC) {
    return (
      <div className="py-16 text-center text-red-500">
        Please select STC before choosing housing color.
      </div>
    );
  }

  const selectedMaterial = materials?.find((mat: Material) => mat.name === selectedSTC);

  const uniqueColors: string[] = Array.from(
    new Set(
      selectedMaterial?.variants
        ?.filter((v) => Number(v.unit) === width)
        .map((v) => v.color)
    )
  );

  const handleSelectColor = (color: string) => {
    if (!selectedMaterial) return;

    const variant = selectedMaterial.variants?.find(
      (v) => Number(v.unit) === width && v.color === color
    );
    if (!variant) return;

    setRenderState((prev) => ({
      ...prev,
      selectedColor: color,
      selectedMaterial,
      selectedVariant: {
        color: variant.color,
        unit: variant.unit,
        pricePerUnit: variant.pricePerUnit,
      },
    }));

    setMaterialsData((prev) => [
      ...prev,
      {
        name: selectedMaterial.name,
        color: variant.color,
        inches: width * 12,
        quantity: 1,
        pricePerInch: 0, // no se usa
        total: variant.pricePerUnit,
        sourceStep: "Housing Color",
      },
    ]);
console.log("materialsData final:", materialsData);

    onContinue();
  };

  return (
    <div className="py-16">
      <StepTitle step={6} title="Select Housing Color" />

      {isLoading ? (
        <p className="text-center text-lg">Loading colors...</p>
      ) : uniqueColors.length === 0 ? (
        <p className="text-center text-gray-500">
          No colors available for this size.
        </p>
      ) : (
        <div className="flex justify-center flex-wrap gap-4 mt-6">
          {uniqueColors.map((color, i) => (
            <button
              key={i}
              onClick={() => handleSelectColor(color)}
              className="px-6 py-4 bg-gray-100 rounded-xl hover:bg-gray-200 text-lg font-medium border"
            >
              {color}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
