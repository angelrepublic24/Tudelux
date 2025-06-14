import { create } from "zustand";
import * as THREE from "three";

interface CanopyState {
  selectedComponent: string | null;
  setSelectedComponent: (name: string | null) => void;

  gltfScene: THREE.Group | null;
  setGltfScene: (scene: THREE.Group) => void;

  slot1: string;
  slot2: string;
  slot1Color: string;
  slot2Color: string;

  fasciaColor: string;
  coverColor: string;
  topRoofColor: string;
  louverColor: string;
  louverSpacing: string;
  louverTilt: string;
  louverType: string;

  setOption: (key: keyof CanopyState, value: any) => void;
}

export const useCanopyStore = create<CanopyState>((set) => ({
  selectedComponent: null,
  setSelectedComponent: (name) => set({ selectedComponent: name }),

  gltfScene: null,
  setGltfScene: (scene) => set({ gltfScene: scene }),

  slot1: "",
  slot2: "",
  slot1Color: "#ff0000",
  slot2Color: "#00ff00",

  fasciaColor: "#ffffff",
  coverColor: "#ffffff",
  topRoofColor: "#ffffff",
  louverColor: "#ffffff",
  louverSpacing: "",
  louverTilt: "",
  louverType: "",

  setOption: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
