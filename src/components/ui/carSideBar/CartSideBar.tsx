"use client";

import { useUIStore } from "@/store/ui/ui-store";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { PricingBreakdownModal } from "../pricingModal/PricingBreakdownModal";
import { useCartStore } from "@/store/useCartStore";
import { CostSummary, MaterialItem, MaterialItemTable } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createQuote } from "@/api/QuoteApi";
import { toast } from "react-toastify";
import {
  CreateQuotePayload,
  QuoteClientInfoPayload,
  QuoteClientInfoSchema,
  QuoteSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuoteStore } from "@/store/ui/useQuoteStore";

export const CartSideBar = () => {
  const isCartOpen = useUIStore((state) => state.isCartOpen);
  const closeCart = useUIStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());

  const [activeMaterials, setActiveMaterials] = useState<
    MaterialItemTable[] | null
  >(null);
  const [activeSummary, setActiveSummary] = useState<CostSummary | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset } = useForm<QuoteClientInfoPayload>({
    resolver: zodResolver(QuoteClientInfoSchema),
  });
  const quoteMutation = useMutation({
    mutationFn: createQuote,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      setIsQuoteModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const quoteMaterials = useQuoteStore((state) => state.quoteMaterials);
const quoteSummary = useQuoteStore((state) => state.quoteSummary);

const onSubmit = (formData: QuoteClientInfoPayload) => {
  if (!quoteMaterials || !quoteSummary) {
    toast.error("No quote data available");
    return;
  }

  const payload: CreateQuotePayload = {
    ...formData,
    materials: quoteMaterials.map((m) => ({
      material: m.name,
      color: m.color,
      size: `${m.inches} in`,
      qty: m.quantity,
      price: m.total,
    })),
    materialCost: quoteSummary.materialCost,
    cutCost: quoteSummary.cutsCost,
    markup: quoteSummary.finalMarkup,
    subtotal: quoteSummary.pricePlus15Markup,
    total: quoteSummary.finalTotal,
    additionalInfo: {},
  };

  quoteMutation.mutate(payload);
};

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

      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Send Quote</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                {...register("customerName")}
                placeholder="First Name"
                className="input"
              />
              <input
                {...register("customerLastName")}
                placeholder="Last Name"
                className="input"
              />
              <input
                {...register("customerEmail")}
                placeholder="Email"
                type="email"
                className="input"
              />
              <input
                {...register("customerPhone")}
                placeholder="Phone"
                className="input"
              />
              <input
                {...register("address_street")}
                placeholder="Address"
                className="input"
              />
              <input
                {...register("address_city")}
                placeholder="City"
                className="input"
              />
              <input
                {...register("address_state")}
                placeholder="State"
                className="input"
              />
              <input
                {...register("address_zip")}
                placeholder="ZIP"
                className="input"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Send Quote
              </button>
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(false)}
                className="w-full text-gray-500 mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
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
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    onClick={() => useCartStore.getState().removeItem(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button
            onClick={() => {
              if (
                items.length > 0 &&
                items[0].materials &&
                items[0].costSummary
              ) {
                useQuoteStore
                  .getState()
                  .setQuoteData(items[0].materials, items[0].costSummary);
                setIsQuoteModalOpen(true);
              } else {
                toast.error("No valid data to create a quote");
              }
            }}
            className="mt-4 w-full bg-[#ff5100] text-white py-2 rounded shadow hover:bg-orange-600 transition"
          >
            Create Quote
          </button>
        </div>
        <div className="mt-6 text-right font-semibold text-lg">
          Total: ${total.toFixed(2)}
        </div>
      </aside>
    </>
  );
};
