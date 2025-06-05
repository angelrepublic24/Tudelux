import { StepTitle } from "@/components/ui/StepTitle/StepTitle";
import { useCartStore } from "@/shared/store/useCartStore";
import { v4 as uuidv4 } from 'uuid';
import { CostSummary, MaterialItemTable, RenderState } from "@/shared/types";
import React from "react";
import { useUIStore } from "@/shared/store/ui/ui-store";

type Props = {
  renderState: RenderState;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  materials: MaterialItemTable[];
  summary: CostSummary;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>; // ✅ nuevo
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepComplete = ({renderState, setRenderState, materials, summary, setMaterialsData, setActiveStep, setIsRenderOpen }: Props) => {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUIStore((state) => state.openCart);


  const handleAddToCart = () => {
    if (!renderState.title || !renderState.productType) return;

    const newItem = {
      id: uuidv4(),
      name: `${renderState.title} - ${renderState.productType}`,
      price: summary.finalTotal, // ⚠️ reemplaza esto por un cálculo real si lo tienes
      quantity: 1,
      materials, // ⚠️ podrías transformar renderState en materiales si lo necesitas
      costSummary: summary,
      dimensions: renderState.dimensions,
      image: renderState.renderUrl,
      color: renderState.color,

      product: renderState.title,
    productType: renderState.productType,
    shape: renderState.shape,
    };

    addItem(newItem);
    openCart();

    setRenderState({});
    setMaterialsData([]);
    setActiveStep(0);
    setIsRenderOpen?.(false);
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
            className="w-60 rounded-xl px-10 py-5 bg-[#ff5100] border text-[#ece83a] hover:border-[#ff5100] hover:bg-white">
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
