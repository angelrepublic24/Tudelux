


// src/schema/material.schema.ts
import { z } from "zod";

export const productVariantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  benefits: z.array(z.string()).optional(),
});


export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  video: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  variants: z.array(productVariantSchema).optional(),
});

export type ProductFormType = z.infer<typeof productSchema> & { id?: number };
export type Product = z.infer<typeof productSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
