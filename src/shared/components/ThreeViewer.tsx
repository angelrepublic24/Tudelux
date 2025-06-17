"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { ColladaLoader } from "three-stdlib";

type ColorMap = Record<string, string>;

const ComponentViewer = () => {
  const [daeScene, setDaeScene] = useState<THREE.Object3D | null>(null);
  const [colorMap, setColorMap] = useState<ColorMap>({});

  useEffect(() => {
    const loader = new ColladaLoader();
    loader.load("/v12.dae", (collada) => {
      const scene = collada.scene;
      console.log("🌳 Escena cargada:", scene);

      const initialColorMap: ColorMap = {};

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshName = child.name || child.uuid;
          const material = child.material as THREE.MeshStandardMaterial;

          if (
            material?.color instanceof THREE.Color &&
            !initialColorMap[meshName]
          ) {
            initialColorMap[meshName] = `#${material.color.getHexString()}`;
          }
        }
      });

      setColorMap(initialColorMap);
      setDaeScene(scene.clone(true));
    });
  }, []);

  // Aplicar colores desde colorMap
  useEffect(() => {
    if (!daeScene) return;

    daeScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const meshName = child.name || child.uuid;
        const material = child.material as THREE.MeshStandardMaterial;
        const newColor = colorMap[meshName];

        if (newColor && material?.color instanceof THREE.Color) {
          material.color.set(newColor);
        }
      }
    });
  }, [colorMap, daeScene]);

  const handleColorChange = (name: string, value: string) => {
    setColorMap((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar con inputs por Mesh */}
      <div className="w-72 bg-white p-4 overflow-y-auto border-r">
        <h2 className="text-lg font-bold mb-4">Identifica los componentes</h2>
        {Object.entries(colorMap).map(([meshName, color]) => (
          <div key={meshName} className="mb-4">
            <label className="text-sm block font-medium mb-1 break-all">
              {meshName}
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(meshName, e.target.value)}
              className="w-full h-10"
            />
          </div>
        ))}
      </div>

      {/* Viewer */}
      <div className="flex-1">
        {daeScene && (
          <Canvas shadows camera={{ position: [0, 4, 12], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <primitive object={daeScene} />
            <OrbitControls />
            <Environment preset="warehouse" />
          </Canvas>
        )}
      </div>
    </div>
  );
};

export default ComponentViewer;
