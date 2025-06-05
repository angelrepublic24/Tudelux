import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema";

export interface IUser {
  id: string;
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
  }
}

export type ProfileType = Omit<IUser, 'id' | 'password' | 'roles' | 'email'> & {
  phone: string;
  address: {
    address_street: string;
    address_city: string;
    address_state: string;
    address_zip: string;
  };
};

export type DistributorAndSeller = Pick<IUser, 'id' | 'name' | 'email' | 'address' | 'company' | 'createdAt' | 'status'>;
export type LoginFormType = z.infer<typeof LoginSchema>;
export type RegisterFormType = z.infer<typeof RegisterSchema>;