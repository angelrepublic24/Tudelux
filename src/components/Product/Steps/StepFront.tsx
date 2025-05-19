import { MaterialItemTable, RawAddOn, RenderState } from "@/types";
import React, { useState } from "react";
import { ChooseDesignGrid } from "../ChooseDesignGrid";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";
import { useQuery } from "@tanstack/react-query";
import { getAddOn } from "@/api/HubspotAPi";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  renderState: RenderState;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const allowedAddOnNames = [
  "Channel",
  "Crown",
  "Tube",
  `3" Extender`,
  `1" Down`,
  `1" In`,
];

const buttonsAddOn = ["Top inside", "Top outside", "Bottom inside", "Bottom outside"];

export const StepFront = ({ setRenderState, renderState, setMaterialsData, onContinue, setIsRenderOpen }: Props) => {
  const { data: addOns, isLoading, isError } = useQuery({
    queryFn: getAddOn,
    queryKey: ["addOns"],
  });

  const width = renderState.dimensions?.widthInches || 0;
  const projection = renderState.dimensions?.projectionInches || 0;

  const handleSelection = (
    addOn: RawAddOn | Record<string, any>,
    selectedButtons: string[]
  ) => {
    const name = addOn.values[1];
    const color = addOn.values[2];
    const pricePerInch = parseFloat(addOn.values[3]);

    const newMaterials: MaterialItemTable[] = [];

    selectedButtons.forEach((btn) => {
      newMaterials.push({
        name: `${name} - ${btn} Width`,
        color,
        inches: projection,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * projection * 1).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Projection`,
        color,
        inches: width,
        quantity: 2,
        pricePerInch,
        total: parseFloat((pricePerInch * width * 2).toFixed(2)),
      });
    });

    setMaterialsData((prev) => [...prev, ...newMaterials]);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading add-ons</p>;

  return (
    <section>
      <StepTitle step={7} title={"Design Front"} />
      <div className="grid grid-cols-3 gap-10 mb-6">
        {addOns
          .filter((addon: any) => allowedAddOnNames.includes(addon.values[1]))
          .map((addon: RawAddOn, i: number) => {
            const addOnValue = {
              name: addon.values[1],
              color: addon.values[2],
              pricePerInch: addon.values[3],
              quantity: addon.values[4],
              total: addon.values[5],
            };

            return (
              <ChooseDesignGrid
                key={i}
                addOn={addOnValue}
                buttonToShow={buttonsAddOn}
                handleState={(selectedBtns) => {
                  setRenderState((prev) => ({
                    ...prev,
                    fontTypeDesign: `${addOnValue.name} - ${selectedBtns.join(", ")}`,
                  }));
                  handleSelection(addon, selectedBtns);
                }}
              />
            );
          })}
      </div>

      <div className="flex justify-end">
        <button
          className="bg-[#ff5100] text-lg px-10 py-5 border rounded-2xl text-amber-300 hover:bg-white hover:border-[#ff5100]"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </section>
  );
};
