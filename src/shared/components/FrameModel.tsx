// components/Model.tsx
'use client';
import { useGLTF } from '@react-three/drei';

type Props = {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export const FrameModel = ({ position, rotation = [0, 0, 0], scale = [1, 1, 1] }: Props) => {
  const { scene } = useGLTF('/components/frameSize.glb');
  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};
