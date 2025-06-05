"use client";

import { useGLTF, TransformControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Color, Group } from "three";

type Props = {
  file: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number]; // ✅ Agregado
  color?: string;
  onClick?: () => void;
  isSelected?: boolean;
  onPositionChange?: (pos: [number, number, number]) => void;
};

export default function ComponentModel({
  file,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1], // ✅ Valor por defecto
  color = "#ffffff",
  onClick,
  isSelected = false,
  onPositionChange,
}: Props) {
  const { scene } = useGLTF(file);
  const groupRef = useRef<Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color = new Color(color);
      }
    });
    return clone;
  }, [scene, color]);

  const GroupContent = (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale} // ✅ Aplicar la escala
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <primitive object={clonedScene} />
    </group>
  );

  return isSelected && groupRef.current ? (
    <TransformControls
      object={groupRef.current}
      mode="translate"
      makeDefault
      showX
      showY={false}
      showZ
      translationSnap={0.001}
      rotationSnap={Math.PI / 180 / 4}
      onObjectChange={() => {
        if (groupRef.current && onPositionChange) {
          const pos = groupRef.current.position;
          onPositionChange([pos.x, pos.y, pos.z]);
        }
      }}
    >
      {GroupContent}
    </TransformControls>
  ) : (
    GroupContent
  );
}
