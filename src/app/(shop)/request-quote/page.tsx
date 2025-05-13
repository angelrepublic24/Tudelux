"use client";
import { useRef, useState } from "react";
import { StepChooseProduct } from "@/components/Product/Steps/StepChooseProduct";
import { StepFrontDesign } from "@/components/Product/Steps/StepFrontDesign";
import { StepKindOfProduct } from "@/components/Product/Steps/StepKindOfProduct";
import { StepRole } from "@/components/Product/Steps/StepRole";
import { StepSize } from "@/components/Product/Steps/StepSize";
import { RenderHeader } from "@/components/Render/RenderHeader";
import { Title } from "@/components/ui/title/Title";
import { chooseProduct } from "@/utils/chooseProduct";
import { RenderState } from "@/types"; // asegúrate de exportarlo ahí
import Image from "next/image";
import { StepChooseShape } from "@/components/Product/Steps/StepChooseShape";

export default function RequestQuotePage() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof chooseProduct)[0] | null
  >(null);
  const [isRenderOpen, setIsRenderOpen] = useState(false);
  const [renderState, setRenderState] = useState<RenderState>({});
  const [activeStep, setActiveStep] = useState(0);

  const chooseProductRef = useRef<HTMLDivElement>(null);
  const kindOfProductRef = useRef<HTMLDivElement>(null);
  const chooseShapeRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const frontDesignRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      {renderState && (
        <div className="flex items-center justify-end p-4 sticky top-0 z-[100] bg-white">
          <button
            onClick={() => setIsRenderOpen(!isRenderOpen)}
            className="bg-[#ff5100] text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            {isRenderOpen ? "Hide preview" : "Show preview"}
          </button>
        </div>
      )}

      {renderState && isRenderOpen && (
        <RenderHeader
          renderState={renderState}
          onToggle={() => setIsRenderOpen(false)}
        />
      )}

      <section className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 py-16">
          <div>
            <Title title="Choose what product you need" subTitle="" />
          </div>
          <div className="col-span-2">
            <Image src={``} alt="" width={300} height={300} className="" />
          </div>
        </div>

        <StepRole
          onContinue={() => {
            setActiveStep(1);
            scrollToRef(chooseProductRef);
          }}
        />

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
                setActiveStep(2); // ✅ avanzar al paso 2
                scrollToRef(kindOfProductRef); // ✅ hacer scroll al siguiente paso
              }}
            />
          )}
        </div>

        <div ref={kindOfProductRef}>
          {activeStep >= 2 &&
            selectedProduct &&
            selectedProduct.type.length > 0 && (
              <StepKindOfProduct
                productType={selectedProduct}
                setRenderState={setRenderState}
                setIsRenderOpen={setIsRenderOpen}
                onContinue={() => {
                  setActiveStep(3);
                  scrollToRef(chooseShapeRef);
                }}
              />
            )}
        </div>

        <div ref={chooseShapeRef}>
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
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(5);
                scrollToRef(frontDesignRef);
              }}
            />
          )}
        </div>

        <div ref={frontDesignRef}>
          {activeStep >= 5 && (
            <StepFrontDesign
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
            />
          )}
        </div>
      </section>
    </>
  );
}
