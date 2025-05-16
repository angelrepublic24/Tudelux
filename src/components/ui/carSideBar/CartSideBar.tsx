"use client";

import { useUIStore } from "@/store/ui/ui-store";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { PricingBreakdownModal } from "../pricingModal/PricingBreakdownModal";
import { useCartStore } from "@/store/useCartStore";
import { CostSummary, MaterialItem } from "@/types";

export const CartSideBar = () => {
  const isCartOpen = useUIStore((state) => state.isCartOpen);
  const closeCart = useUIStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());

  const [activeMaterials, setActiveMaterials] = useState<MaterialItem[] | null>(
    null
  );
  const [activeSummary, setActiveSummary] = useState<CostSummary | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      {showModal && activeMaterials && activeSummary && (
        <PricingBreakdownModal
          materials={activeMaterials}
          summary={activeSummary}
          projectName="Custom Project"
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="fixed inset-0 bg-black/40 z-40" onClick={closeCart} />
      <aside className="fixed top-0 right-0 w-[400px] h-screen bg-white shadow-2xl z-100 p-6 flex flex-col transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={closeCart}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.dimensions?.width}" x {item.dimensions?.projection}"
                    </p>
                    <button
                      onClick={() => {
                        if (item.materials && item.costSummary) {
                          setActiveMaterials(item.materials);
                          setActiveSummary(item.costSummary);
                          setShowModal(true);
                        }
                      }}
                      className="text-blue-500 hover:underline text-sm mt-1"
                    >
                      ${item.price.toFixed(2)} (see breakdown)
                    </button>
                  </div>
                  <button
                    className="text-red-500"
                    onClick={() => useCartStore.getState().removeItem(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 text-right font-semibold text-lg">
          Total: ${total.toFixed(2)}
        </div>
      </aside>
    </>
  );
};
