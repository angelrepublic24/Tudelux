"use client";
import { useCartStore } from "@/shared/store/useCartStore";
import { v4 as uuidv4 } from "uuid";
import {
  CartItem,
  CostSummary,
  MaterialItemTable,
  RenderState,
} from "@/shared/types";
import React from "react";
import { useUIStore } from "@/shared/store/ui/ui-store";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";

type Props = {
  renderState: RenderState;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  materials: MaterialItemTable[];
  summary: CostSummary;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>; // ✅ nuevo
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepComplete = ({
  renderState,
  setRenderState,
  materials,
  summary,
  setMaterialsData,
  setActiveStep,
  setIsRenderOpen,
}: Props) => {
  const addItem = useCartStore.getState().addItem;
  const openCart = useUIStore.getState().openCart;

  const handleAddToCart = () => {
    console.log("HANDLE ADD TO CART DISPARADO");
    console.log("RenderState:", renderState);

    let newItem: CartItem | null = null;

    if (renderState.title === "Architectural Canopy") {
      newItem = {
        id: uuidv4(),
        name: `${renderState.title} - ${renderState.productType}`,
        price: summary.finalTotal,
        quantity: 1,
        materials,
        costSummary: summary,
        dimensions: renderState.dimensions,
        image: renderState.renderUrl,
        color: renderState.color,
        product: renderState.title,
        productType: renderState.productType,
        shape: renderState.shape,
      };
    } else if (renderState.title === "Partition Walls") {
      const unitPrice = renderState.selectedVariant?.pricePerUnit || 0;
      const finalTotal = unitPrice;

      newItem = {
        id: uuidv4(),
        name: `${renderState.title} - ${renderState.selectedSTC}`,
        price: finalTotal,
        quantity: 1,
        materials: [],
        costSummary: {
          materialCost: finalTotal,
          cutsCost: 0,
          combinedCost: finalTotal,
          markup: 0,
          pricePlus15Markup: 0,
          finalTotal,
          finalMarkup: 0,
        },
        dimensionsWall: {
          width: renderState.dimensionWall?.width ?? "",
          height: renderState.dimensionWall?.height ?? "",
        },
        image: renderState.renderUrl,
        color: renderState.selectedVariant.color,
        product: renderState.title,
        selectedSTC: renderState.selectedSTC
      };
    }

    if (newItem) {
      addItem(newItem);
      openCart();
      setRenderState({});
      setMaterialsData([]);
      setActiveStep(0);
      setIsRenderOpen?.(false);
    } else {
      console.warn("Producto no reconocido para agregar al carrito");
    }
  };

  return (
    <section>
      <StepTitle step={17} title="Completed" />
      <div>
        <div className="md:w-1/3 pt-4 mb-8">
          <p className="text-xl">
            Need more than one Tudelu Product? Add this one to your quick cart
            and keep shopping
          </p>
        </div>
        <div className="flex justify-start space-x-3">
          <button className=" w-60 rounded-xl px-10 py-5 bg-[#ff5100] border text-[#ece83a] hover:bg-white border-[#ff5100]">
            <span>Quote</span>
          </button>
          <button
            onClick={handleAddToCart}
            className="w-60 rounded-xl px-10 py-5 bg-[#ff5100] border text-[#ece83a] hover:border-[#ff5100] hover:bg-white"
          >
            <span>Add to cart</span>
          </button>
          <button className="w-60 rounded-xl px-10 py-5 border-[#ff5100] bg-white border text-[#ece83a]">
            <span>Quote</span>
          </button>
        </div>
      </div>
    </section>
  );
};
