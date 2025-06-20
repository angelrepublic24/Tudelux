// src/schema/material.schema.ts
import { z } from "zod";

export const materialVariantSchema = z.object({
  color: z.string().min(1),
  unit: z.string().min(1), 
  stock: z.number().min(0),
  pricePerUnit: z.number().min(0),
});

export const materialSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  compatibleWith: z.array(z.string()).optional(),
  variants: z.array(materialVariantSchema).optional(),
});

// Para usar con react-hook-form:
export type MaterialFormType = z.infer<typeof materialSchema>;
export type Material = z.infer<typeof materialSchema>;
export type MaterialVariant = z.infer<typeof materialVariantSchema>;