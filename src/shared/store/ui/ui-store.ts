import { create } from "zustand";

type UIState = {
  isSideMenuOpen: boolean;
  isCartOpen: boolean;
  isQuoteModalOpen: boolean; // ✅ NUEVO

  openSideMenu: () => void;
  closeSideMenu: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  openQuoteModal: () => void; // ✅ NUEVO
  closeQuoteModal: () => void;
};

export const useUIStore = create<UIState>()((set, get) => ({
  isSideMenuOpen: false,
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),

  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

  isQuoteModalOpen: false, // ✅
  openQuoteModal: () => set({ isQuoteModalOpen: true }),
  closeQuoteModal: () => set({ isQuoteModalOpen: false }),
}));
