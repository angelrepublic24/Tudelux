import { ProductTypeEnum } from "@/modules/products/types/product-type.enum";
import { z } from "zod";

export const CustomerDetailsSchema = z.object({
  budget: z.number().optional(),
  productType: z.nativeEnum(ProductTypeEnum).optional(),
  objective: z.string().optional(),
  timeline: z.string().optional(),
  notes: z.string().optional(),
});


export const CreateClientSchema = z.object({
  name: z.string().min(1),
  lName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),

  address_street: z.string().optional(),
  address_city: z.string().optional(),
  address_state: z.string().optional(),
  address_zip: z.string().optional(),

  details: CustomerDetailsSchema.optional(),
});


export type CreateClientType = z.infer<typeof CreateClientSchema>;
export type CustomerDetailsType = z.infer<typeof CustomerDetailsSchema>;