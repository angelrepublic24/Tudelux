import { z } from "zod";

export const RegisterSaleSchema = z
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
      address_street: z.string().min(1, "Street is required"),
      address_city: z.string().min(1, "City is required"),
      address_state: z.string().min(1, "State is required"),
      address_zip: z.string().min(4, "ZIP is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

  export type RegisterSaleFormType = z.infer<
    typeof RegisterSaleSchema
  >;