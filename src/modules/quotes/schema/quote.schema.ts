import { z } from "zod";


export const QuoteSchema = z.object({
  customerName: z.string(),
  customerLastName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  address_street: z.string().optional(),
  address_city: z.string().optional(),
  address_state: z.string().optional(),
  address_zip: z.string().optional(),

  product: z.string().optional(), // 👈 nuevo campo
  product_type: z.string().optional(), // 👈 nuevo campo
  shape: z.string().optional(), // 👈 nuevo campo
  addOns: z.array(z.string()).optional(), // 👈 nuevo campo
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
  cutCost: z.number(),
  markup: z.number(),
  subtotal: z.number(),
  total: z.number(),
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

export type QuoteClientInfoPayload = z.infer<typeof QuoteClientInfoSchema>;

export type CreateQuotePayload = z.infer<typeof QuoteSchema>;

