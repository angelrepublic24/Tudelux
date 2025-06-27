import { chooseDesign } from "@/shared/utils/chooseDesign";
import React, { useRef, useState } from "react";
import { MaterialItemTable, RawAddOn, RenderState } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { getAddOn } from "@/api/HubspotAPi";
import { getAddOnMaterials } from "@/shared/utils/handleAddOnSelection";

import { toast } from "react-toastify";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { ChooseProductGrid } from "../grid/ChooseProductGrid";
import { ImageRender } from "@/shared/components/Render/3dRender";
import { AddOnTooltip } from "@/shared/components/AddOnTooltip";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
    const [selected, setSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddOnName, setSelectedAddOnName] = useState<string | null>(
    null
  );
  const [selectedAddOn, setSelectedAddOn] = useState<RawAddOn | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showExtraOptionsModal, setShowExtraOptionsModal] = useState(false);
  const [crownBasePosition, setCrownBasePosition] = useState<string | null>(
    null
  );
  const previousAddOnRef = useRef<string | null>(null);
  const lastConfirmedAddOnRef = useRef<string | null>(null);

  const [lastSelectedAddOnName, setLastSelectedAddOnName] = useState<
    string | null
  >(null);
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [shownCrownCombinations, setShownCrownCombinations] = useState<
    Set<string>
  >(new Set());

  const [globalSelections, setGlobalSelections] = useState<
    Record<string, string[]>
  >({});

  const { data: addOns = [] } = useQuery({
    queryFn: getAddOn,
    queryKey: ["addOns"],
  });

  const handleConfirmAddon = (customButtons?: string[]) => {
    if (!selectedAddOn || !selectedAddOnName) return;

    const buttonsToUse = customButtons ?? selectedButtons;

    const tempSelections = { ...globalSelections };
    tempSelections[selectedAddOnName] = buttonsToUse;

    // Validación: máximo 3 add-ons por posición
    const positionCount: Record<string, number> = {};
    Object.values(tempSelections).forEach((positions) => {
      positions.forEach((pos) => {
        positionCount[pos] = (positionCount[pos] || 0) + 1;
      });
    });

    const exceeded = Object.values(positionCount).some((count) => count > 3);
    if (exceeded) {
      toast.error("You can only select up to 3 add-ons per position total.");
      return;
    }

    // 🧠 Marcar combinaciones Crown-Conflict como vistas si aplican
    const crownPositions = globalSelections["Crown"] || [];
    const newShown = new Set(shownCrownCombinations);

    buttonsToUse.forEach((pos) => {
      if (selectedAddOnName !== "Crown" && crownPositions.includes(pos)) {
        const key = `${selectedAddOnName}-${pos}`;
        newShown.add(key);
      }
    });
    setShownCrownCombinations(newShown);

    // Agregar materiales
    const newMaterials = getAddOnMaterials(
      selectedAddOn,
      buttonsToUse,
      renderState
    );

    setMaterialsData((prev) => [...prev, ...newMaterials]);

    // Actualizar render
    setRenderState((prev) => ({
      ...prev,
      fontTypeDesign: `${selectedAddOnName} - ${buttonsToUse.join(", ")}`,
    }));

    // Guardar selección
    setGlobalSelections((prev) => ({
      ...prev,
      [selectedAddOnName]: buttonsToUse,
    }));

    if (selectedAddOnName === "Crown") {
      previousAddOnRef.current = "Crown";
    } else {
      previousAddOnRef.current = null;
    }

    lastConfirmedAddOnRef.current = selectedAddOnName;

    // Reset UI
    setShowTooltip(false);
    setSelectedAddOn(null);
    setSelectedAddOnName(null);
    setSelectedButtons([]);
  };

  return (
    <section className="py-16 relative">
      <StepTitle step={6} title="Will your canopy have a front design?" />
      <div className="flex flex-col lg:flex-row justify-center gap-10 px-4">
        {chooseDesign.map((design, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center w-full lg:w-1/4 shadow-lg rounded-xl py-6"
          >
            <Image 
              src={design.image}
              alt={design.name}
              width={300}
              height={300}
            />

            <Button
             className={`px-8 py-6 font-semibold rounded-2xl  text-xl ${
              selected === design.name
                ? "bg-[#ff5100] text-[#ece83a]"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
              onClick={() => {
                setRenderState((prev) => ({
                  ...prev,
                  frontDesign: design.name,
                }));
                setIsRenderOpen?.(true);

                if (design.name === "Design Front") {
                  setIsModalOpen(true);
                } else {
                  onContinue(design.name);
                }
              }}
            >Go {design.name}</Button>
          </div>
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
                  { type: "Tube", image: "/addons/tube.avif" },
                  { type: "Channel", image: "/addons/channel.avif" },
                  { type: "Crown", image: "/addons/crown.avif" },
                  { type: `1" In`, image: "/addons/1up.avif" },
                  { type: `1" Out`, image: "/addons/1out.avif" },
                  { type: `3" Extender`, image: "/addons/3extender.avif" },
                ].map(({ type, image }) => (
                  <button
                    key={type}
                    onClick={() => {
                      const addon = addOns.find((a) => a.values[1] === type);
                      if (!addon) return;

                      // ✅ Guarda quién fue el add-on anterior, si no es Crown
                      if (type !== "Crown") {
                        previousAddOnRef.current = selectedAddOnName;
                        console.log(
                          "🧠 Guardando previousAddOnRef:",
                          selectedAddOnName
                        );
                      }

                      const previousSelections = globalSelections[type] || [];

                      setSelectedAddOn(addon);
                      setSelectedAddOnName(type);
                      setSelectedButtons(previousSelections);
                      setShowTooltip(true);
                    }}
                    className={`w-1/2 py-4 rounded text-center border flex flex-col items-center gap-2 hover:shadow-md shadow-[#ff5100] `}
                  >
                    <img src={image} alt={type} className="w-full h-14" />
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
                        const alreadySelected = selectedButtons.includes(btn);

                        // Revisa si ya hay 3 add-ons en esa posición
                        let totalCountInPosition = 0;
                        Object.values(globalSelections).forEach((positions) => {
                          totalCountInPosition += positions.filter(
                            (pos) => pos === btn
                          ).length;
                        });

                        if (!alreadySelected && totalCountInPosition >= 3) {
                          toast.error(
                            `You can only select 3 add-ons in the "${btn}" position.`
                          );
                          return;
                        }

                        // Actualiza las posiciones seleccionadas en el tooltip
                        const newSelection = alreadySelected
                          ? selectedButtons.filter((b) => b !== btn)
                          : [...selectedButtons, btn];

                        setSelectedButtons(newSelection);

                        // 🔥 Lógica para mostrar el modal extra
                        const crownPositions = globalSelections["Crown"] || [];
                        const key = `${selectedAddOnName}-${btn}`;
                        const alreadyShown = shownCrownCombinations.has(key);
                        const alreadySaved =
                          globalSelections[selectedAddOnName!]?.includes(btn);

                        if (
                          !alreadySelected && // Solo mostrar si es una nueva selección
                          selectedAddOnName !== "Crown" && // El actual no es crown
                          lastConfirmedAddOnRef.current === "Crown" &&
                          crownPositions.includes(btn) && // La posición ya está usada por crown
                          !alreadyShown && // Aún no se ha mostrado esta combinación
                          !alreadySaved // Aún no se ha confirmado esta combinación
                        ) {
                          console.log(
                            "🔥 Mostrar modal extra (desde tooltip)",
                            {
                              currentAddOn: selectedAddOnName,
                              lastSelectedAddOnName,
                              conflictingPosition: btn,
                            }
                          );

                          setCrownBasePosition(btn);
                          setShowExtraOptionsModal(true);
                        }
                      }}
                      onCancel={() => {
                        setShowTooltip(false);
                        setSelectedButtons([]);
                      }}
                      onConfirm={() => handleConfirmAddon()}
                    />
                  </div>
                )}

                {showExtraOptionsModal && crownBasePosition && (
                  <div className="fixed inset-0 bg-gray-500/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full space-y-4 text-center">
                      <h2 className="text-lg font-semibold">
                        Choose additional option for {crownBasePosition} Crown
                      </h2>
                      <div className="flex flex-col gap-4">
                        {[
                          `On ${crownBasePosition} Crown`,
                          `Below ${crownBasePosition} Crown`,
                        ].map((label, index) => (
                          <button
                            key={index}
                            className="py-2 px-4 rounded bg-[#ff5100] text-white hover:bg-orange-600"
                            onClick={() => {
                              if (crownBasePosition && selectedAddOnName) {
                                const finalButtons = [
                                  ...selectedButtons,
                                  crownBasePosition,
                                ];
                                const key = `${selectedAddOnName}-${crownBasePosition}`;

                                setShownCrownCombinations((prev) => {
                                  const updated = new Set(prev);
                                  updated.add(key);
                                  return updated;
                                });

                                handleConfirmAddon(finalButtons);
                                setShowExtraOptionsModal(false);
                              }
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
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
