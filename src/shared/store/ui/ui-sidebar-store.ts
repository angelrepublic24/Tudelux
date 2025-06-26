// shared/store/ui/sidebar-store.ts
import { create } from "zustand";

type SidebarState = {
  expanded: boolean;
  toggle: () => void;
  setExpanded: (value: boolean) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  expanded: false,
  toggle: () => set((s) => ({ expanded: !s.expanded })),
  setExpanded: (value) => set({ expanded: value }),
}));
