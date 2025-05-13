'use client';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';

type Props = {
  url: string;
};

const GLBModel = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const controls = useRef<any>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (scene && controls.current) {
      // Calcular el bounding box del modelo
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());

      // Enfocar el centro del modelo
      controls.current.target.copy(center);

      // Opcional: mover la cámara mirando al centro
      camera.lookAt(center);
    }
  }, [scene, camera]);

  return (
    <>
      <primitive object={scene} />
      <OrbitControls ref={controls} enableZoom />
    </>
  );
};

export const ImageRender = ({ url }: Props) => {
  const is3DModel = url.endsWith('.glb') || url.endsWith('.gltf');

  if (is3DModel) {
    return (
      <div className="w-full h-[400px]">
        <Canvas camera={{ position: [3, 2, 5] }}>
          <ambientLight />
          <Suspense fallback={null}>
            <GLBModel url={url} />
          </Suspense>
        </Canvas>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <Image
        src={url}
        alt="Render"
        width={600}
        height={400}
        unoptimized
        className="object-contain"
      />
    </div>
  );
};
