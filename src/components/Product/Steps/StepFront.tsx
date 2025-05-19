import { RawAddOn, RenderState } from "@/types";
import React from "react";
import { ChooseDesignGrid } from "../ChooseDesignGrid";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";
import { useQuery } from "@tanstack/react-query";
import { getAddOn } from "@/api/HubspotAPi";
type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

const allowedAddOnNames = [
  "Channel",
  "Crown",
  "Tube",
  `3" Extender`,
  `1" Down`,
  `1" In`
];

const buttonsAddOn = ["Top inside", "Top outside", "Bottom inside", "Bottom outside"]

export const StepFront = ({setRenderState, onContinue, setIsRenderOpen,}: Props) => {
  const {
    data: addOns,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getAddOn,
    queryKey: ["addOns"],
  });

  if (isLoading) return "Loading....";
  if (isError) return "Error loading";

  return (
    <section>
      <StepTitle step={7} title={'Design Front'} />
      <div className="grid grid-cols-3 gap-10 mb-6">
        {addOns.filter((addon) => {
            const name = addon.values[1];
            return allowedAddOnNames.includes(name)
        }).map((addon: RawAddOn, i) => {
          const addOnValue = {
            name: addon.values[1],
            color: addon.values[2],
            pricePerInch: addon.values[3],
            quantity: addon.values[4],
            total: addon.values[5],
          };
          return <ChooseDesignGrid 
          key={i}
          addOn={addOnValue} 
          handleState={(selectedBtn) => {
            setRenderState((prev) => ({
              ...prev,
              fontTypeDesign: `${addOnValue.name} - ${selectedBtn}`
            }))
          }} buttonToShow={buttonsAddOn} />;
        })}
      </div>

      <div className="flex justify-end">
        <button className="bg-[#ff5100] text-lg px-10 py-5 border rounded-2xl text-amber-300 hover:bg-white hover:border-[#ff5100]" onClick={onContinue}>Continue</button>
      </div>
    </section>
  );
};
