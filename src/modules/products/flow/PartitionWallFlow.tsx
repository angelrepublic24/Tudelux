import { CostSummary, MaterialItemTable, RenderState } from '@/shared/types';
import { chooseProduct } from '@/shared/utils/chooseProduct';
import React from 'react';
import DimensionStep from '../components/wall/DimensionStep';
import { StepWallAddons, StepWallColor } from '../components';

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
  return (
    <div>
      {/* Paso 1: DimensionStep */}
      {activeStep >= 2 &&
        selectedProduct &&
        renderState.title === "Partition Walls" && (
          <DimensionStep
            renderState={renderState}
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(3);
              scrollToRef(null); // puedes pasar un ref si lo deseas
            }}
          />
        )}

      {/* Paso 2: Wall Color */}
      {activeStep >= 3 &&
        selectedProduct &&
        renderState.title === "Partition Walls" && (
          <StepWallColor
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(4);
              scrollToRef(completeSectionRef);
            }}
          />
        )}

      {/* Paso 3: Addons */}
      {activeStep >= 4 &&
        selectedProduct &&
        renderState.title === "Partition Walls" && (
          <StepWallAddons />
        )}
    </div>
  );
};

export default PartitionWallFlow;
