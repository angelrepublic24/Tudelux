import { CostSummary, MaterialItemTable, RenderState } from "@/shared/types";
import { chooseProduct } from "@/shared/utils/chooseProduct";
import React, { useRef } from "react";
import DimensionStep from "../components/wall/DimensionStep";
import { StepWallAddons, StepWallColor } from "../components";
import { STCStep } from "../components/wall/STCStep";
import { OptionStep } from "../components/wall/OptionStep";

type Props = {
  renderState: RenderState;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  materialsData: MaterialItemTable[];
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  isRenderOpen: boolean;
  setIsRenderOpen: (val: boolean) => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  costSummary: CostSummary;
  scrollToRef: (ref: React.RefObject<HTMLDivElement>) => void;
  completeSectionRef: React.RefObject<HTMLDivElement>;
  selectedProduct: (typeof chooseProduct)[0];
};

const PartitionWallFlow = ({
  renderState,
  setRenderState,
  materialsData,
  setMaterialsData,
  isRenderOpen,
  setIsRenderOpen,
  activeStep,
  setActiveStep,
  costSummary,
  scrollToRef,
  completeSectionRef,
  selectedProduct,
}: Props) => {
  const wallColorRef = useRef<HTMLDivElement>(null);
  const stcRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      {/* Paso 1: DimensionStep */}
      {activeStep >= 2 && (
        <DimensionStep
          renderState={renderState}
          setRenderState={setRenderState}
          setIsRenderOpen={setIsRenderOpen}
          onContinue={() => {
            setActiveStep(3);
            scrollToRef(wallColorRef); // puedes pasar un ref si lo deseas
          }}
        />
      )}

      <div ref={wallColorRef}>
        {activeStep >= 3 && (
          <StepWallColor
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(4);
              scrollToRef(stcRef);
            }}
          />
        )}
      </div>

      {/* Paso 3: Addons */}
      <div ref={stcRef}>
        {activeStep >= 4 && (
          <STCStep
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(5);
              scrollToRef(optionRef);
            }}
          />
        )}
      </div>
      <div ref={optionRef}>
        {activeStep >= 5 && (
          <OptionStep
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(4);
              scrollToRef(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PartitionWallFlow;
