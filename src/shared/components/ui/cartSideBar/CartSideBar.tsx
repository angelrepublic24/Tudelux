"use client";

import { useUIStore } from "@/shared/store/ui/ui-store";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { PricingBreakdownModal } from "../pricingModal/PricingBreakdownModal";
import { useCartStore } from "@/shared/store/useCartStore";
import { CostSummary, MaterialItem, MaterialItemTable } from "@/shared/types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createQuote } from "@/modules/quotes/api/QuoteApi";
import { uniq } from "lodash"; // opcional, para evitar add-ons duplicados
import { toast } from "react-toastify";
import { calculateCostSummary } from "@/shared/utils/calculateCostSummary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuoteStore } from "@/shared/store/ui/useQuoteStore";
import {
  CreateQuotePayload,
  QuoteClientInfoPayload,
  QuoteClientInfoSchema,
} from "@/modules/quotes/schema/quote.schema";
import { Input } from "@/components/ui/input";
import { FaTrash } from "react-icons/fa6";
import { formatCurrency } from "@/shared/utils/formatCurency";
import { StateSelector } from "../../LocationInput/StateSelector";

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

  const { register, handleSubmit, reset, control } = useForm<QuoteClientInfoPayload>({
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
    // Derivar AddOns escaneando los materiales
    const validAddOns = [
      "Crown",
      "Tube",
      "Channel",
      '1" In',
      '1" Out',
      '3" Extender',
    ];
    const derivedAddOns = uniq(
      quoteMaterials
        .filter((m) =>
          validAddOns.some((addon) =>
            m.name.toLowerCase().includes(addon.toLowerCase())
          )
        )
        .map((m) =>
          validAddOns.find((addon) =>
            m.name.toLowerCase().includes(addon.toLowerCase())
          )
        )
        .filter(Boolean) // Elimina null/undefined
    );

    // Derivar dimensiones desde materiales tipo "fascia"
    const dimensions: Record<string, number> = {};
    quoteMaterials.forEach((m) => {
      const name = m.name.toLowerCase();

      if (name.includes("front") && name.includes("width")) {
        dimensions.frontWidth = m.inches;
      } else if (name.includes("back") && name.includes("width")) {
        dimensions.backWidth = m.inches;
      } else if (name.includes("middle") && name.includes("width")) {
        dimensions.middleWidth = m.inches;
      }

      if (name.includes("left") && name.includes("projection")) {
        dimensions.leftProjection = m.inches;
      } else if (name.includes("right") && name.includes("projection")) {
        dimensions.rightProjection = m.inches;
      } else if (name.includes("middle") && name.includes("projection")) {
        dimensions.middleProjection = m.inches;
      }

      // Fallback para rectangular
      if (
        name.includes("fascia") &&
        name.includes("width") &&
        !dimensions.width
      ) {
        dimensions.width = m.inches;
      }
      if (
        name.includes("fascia") &&
        name.includes("projection") &&
        !dimensions.projection
      ) {
        dimensions.projection = m.inches;
      }
    });

    // Usar el primer item del carrito como referencia de contexto
    const firstItem = items[0];
    const payload: CreateQuotePayload = {
      ...formData,
      product: firstItem?.product || "Custom", // ejemplo: "Canopy"
      product_type: firstItem?.productType || "Custom Type", // ejemplo: "Custom Canopy"
      shape: firstItem?.shape || "Rectangular", // ejemplo: "Left Wall"
      addOns: derivedAddOns,
      dimensions,

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
  console.log(items);

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
              <Input
                {...register("customerName")}
                placeholder="First Name"
                className="input"
              />
              <Input
                {...register("customerLastName")}
                placeholder="Last Name"
                className="input"
              />
              <Input
                {...register("customerEmail")}
                placeholder="Email"
                type="email"
                className="input"
              />
              <Input
                {...register("customerPhone")}
                placeholder="Phone"
                className="input"
              />
              <Input
                {...register("address_street")}
                placeholder="Address"
                className="input"
              />
              <Input
                {...register("address_city")}
                placeholder="City"
                className="input"
              />
              <StateSelector control={control} />

              <Input
                {...register("address_zip")}
                placeholder="ZIP"
                className="input"
              />
              <button
                type="submit"
                className="w-full bg-[#ff5100] text-white py-2 rounded"
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
                <li
                  key={item.id}
                  className="flex justify-between items-stretch gap-3"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>

                    {/* Color visible SOLO si es Partition Wall */}
                    {item.product === "Partition Walls" && item.color && (
                      <p className="text-sm text-gray-700">
                        Housing Color: {item.color}
                      </p>
                    )}

                    {/* Dimensiones */}
                    <p className="text-xs text-gray-500">
                      {item.dimensionsWall?.width}" x{" "}
                      {item.dimensionsWall?.height}"
                    </p>

                    {/* Breakdown solo si NO es Partition Wall */}
                    {item.product !== "Partition Wall" ? (
                      <button
                        onClick={() => {
                          if (item.materials) {
                            const summary = calculateCostSummary(
                              item.materials,
                              item.costSummary.finalMarkup
                            );
                            setActiveMaterials(item.materials);
                            setActiveSummary(summary);
                            setShowModal(true);
                          }
                        }}
                        className="text-blue-500 hover:underline text-sm mt-1"
                      >
                        {formatCurrency(item.price)} (see breakdown)
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm mt-1 italic">
                        ${item.price.toFixed(2)}
                      </span>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          useCartStore
                            .getState()
                            .updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="bg-gray-200 rounded px-2 text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          useCartStore
                            .getState()
                            .updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-gray-200 rounded px-2 text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Trash icon to remove */}
                  <div className="flex flex-col items-end justify-between mt-1">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        useCartStore.getState().removeItem(item.id)
                      }
                    >
                      <FaTrash size={16} />
                    </button>
                    <span className="text-sm text-gray-800 font-semibold mt-1">
                      Total: {formatCurrency((item.price * item.quantity))}
                    </span>
                  </div>
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
          Total: {formatCurrency(total)}
        </div>
      </aside>
    </>
  );
};
