import { CreateQuotePayload } from "../schema/quote.schema";

export type QuoteToSend = {
  date: string;
  customer: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  total: number; // suma de todos los payloads
  items: CreateQuotePayload[]; // Aquí van todos los productos
};