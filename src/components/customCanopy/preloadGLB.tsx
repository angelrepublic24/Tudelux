"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const models = [
  "/components/frameSize.glb",
  "/components/leftCorner.glb",
  "/components/rightCorner.glb",
  "/components/slot.glb",
];

export function PreloadModels() {
  useEffect(() => {
    models.forEach((path) => useGLTF.preload(path));
  }, []);

  return null;
}
