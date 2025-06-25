"use client";

import { useUIStore } from "@/shared/store/ui/ui-store";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { PricingBreakdownModal } from "../Modals/pricingModal/PricingBreakdownModal";
import { useCartStore } from "@/shared/store/useCartStore";
import {
  CartItem,
  CostSummary,
  MaterialItem,
  MaterialItemTable,
} from "@/shared/types";
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

  const { register, handleSubmit, reset, control } =
    useForm<QuoteClientInfoPayload>({
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
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const itemsToSend: CreateQuotePayload[] = items.map((item) => {
      const isPartitionWall = item.product === "Partition Walls";
      const isCanopy = item.product === "Architectural Canopy";
      let dimensions: Record<string, number> = {};

      if (isCanopy) {
        item.materials?.forEach((m) => {
          const name = m.name.toLowerCase();
          if (name.includes("front") && name.includes("width"))
            dimensions.frontWidth = m.inches;
          else if (name.includes("back") && name.includes("width"))
            dimensions.backWidth = m.inches;
          else if (name.includes("middle") && name.includes("width"))
            dimensions.middleWidth = m.inches;
          else if (name.includes("left") && name.includes("projection"))
            dimensions.leftProjection = m.inches;
          else if (name.includes("right") && name.includes("projection"))
            dimensions.rightProjection = m.inches;
          else if (name.includes("middle") && name.includes("projection"))
            dimensions.middleProjection = m.inches;
          else if (
            name.includes("fascia") &&
            name.includes("width") &&
            !dimensions.width
          )
            dimensions.width = m.inches;
          else if (
            name.includes("fascia") &&
            name.includes("projection") &&
            !dimensions.projection
          )
            dimensions.projection = m.inches;
        });
      }
      if (isPartitionWall && item.dimensionsWall) {
        dimensions.width = Number(item.dimensionsWall.width);
        dimensions.height = Number(item.dimensionsWall.height);
      }

      const validAddOns = [
        "Crown",
        "Tube",
        "Channel",
        '1" In',
        '1" Out',
        '3" Extender',
      ];
      const derivedAddOns = uniq(
        item.materials
          ?.filter((m) =>
            validAddOns.some((addon) =>
              m.name.toLowerCase().includes(addon.toLowerCase())
            )
          )
          .map((m) =>
            validAddOns.find((addon) =>
              m.name.toLowerCase().includes(addon.toLowerCase())
            )
          )
          .filter(Boolean)
      );
      console.log("ITEM PRODUCT:", item.product);

      return {
        product: item.product,
        product_type: isPartitionWall
          ? item.selectedSTC
          : item.productType || "Custom Type",
        shape: item.shape || "",
        addOns: derivedAddOns as string[],
        dimensions,
        materials:
          item.materials?.map((m) => ({
            material: m.name,
            color: m.color,
            size: `${m.inches} in`,
            qty: m.quantity,
            price: m.total,
          })) || [],
        materialCost: item.costSummary?.materialCost || 0,
        cutCost: item.costSummary?.cutsCost || 0,
        markup: item.costSummary?.finalMarkup || 0,
        subtotal: item.costSummary?.pricePlus15Markup || 0,
        total: item.price,
        color: isPartitionWall ? item.color : undefined,
        quantity: item.quantity ?? 1,
        additionalInfo: {},
      };
    });

    const finalQuoteToSend = {
      customerName: formData.customerName,
      customerLastName: formData.customerLastName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      address_street: formData.address_street,
      address_city: formData.address_city,
      address_state: formData.address_state,
      address_zip: formData.address_zip,
      total: itemsToSend.reduce((acc, item) => acc + item.total, 0),
      items: itemsToSend,
    };
    console.log(finalQuoteToSend);

    quoteMutation.mutate(finalQuoteToSend);
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

                    {item.dimensionsWall && (
                      <p className="text-xs text-gray-500">
                        {item.dimensionsWall?.width}" x{" "}
                        {item.dimensionsWall?.height}"
                      </p>
                    )}
                    {item.dimensions && (
                      <p className="text-xs text-gray-500">
                        {item.dimensions?.frontWidth}" x{" "}
                        {item.dimensions?.projection}"
                      </p>
                    )}

                    {/* Breakdown solo si NO es Partition Wall */}
                    {!item.hidePrice &&
                      (item.product == "Architectural Canopy" ? (
                        <button
                          onClick={() => {
                            if (item.materials) {
                              const summary = calculateCostSummary(
                                item.materials,
                                item.costSummary?.finalMarkup ?? 0
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
                          {formatCurrency(item.price)}
                        </span>
                      ))}

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
                    {!item.hidePrice && (
                      <span className="text-sm text-gray-800 font-semibold mt-1">
                        Total: {formatCurrency(item.price * item.quantity)}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button
            onClick={() => {
              const validItem = items.find(
                (item) => item.materials && item.costSummary
              );

              if (validItem) {
                useQuoteStore
                  .getState()
                  .setQuoteData(validItem.materials, validItem.costSummary);
                useUIStore.getState().openQuoteModal();
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
