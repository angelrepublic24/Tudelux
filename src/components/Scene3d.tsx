'use client';
import { Canvas, useThree } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FrameModel } from './FrameModel';

type LineData = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
};

type Props = {
  lines: LineData[];
};

function AutoCameraAdjust({ lines }: { lines: LineData[] }) {
  const { camera, controls } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);


  useEffect(() => {
  if (!controlsRef.current || lines.length === 0) return;

  const xs = lines.flatMap(line => [line.x1 / 100, line.x2 / 100]);
  const ys = lines.flatMap(line => [-line.y1 / 100, -line.y2 / 100]);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const size = Math.max(maxX - minX, maxY - minY);

  camera.position.set(centerX, centerY, size + 2);
  camera.lookAt(centerX, centerY, 0);

  controlsRef.current.target.set(centerX, centerY, 0);
  controlsRef.current.update();
}, [lines]);

  return null;
}

export const Scene3D = ({ lines }: Props) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls ref={controlsRef} makeDefault enableZoom enableRotate />

      <Suspense fallback={null}>
        {lines.map((line, i) => {
          const dx = line.x2 - line.x1;
          const dy = line.y2 - line.y1;
          const angle = Math.atan2(dy, dx);
          const centerX = (line.x1 + line.x2) / 2 / 100;
          const centerY = (line.y1 + line.y2) / 2 / 100;

          return (
            <FrameModel
              key={i}
              position={[centerX, -centerY, 0]}
              rotation={[0, 0, -angle]}
              scale={[0.1, 0.1, 0.1]}
            />
          );
        })}
        <AutoCameraAdjust lines={lines} />
      </Suspense>
    </Canvas>
  );
};
