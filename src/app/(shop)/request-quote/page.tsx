"use client";
import { useEffect, useRef, useState } from "react";
import { chooseProduct } from "@/shared/utils/chooseProduct";
import { CostSummary, MaterialItemTable, RenderState } from "@/shared/types";
import Image from "next/image";
import {
  StepChooseProduct,
  StepRole,
  StepWallColor,
  StepWallAddons,
  StepComplete,
} from "@/modules/products/components";
import { RenderHeader } from "@/shared/components/Render/RenderHeader";
import { Title } from "@/shared/components/ui/title/Title";
import { CanopyFlow } from "@/modules/products/flow/CanopyFlow";
import PartitionWallFlow from "@/modules/products/flow/PartitionWallFlow";

export default function RequestQuotePage() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof chooseProduct)[0] | null
  >(null);
  const [isRenderOpen, setIsRenderOpen] = useState(false);
  const [renderState, setRenderState] = useState<RenderState>({});
  const [activeStep, setActiveStep] = useState(0);
  const [materialsData, setMaterialsData] = useState<MaterialItemTable[]>([]);
  const [costSummary, setCostSummary] = useState<CostSummary>({
    materialCost: 0,
    cutsCost: 0,
    combinedCost: 0,
    markup: 0,
    pricePlus15Markup: 0,
    finalMarkup: 0,
    finalTotal: 0,
  });

  const chooseProductRef = useRef<HTMLDivElement>(null);
  const StepCompleteRef = useRef<HTMLDivElement>(null);
  const canopyFlowRef = useRef<HTMLDivElement>(null);
  const partitionWallFlowRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    if (materialsData.length === 0) return;

    const materialCost = materialsData.reduce(
      (acc, item) => acc + item.total,
      0
    );
    const cutsCost = materialsData.reduce((acc, item) => {
      return item.cutPrice && item.cutPrice > 0
        ? acc + 2 * item.quantity * item.cutPrice
        : acc;
    }, 0);
    const combinedCost = materialCost + cutsCost;
    const markup = combinedCost * 0.15;
    const pricePlus15Markup = combinedCost + markup;
    const finalMarkup = pricePlus15Markup * 1.5;
    const finalTotal = pricePlus15Markup + finalMarkup;

    setCostSummary({
      materialCost,
      cutsCost,
      combinedCost,
      markup,
      pricePlus15Markup,
      finalMarkup,
      finalTotal,
    });
  }, [materialsData]);

  return (
    <div className="mx-auto w-[90%]">
      {/* {renderState && (
        <div className="flex items-center justify-end p-4 sticky top-0 z-50">
          <button
            onClick={() => setIsRenderOpen(!isRenderOpen)}
            className="bg-[#ff5100] text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            {isRenderOpen ? "Hide preview" : "Show preview"}
          </button>
        </div>
      )} */}

      {/* {renderState && isRenderOpen && (
        <RenderHeader renderState={renderState} onToggle={() => setIsRenderOpen(false)} />
      )} */}

      <section className="">
        <div className="grid grid-cols-1 md:grid-cols-2 py-16">
          <div className="flex items-center md:w-1/2">
            <Title
              title="Let’s get your Instant Estimate"
              subTitle="Take two easy measurements, click through a few simple choices, and get a free instant estimate for your custom Tudelü wall."
            />
          </div>
          <div className="">
            <video muted autoPlay loop className="rounded-xl" >
              <source src="https://tudelu.com/hubfs/PROOF%20CONTENT(1).mp4#t=0.5" />
            </video>
          </div>
        </div>

        {/* Paso 1 */}
        <StepRole
          onContinue={() => {
            setActiveStep(1);
            scrollToRef(chooseProductRef);
          }}
        />

        {/* Paso 2 - Elegir producto */}
        <div ref={chooseProductRef}>
          {activeStep >= 1 && (
            <StepChooseProduct
              onSelect={(product) => {
                setSelectedProduct(product);
                setRenderState((prev) => ({
                  ...prev,
                  title: product.name,
                  renderUrl: product.type?.[0]?.render || "",
                }));
                setIsRenderOpen(true);
                setActiveStep(2);
                scrollToRef(canopyFlowRef);
              }}
            />
          )}
        </div>

        <div ref={canopyFlowRef}>
          {activeStep >= 2 &&
            selectedProduct?.name === "Architectural Canopy" && (
              <CanopyFlow
                renderState={renderState}
                setRenderState={setRenderState}
                materialsData={materialsData}
                setMaterialsData={setMaterialsData}
                isRenderOpen={isRenderOpen}
                setIsRenderOpen={setIsRenderOpen}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                costSummary={costSummary}
                scrollToRef={scrollToRef}
                completeSectionRef={StepCompleteRef}
                selectedProduct={selectedProduct}
                kindOfProductStartRef={canopyFlowRef}
              />
            )}

          {activeStep >= 2 && selectedProduct?.name === "Partition Walls" && (
            <PartitionWallFlow
              renderState={renderState}
              setRenderState={setRenderState}
              materialsData={materialsData}
              setMaterialsData={setMaterialsData}
              isRenderOpen={isRenderOpen}
              setIsRenderOpen={setIsRenderOpen}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              costSummary={costSummary}
              scrollToRef={scrollToRef}
              completeSectionRef={StepCompleteRef}
              selectedProduct={selectedProduct}
            />
          )}
        </div>

        {/* Paso final */}
        <div ref={StepCompleteRef}>
          {activeStep >= 16 && (
            <StepComplete
              renderState={renderState}
              setRenderState={setRenderState}
              materials={materialsData}
              summary={costSummary}
              setMaterialsData={setMaterialsData}
              setActiveStep={setActiveStep}
              setIsRenderOpen={setIsRenderOpen}
            />
          )}
        </div>
      </section>
    </div>
  );
}
