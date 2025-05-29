import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(2, { message: "The name is required" }),
    lName: z.string().min(2, { message: "The last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(6, { message: "The password is too short, min 6 characters" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "The password don't match",
    path: ["password_confirmation"],
  });

export const RegisterDistributorSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    lName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string(),

    phone: z
      .string()
      .min(7, "Phone number is required")
      .regex(/^[0-9()+-\s]*$/, "Invalid phone number"),

    company: z.string().min(1, "Company name is required"),

    address: z.object({
      street: z.string().min(1, "Street is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      zip: z.string().min(4, "ZIP is required"),
    }),
    roles: z.tuple([z.literal("distributor")]),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(6, { message: "The password is too short, min 6 characters" }),
});

export const CompanySchemaForm = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  address_street: z.string().optional(),
  address_city: z.string().optional(),
  address_state: z.string().optional(),
  address_zip: z.string().optional(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  lName: z.string(),
  email: z.string().email(),
  roles: z.array(z.string()),
  company: CompanySchemaForm.optional().nullable(), // 👈 hazlo opcional
});
export const CompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  address_street: z.string().optional(),
  address_city: z.string().optional(),
  address_state: z.string().optional(),
  address_zip: z.string().optional(),
});

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
export type User = z.infer<typeof UserSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type RegisterDistributorFormType = z.infer<
  typeof RegisterDistributorSchema
>;
