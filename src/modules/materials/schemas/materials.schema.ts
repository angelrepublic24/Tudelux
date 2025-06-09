// src/schema/material.schema.ts
import { z } from "zod";

export const materialVariantSchema = z.object({
  color: z.string().min(1),
  unit: z.enum(['in', 'ft']),
  stock: z.number().min(0),
  pricePerUnit: z.number().min(0),
});

export const materialSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  compatibleWith: z.array(z.string()).min(1, "At least one compatibility value is required."),
  variants: z.array(materialVariantSchema).optional(),
});

// Para usar con react-hook-form:
export type MaterialFormType = z.infer<typeof materialSchema>;
