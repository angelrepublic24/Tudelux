import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema";

export interface IUser {
  id: number;
  name: string;
  lName: string;
  email: string;
  password: string;
  roles: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone?: string;
  company?: {
    name: string;
  };
  details?: IUserDetails;
}

export type UserType = {
  name: string;
  lName: string;
  email: string;
  roles: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone?: string;
  company?: {
    name: string;
  };
  details?: IUserDetails;
}

export interface IUserDetails {
  budget?: number;
  projectName?: string;
  companyType?: string;
  website?: string;
  notes?: string;
  // ...otros campos específicos de clientes o distribuidores
}

export type ProfileType = Omit<IUser, "id" | "password" | "roles" | "email"> & {
  phone: string;
  address: {
    address_street: string;
    address_city: string;
    address_state: string;
    address_zip: string;
  };
};
// src/types/roles.ts
export enum UserRole {
  ADMIN = "admin",
  SALES = "sales",
  ROOT = "root",
  BDR = "business_dev",
  DISTRIBUTOR = "distributor",
  CUSTOMER = "customer",
}

export type DistributorAndSeller = Pick<
  IUser,
  "id" | "name" | "email" | "address" | "company" | "createdAt" | "status"
>;
export type LoginFormType = z.infer<typeof LoginSchema>;
export type RegisterFormType = z.infer<typeof RegisterSchema>;
export const USER_ROLE_OPTIONS = [
  { label: "Admin", value: UserRole.ADMIN },
  { label: "Sales", value: UserRole.SALES },
  { label: "Root", value: UserRole.ROOT },
  { label: "Business developer", value: UserRole.BDR },
  { label: "Distributor", value: UserRole.DISTRIBUTOR },
];
