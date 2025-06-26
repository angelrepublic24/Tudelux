// components/Modals/QuoteModal.tsx
"use client";

import { useUIStore } from "@/shared/store/ui/ui-store";
import { useCartStore } from "@/shared/store/useCartStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QuoteClientInfoPayload,
  QuoteClientInfoSchema,
  CreateQuotePayload,
} from "@/modules/quotes/schema/quote.schema";
import { createQuote } from "@/modules/quotes/api/QuoteApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { StateSelector } from "@/shared/components/LocationInput/StateSelector";
import { generateQuotePayload } from "@/shared/utils/quote/generateQuotePayload";

export const RequestQuoteModal = () => {
  const isOpen = useUIStore((s) => s.isQuoteModalOpen);
  const close = useUIStore((s) => s.closeQuoteModal);
  const clearCart = useCartStore((s) => s.clearCart);


  const items = useCartStore((s) => s.items);

  const { register, handleSubmit, control, reset } =
    useForm<QuoteClientInfoPayload>({
      resolver: zodResolver(QuoteClientInfoSchema),
    });

  const quoteMutation = useMutation({
    mutationFn: createQuote,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      close();
      clearCart()
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: QuoteClientInfoPayload) => {
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const finalQuoteToSend = generateQuotePayload(formData, items);
    console.log(finalQuoteToSend); // Solo para depuración

    quoteMutation.mutate(finalQuoteToSend);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm lg:max-w-md">
        <h2 className="text-xl font-bold mb-4">Send Quote</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input {...register("customerName")} placeholder="First Name" />
          <Input {...register("customerLastName")} placeholder="Last Name" />
          <Input {...register("customerEmail")} placeholder="Email" />
          <Input {...register("customerPhone")} placeholder="Phone" />
          <Input {...register("address_street")} placeholder="Address" />
          <Input {...register("address_city")} placeholder="City" />
          <StateSelector control={control} />
          <Input {...register("address_zip")} placeholder="ZIP" />

          <button
            type="submit"
            className="w-full bg-[#ff5100] text-white py-2 rounded"
          >
            Send Quote
          </button>
          <button
            type="button"
            onClick={close}
            className="w-full text-gray-500 mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
