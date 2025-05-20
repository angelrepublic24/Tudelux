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

  const shape = renderState.shape;
  const width = renderState.dimensions?.widthInches || 0;
  const projection = renderState.dimensions?.projectionInches || 0;
  const corners = renderState.dimensions?.cornersInches || 0;
  const front = renderState.dimensions?.frontWidthInches || 0;

  const newMaterials: MaterialItemTable[] = [];

  selectedButtons.forEach((btn) => {
    if (shape === "Rectangular") {
      // ✅ Solo una pieza de Width (frente)
      newMaterials.push({
        name: `${name} - ${btn} Width`,
        color,
        inches: width,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * width).toFixed(2)),
      });

      // ✅ Dos piezas de Projection (laterales)
      newMaterials.push({
        name: `${name} - ${btn} Projection`,
        color,
        inches: projection,
        quantity: 2,
        pricePerInch,
        total: parseFloat((pricePerInch * projection * 2).toFixed(2)),
      });

    } else if (shape === "Front Hex") {
      newMaterials.push({
        name: `${name} - ${btn} Projection`,
        color,
        inches: projection,
        quantity: 2,
        pricePerInch,
        total: parseFloat((pricePerInch * projection * 2).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Corner`,
        color,
        inches: corners,
        quantity: 2,
        pricePerInch,
        total: parseFloat((pricePerInch * corners * 2).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Front`,
        color,
        inches: front,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * front).toFixed(2)),
      });
    } else if (shape === "Left Wall" || shape === "Right Wall") {
  const leftP = renderState.dimensions?.leftProjectionInches || 0;
  const rightP = renderState.dimensions?.rightProjectionInches || 0;
  const middleP = renderState.dimensions?.middleProjectionInches || 0;

  const frontW = renderState.dimensions?.frontWidthInches || 0;
  const backW = renderState.dimensions?.backWidthInches || 0;
  const middleW = renderState.dimensions?.middleWidthInches || Math.max(frontW - backW, 12);

  // ✅ Projections
  newMaterials.push({
    name: `${name} - ${btn} Projection Left`,
    color,
    inches: leftP,
    quantity: 1,
    pricePerInch,
    total: parseFloat((pricePerInch * leftP).toFixed(2)),
  });

  newMaterials.push({
    name: `${name} - ${btn} Projection Right`,
    color,
    inches: rightP,
    quantity: 1,
    pricePerInch,
    total: parseFloat((pricePerInch * rightP).toFixed(2)),
  });

  newMaterials.push({
    name: `${name} - ${btn} Projection Middle`,
    color,
    inches: middleP,
    quantity: 1,
    pricePerInch,
    total: parseFloat((pricePerInch * middleP).toFixed(2)),
  });

  // ✅ Widths
  newMaterials.push({
    name: `${name} - ${btn} Width Front`,
    color,
    inches: frontW,
    quantity: 1,
    pricePerInch,
    total: parseFloat((pricePerInch * frontW).toFixed(2)),
  });

  newMaterials.push({
    name: `${name} - ${btn} Width Middle`,
    color,
    inches: middleW,
    quantity: 1,
    pricePerInch,
    total: parseFloat((pricePerInch * middleW).toFixed(2)),
  });
}

  });

  setMaterialsData((prev) => [...prev, ...newMaterials]);
};

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading add-ons</p>;

  return (
    <section>
      <StepTitle step={7} title={"Design Front"} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
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
