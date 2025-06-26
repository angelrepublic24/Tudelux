import { materialSchema } from "@/modules/materials/schemas/materials.schema";
import { z } from "zod";

export const QuoteSchema = z.object({
  product: z.string().optional(),
  product_type: z.string().optional(),
  shape: z.string().optional(),
  addOns: z.array(z.string()).optional(),
  dimensions: z.record(z.number()).optional(),
  materials: z.array(
    z.object({
      material: z.string(),
      color: z.string(),
      size: z.string(),
      qty: z.number(),
      price: z.number(),
    })
  ),
  materialCost: z.number(),
  color: z.string().optional(),
  quantity: z.number(),
  cutCost: z.number(),
  markup: z.number(),
  subtotal: z.number(),
  total: z.number(),
  materialsToBuild: z.array(materialSchema).optional(),
  additionalInfo: z.record(z.any()).optional(),
});

export const QuoteClientInfoSchema = z.object({
  customerName: z.string(),
  customerLastName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  address_street: z.string().optional(),
  address_city: z.string().optional(),
  address_state: z.string().optional(),
  address_zip: z.string().optional(),
});
export const QuoteToSendSchema = z.object({
  date: z.string(), // ISO
  total: z.number(),
  salesCode: z.string().optional(), // ✅ aquí
  customer: QuoteClientInfoSchema.extend({
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
    }),
  }),
  items: z.array(QuoteSchema),
});

export type QuoteToSendPayload = z.infer<typeof QuoteToSendSchema>;

export type QuoteClientInfoPayload = z.infer<typeof QuoteClientInfoSchema>;

export type CreateQuotePayload = z.infer<typeof QuoteSchema>;
