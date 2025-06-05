import { create } from "zustand";
import { MaterialItemTable, CostSummary } from "@/shared/types";

type QuoteStore = {
  quoteMaterials: MaterialItemTable[] | null;
  quoteSummary: CostSummary | null;
  setQuoteData: (materials: MaterialItemTable[], summary: CostSummary) => void;
  clearQuoteData: () => void;
};

export const useQuoteStore = create<QuoteStore>((set) => ({
  quoteMaterials: null,
  quoteSummary: null,
  setQuoteData: (materials, summary) => set({ quoteMaterials: materials, quoteSummary: summary }),
  clearQuoteData: () => set({ quoteMaterials: null, quoteSummary: null }),
}));
