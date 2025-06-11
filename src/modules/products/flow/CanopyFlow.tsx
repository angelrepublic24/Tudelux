"use client";

import {
  StepAddiotionalFeatures,
  StepChooseShape,
  StepColors,
  StepCustomLocationOptions,
  StepFrontDesign,
  StepFullCustomOptions,
  StepKindOfProduct,
  StepLighting,
  StepLouverDetails,
  StepLouversDirections,
  StepProfile,
  StepSize,
  StepSpaceBetweenLouvers,
  StepStandardColorOptions,
  StepSupport,
} from "@/modules/products/components";
import { chooseProduct } from "@/shared/utils/chooseProduct";
import { CostSummary, MaterialItemTable, RenderState } from "@/shared/types";
import { useRef } from "react";

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
  kindOfProductStartRef: React.RefObject<HTMLDivElement>;
};

export const CanopyFlow = ({
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
  kindOfProductStartRef
}: Props) => {
  const kindOfProductRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const spacingRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);
  const colorsRef = useRef<HTMLDivElement>(null);
  const colorOptionsRef = useRef<HTMLDivElement>(null);
  const completeRef = completeSectionRef;

  return (
    <>
      <div ref={kindOfProductStartRef}>
        {activeStep >= 2 && selectedProduct?.type.length > 0 && (
          <StepKindOfProduct
            productType={selectedProduct}
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(3);
              scrollToRef(shapeRef);
            }}
          />
        )}
      </div>

      <div ref={shapeRef}>
        {activeStep >= 3 && (
          <StepChooseShape
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(4);
              scrollToRef(sizeRef);
            }}
          />
        )}
      </div>

      <div ref={sizeRef}>
        {activeStep >= 4 && (
          <StepSize
            renderState={renderState}
            setMaterialsData={setMaterialsData}
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(5);
              scrollToRef(frontRef);
            }}
          />
        )}
      </div>

      <div ref={frontRef}>
        {activeStep >= 5 && (
          <StepFrontDesign
            setRenderState={setRenderState}
            setMaterialsData={setMaterialsData}
            renderState={renderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(7);
              scrollToRef(profileRef);
            }}
          />
        )}
      </div>

      <div ref={profileRef}>
        {activeStep >= 7 && (
          <StepProfile
            renderState={renderState}
            setMaterialsData={setMaterialsData}
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(8);
              scrollToRef(featuresRef);
            }}
          />
        )}
      </div>

      <div ref={featuresRef}>
        {activeStep >= 8 && (
          <StepAddiotionalFeatures
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(9);
              scrollToRef(directionRef);
            }}
          />
        )}
      </div>

      {renderState.extraF === "Louvers" && (
        <>
          <div ref={directionRef}>
            {activeStep >= 9 && (
              <StepLouversDirections
                setRenderState={setRenderState}
                setIsRenderOpen={setIsRenderOpen}
                onContinue={() => {
                  setActiveStep(10);
                  scrollToRef(detailsRef);
                }}
              />
            )}
          </div>

          <div ref={detailsRef}>
            {activeStep >= 10 && (
              <StepLouverDetails
                setRenderState={setRenderState}
                setIsRenderOpen={setIsRenderOpen}
                onContinue={() => {
                  setActiveStep(11);
                  scrollToRef(spacingRef);
                }}
              />
            )}
          </div>

          <div ref={spacingRef}>
            {activeStep >= 11 && (
              <StepSpaceBetweenLouvers
                renderState={renderState}
                setMaterialsData={setMaterialsData}
                setRenderState={setRenderState}
                setIsRenderOpen={setIsRenderOpen}
                onContinue={() => {
                  setActiveStep(12);
                  scrollToRef(supportRef);
                }}
              />
            )}
          </div>
        </>
      )}

      <div ref={supportRef}>
        {activeStep >= 12 && (
          <StepSupport
            setMaterialsData={setMaterialsData}
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              if (renderState.extraF === "Louvers") {
                setActiveStep(14);
                scrollToRef(colorsRef);
              } else {
                setActiveStep(13);
                scrollToRef(lightingRef);
              }
            }}
          />
        )}
      </div>

      {renderState.extraF === "Skylight" && (
        <div ref={lightingRef}>
          {activeStep >= 13 && (
            <StepLighting
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(14);
                scrollToRef(colorsRef);
              }}
            />
          )}
        </div>
      )}

      <div ref={colorsRef}>
        {activeStep >= 14 && (
          <StepColors
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(15);
              scrollToRef(colorOptionsRef);
            }}
          />
        )}
      </div>

      <div ref={colorOptionsRef}>
        {activeStep >= 15 && renderState.color === "Standars color" && (
          <StepStandardColorOptions
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
            onContinue={() => {
              setActiveStep(16);
              scrollToRef(completeRef);
            }}
          />
        )}

        {activeStep >= 15 &&
          renderState.color === "Standars color custom locations" && (
            <StepCustomLocationOptions
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(16);
                scrollToRef(completeRef);
              }}
            />
          )}

        {activeStep >= 15 &&
          renderState.color === "Custom colors custom location" && (
            <StepFullCustomOptions
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(16);
                scrollToRef(completeRef);
              }}
            />
          )}
      </div>
    </>
  );
};
