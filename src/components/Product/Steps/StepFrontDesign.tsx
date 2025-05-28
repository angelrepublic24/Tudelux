import { chooseDesign } from "@/utils/chooseDesign";
import React, { useState } from "react";
import { ChooseProductGrid } from "../ChooseProductGrid";
import { MaterialItemTable, RawAddOn, RenderState } from "@/types";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";
import { FrontDesignModal } from "@/components/FrontDesignModal";
import { useQuery } from "@tanstack/react-query";
import { getAddOn } from "@/api/HubspotAPi";
import { getAddOnMaterials } from "@/utils/handleAddOnSelection";
import { AddOnTooltip } from "@/components/AddOnTooltip";
import { ImageRender } from "@/components/Render/3dRender";

interface Props {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  renderState: RenderState;
  onContinue: (selectedName?: string) => void;
  setIsRenderOpen?: (open: boolean) => void;
}

export const StepFrontDesign = ({
  setRenderState,
  setMaterialsData,
  renderState,
  onContinue,
  setIsRenderOpen,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddOnName, setSelectedAddOnName] = useState<string | null>(
    null
  );
  const [selectedAddOn, setSelectedAddOn] = useState<RawAddOn | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const { data: addOns = [] } = useQuery({
    queryFn: getAddOn,
    queryKey: ["addOns"],
  });

  return (
    <section className="py-16 relative">
      <StepTitle step={6} title="Will your canopy have a front design?" />
      <div className="flex flex-col lg:flex-row justify-center gap-10 px-4">
        {chooseDesign.map((chooseDesign, index) => (
          <ChooseProductGrid
            key={index}
            product={chooseDesign}
            onSelect={() => {
              setRenderState((prev) => ({
                ...prev,
                frontDesign: chooseDesign.name,
              }));
              setIsRenderOpen?.(true);

              if (chooseDesign.name === "Design Front") {
                setIsModalOpen(true);
              } else {
                onContinue(chooseDesign.name);
              }
            }}
            className="flex flex-col items-center text-center w-full lg:w-1/4"
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-300/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-xl relative">
            <h2 className="text-xl font-semibold mb-6 text-center">
              Add addons to design your canopy
            </h2>

            <div className="flex gap-6">
              <div className="w-1/3 space-y-3">
                {[
                  { type: "Tube", image: "/tube.png" },
                  { type: "Channel", image: "/channel.png" },
                  { type: "Crown", image: "/crown.png" },
                  { type: `1" In`, image: "/1up.png" },
                  { type: `1" Out`, image: "/1down.png" },
                  { type: `3" Extender`, image: "/3extender.png" },
                ].map(({ type, image }) => (
                  <button
                    key={type}
                    onClick={() => {
                      const addon = addOns.find((a) => a.values[1] === type);
                      if (addon) {
                        setSelectedAddOn(addon);
                        setSelectedAddOnName(type);
                        setShowTooltip(true);
                      }
                    }}
                    className={`w-1/2 py-4 px-2 rounded text-center border flex flex-col items-center gap-2 ${
                      selectedAddOnName === type
                        ? "bg-[#ff5100] text-white border-[#ff5100]"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={type}
                      className="w-full h-10 object-contain"
                    />
                    <span className="font-small text-sm">Add {type}</span>
                  </button>
                ))}
              </div>
              <div className="flex-1 flex flex-col justify-around items-center relative">
                <div className="mb-4 h-1/2 w-full">
                  <ImageRender url={renderState.renderUrl || ""} />
                </div>

                <button
                  className="mt-6 px-6 py-2 bg-[#ff5100] text-white rounded hover:bg-orange-600"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedAddOn(null);
                    setSelectedAddOnName(null);
                    setShowTooltip(false);
                    setSelectedButtons([]);
                    onContinue("Design Front");
                  }}
                >
                  Save
                </button>

                {showTooltip && selectedAddOn && selectedAddOnName && (
                  <div className="absolute top-0 left-0">
                    <AddOnTooltip
                      title={`Select position for ${selectedAddOnName}`}
                      buttons={[
                        "Top inside",
                        "Top outside",
                        "Bottom inside",
                        "Bottom outside",
                      ]}
                      selected={selectedButtons}
                      onToggle={(btn) => {
                        setSelectedButtons((prev) =>
                          prev.includes(btn)
                            ? prev.filter((b) => b !== btn)
                            : prev.length < 3
                            ? [...prev, btn]
                            : prev
                        );
                      }}
                      onCancel={() => {
                        setShowTooltip(false);
                        setSelectedButtons([]);
                      }}
                      onConfirm={() => {
                        if (selectedAddOn && selectedAddOnName) {
                          const newMaterials = getAddOnMaterials(
                            selectedAddOn,
                            selectedButtons,
                            renderState
                          );
                          setMaterialsData((prev) => [
                            ...prev,
                            ...newMaterials,
                          ]);

                          setRenderState((prev) => ({
                            ...prev,
                            fontTypeDesign: `${selectedAddOnName} - ${selectedButtons.join(
                              ", "
                            )}`,
                          }));

                          setShowTooltip(false);
                          setSelectedAddOn(null);
                          setSelectedAddOnName(null);
                          setSelectedButtons([]);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
