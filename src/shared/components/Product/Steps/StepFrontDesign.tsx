import { chooseDesign } from "@/shared/utils/chooseDesign";
import React, { useRef, useState } from "react";
import { ChooseProductGrid } from "../ChooseProductGrid";
import { MaterialItemTable, RawAddOn, RenderState } from "@/shared/types";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";
import { FrontDesignModal } from "@/components/FrontDesignModal";
import { useQuery } from "@tanstack/react-query";
import { getAddOn } from "@/api/HubspotAPi";
import { getAddOnMaterials } from "@/shared/utils/handleAddOnSelection";
import { AddOnTooltip } from "@/components/AddOnTooltip";
import { ImageRender } from "@/components/Render/3dRender";
import { toast } from "react-toastify";

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

  // const shouldShowExtraModal = (
  //   addonName: string,
  //   position: string
  // ): boolean => {
  //   if (addonName === "Crown") return false;
  //   const key = `${addonName}-${position}`;
  //   const crownPositions = globalSelections["Crown"] || [];
  //   const alreadyShown = shownCrownCombinations.has(key);
  //   const alreadySaved = globalSelections[addonName]?.includes(position);

  //   return !alreadyShown && crownPositions.includes(position) && !alreadySaved;
  // };

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
                    // onClick={() => {
                    //   const addon = addOns.find((a) => a.values[1] === type);
                    //   if (addon) {
                    //     const previousSelections = globalSelections[type] || [];
                    //     const previousAddOn = lastSelectedAddOnName; // ← aquí guardamos el valor actual

                    //     setSelectedAddOn(addon);
                    //     setSelectedAddOnName(type);
                    //     setSelectedButtons(previousSelections);
                    //     setShowTooltip(true);

                    //     const crownPositions = globalSelections["Crown"] || [];
                    //     const matchingPosition = crownPositions.find((pos) =>
                    //       previousSelections.includes(pos)
                    //     );
                    //     console.log({ previousAddOn });
                    //     console.log({ lastSelectedAddOnName });
                    //     console.log({ matchingPosition });

                    //     const key = `${type}-${matchingPosition}`;
                    //     const alreadyShown = shownCrownCombinations.has(key);
                    //     const alreadySaved =
                    //       globalSelections[type]?.includes(matchingPosition);

                    //     if (
                    //       type !== "Crown" &&
                    //       previousAddOn === "Crown" &&
                    //       matchingPosition !== undefined &&
                    //       !alreadyShown &&
                    //       !alreadySaved
                    //     ) {
                    //       console.log(
                    //         "🔥 Mostrando modal extra por conflicto con Crown"
                    //       );
                    //       setCrownBasePosition(matchingPosition);
                    //       setShowExtraOptionsModal(true);
                    //     }

                    //     // Actualizamos después de usar
                    //     setLastSelectedAddOnName(type);
                    //   }
                    // }}
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
                    className={`w-1/2 py-4 px-2 rounded text-center border hover:bg-gray-200 flex flex-col items-center gap-2 ${
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
