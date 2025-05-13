"use client";
import { useState } from "react";
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
        <RenderHeader renderState={renderState} />
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

        <StepRole />

        <StepChooseProduct
          onSelect={(product) => {
            setSelectedProduct(product);
            setRenderState((prev) => ({
              ...prev,
              title: product.name,
              renderUrl: product.type?.[0]?.render || "",
            }));
            setIsRenderOpen(true);
          }}
        />

        {selectedProduct && selectedProduct.type.length > 0 && (
          <StepKindOfProduct
            productType={selectedProduct}
            setRenderState={setRenderState}
            setIsRenderOpen={setIsRenderOpen}
          />
        )}

        <StepChooseShape
          setRenderState={setRenderState}
          setIsRenderOpen={setIsRenderOpen}
        />

        <StepSize
          setRenderState={setRenderState}
          setIsRenderOpen={setIsRenderOpen}
        />

        <StepFrontDesign
          setRenderState={setRenderState}
          setIsRenderOpen={setIsRenderOpen}
        />
      </section>
    </>
  );
}
