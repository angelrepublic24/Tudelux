"use client";
import { useRef, useState } from "react";
import { RenderHeader } from "@/components/Render/RenderHeader";
import { Title } from "@/components/ui/title/Title";
import { chooseProduct } from "@/utils/chooseProduct";
import { RenderState } from "@/types"; // asegúrate de exportarlo ahí
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAddOn } from "@/api/HubspotAPi";
import { StepAddiotionalFeatures, StepChooseProduct, StepChooseShape, StepColors, StepComplete, StepCustomLocationOptions, StepFront, StepFrontDesign, StepFullCustomOptions, StepKindOfProduct, StepLighting, StepLouverDetails, StepLouversDirections, StepProfile, StepRole, StepSize, StepSpaceBetweenLouvers, StepStandardColorOptions, StepSupport } from "@/components/Product";


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
  const stepFrontRef = useRef<HTMLDivElement>(null);
  const stepProfileRef = useRef<HTMLDivElement>(null);
  const StepAddiotionalFeaturesRef = useRef<HTMLDivElement>(null);
  const StepLouversDirectionsRef = useRef<HTMLDivElement>(null);
  const StepLouverDetailsRef = useRef<HTMLDivElement>(null);
  const StepSpaceBetweenLouversRef = useRef<HTMLDivElement>(null);
  const StepSupportRef = useRef<HTMLDivElement>(null);
  const StepLightingRef = useRef<HTMLDivElement>(null);
  const StepColorsRef = useRef<HTMLDivElement>(null);
  const StepColorOptionsRef = useRef<HTMLDivElement>(null);
  const StepCompleteRef  = useRef<HTMLDivElement>(null);

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

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      {renderState && (
        <div className="flex items-center justify-end p-4 sticky top-0 z-50 bg-white">
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
            <Title
              title="Let’s get your
                  Instant Estimate"
              subTitle="Take two easy measurements, click through a few
simple choices, and get a free instant estimate for
your custom Tudelü wall."
            />
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
              onContinue={() => {
                setActiveStep(6);
                scrollToRef(stepFrontRef);
              }}
            />
          )}
        </div>

        <div ref={stepFrontRef}>
          {activeStep >= 6 && (
            <StepFront
              addOns={addOns}
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(7);
                scrollToRef(stepProfileRef);
              }}
            />
          )}
        </div>

        <div ref={stepProfileRef}>
          {activeStep >= 7 && (
            <StepProfile
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(8);
                scrollToRef(StepAddiotionalFeaturesRef);
              }}
            />
          )}
        </div>

        <div ref={StepAddiotionalFeaturesRef}>
          {activeStep >= 8 && (
            <StepAddiotionalFeatures
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(9);
                scrollToRef(StepLouversDirectionsRef);
              }}
            />
          )}
        </div>

        <div ref={StepLouversDirectionsRef}>
          {activeStep >= 9 && (
            <StepLouversDirections
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(10);
                scrollToRef(StepLouverDetailsRef);
              }}
            />
          )}
        </div>

        <div ref={StepLouverDetailsRef}>
          {activeStep >= 10 && (
            <StepLouverDetails
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(11);
                scrollToRef(StepSpaceBetweenLouversRef);
              }}
            />
          )}
        </div>

        <div ref={StepSpaceBetweenLouversRef}>
          {activeStep >= 11 && (
            <StepSpaceBetweenLouvers
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(12);
                scrollToRef(StepSupportRef);
              }}
            />
          )}
        </div>
        <div ref={StepSupportRef}>
          {activeStep >= 12 && (
            <StepSupport
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(13);
                scrollToRef(StepLightingRef);
              }}
            />
          )}
        </div>
        <div ref={StepLightingRef}>
          {activeStep >= 13 && (
            <StepLighting
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(14);
                scrollToRef(StepColorsRef);
              }}
            />
          )}
        </div>
        <div ref={StepColorsRef}>
          {activeStep >= 14 && (
            <StepColors
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(15);
                scrollToRef(StepColorOptionsRef);
              }}
            />
          )}
        </div>
        <div ref={StepColorOptionsRef}>
          {activeStep >= 15 && renderState.color === "Standars color" && (
            <StepStandardColorOptions
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
              onContinue={() => {
                setActiveStep(16);
                scrollToRef(StepCompleteRef)
                // scrollTo next step if needed
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
                  scrollToRef(StepCompleteRef)
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
                  scrollToRef(StepCompleteRef)
                }}
              />
            )}
        </div>
        <div ref={StepCompleteRef}>
          {activeStep >= 16 && (
            <StepComplete
              renderState={renderState}
              setRenderState={setRenderState}
              setIsRenderOpen={setIsRenderOpen}
            />
          )}
        </div>

      </section>
    </>
  );
}
