import { z } from "zod";

export const CompanySchemaForm = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  address_street: z.string().optional(),
  address_city: z.string().optional(),
  address_state: z.string().optional(),
  address_zip: z.string().optional(),
});

export const CompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  address_street: z.string().optional(),
  address_city: z.string().optional(),
  address_state: z.string().optional(),
  address_zip: z.string().optional(),
});

export type Company = z.infer<typeof CompanySchema>;
