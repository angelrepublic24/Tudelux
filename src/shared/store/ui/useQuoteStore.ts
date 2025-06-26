import { create } from "zustand";
import { MaterialItemTable, CostSummary } from "@/shared/types";

type QuoteStore = {
  quoteMaterials: MaterialItemTable[] | null;
  quoteSummary: CostSummary | null;
  salesCode: string | null;
  setQuoteData: (materials: MaterialItemTable[], summary: CostSummary) => void;
  clearQuoteData: () => void;
  setSalesCode: (code: string) => void;
};

export const useQuoteStore = create<QuoteStore>((set) => ({
  quoteMaterials: null,
  quoteSummary: null,
  salesCode: null,
  setQuoteData: (materials, summary) =>
    set({ quoteMaterials: materials, quoteSummary: summary }),
  clearQuoteData: () =>
    set({ quoteMaterials: null, quoteSummary: null, salesCode: null }),
  setSalesCode: (code) => set({ salesCode: code }),
}));
