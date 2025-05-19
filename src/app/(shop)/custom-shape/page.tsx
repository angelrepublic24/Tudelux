'use client';
import { Canvas2D, LineData } from '@/components/Canvas2d';
import { Scene3D } from '@/components/Scene3d';
import { useState } from 'react';
 

export default function CustomShapePage() {
  const [lines, setLines] = useState<LineData[]>([]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Draw Lines</h2>
        <Canvas2D onLineDrawn={(line) => setLines((prev) => [...prev, line])} />
      </div>
      <div className="h-[400px]">
        <h2 className="text-xl font-bold mb-2">3D View</h2>
        <Scene3D lines={lines} />
      </div>
    </div>
  );
}
