"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import ComponentModel from "./ComponentModel";
import { PreloadModels } from "./preloadGLB";

type Instance = {
  id: string;
  file: string;
  position: [number, number, number];
  color?: string;
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export default function CanopyBuilder() {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [positionStep, setPositionStep] = useState<number>(0.01);
  const [scaleStep, setScaleStep] = useState<number>(0.01);

  const addComponent = (type: "size" | "corner" | "new") => {
    let file = "";
    if (type === "size") {
      file = "/components/frameSize.glb";
    } else if (type === "corner") {
      file =
        instances.filter((i) => i.file.includes("leftCorner")).length <=
        instances.filter((i) => i.file.includes("rightCorner")).length
          ? "/components/leftCorner.glb"
          : "/components/rightCorner.glb";
    } else if (type === "new") {
      file = "/components/slot.glb";
    }

    const defaultPosition: [number, number, number] = [
      Math.random() * 4 - 2,
      0,
      Math.random() * 4 - 2,
    ];

    const newInstance: Instance = {
      id: `${type}-${Date.now()}`,
      file,
      position: defaultPosition,
      color: "#ffffff",
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };

    setInstances((prev) => [...prev, newInstance]);
  };

  const handleColorChange = (color: string) => {
    if (!selectedId) return;
    setInstances((prev) =>
      prev.map((inst) => (inst.id === selectedId ? { ...inst, color } : inst))
    );
  };

  const handleRotationChange = (axis: number, value: number) => {
    if (!selectedId) return;
    setInstances((prev) =>
      prev.map((inst) =>
        inst.id === selectedId
          ? {
              ...inst,
              rotation: inst.rotation?.map((r, i) =>
                i === axis ? value : r
              ) as [number, number, number],
            }
          : inst
      )
    );
  };

  const handlePositionChange = (axis: number, value: number) => {
    if (!selectedId) return;
    setInstances((prev) =>
      prev.map((inst) =>
        inst.id === selectedId
          ? {
              ...inst,
              position: inst.position.map((p, i) =>
                i === axis ? value : p
              ) as [number, number, number],
            }
          : inst
      )
    );
  };

  const handleScaleChange = (axis: number, value: number) => {
    if (!selectedId) return;
    setInstances((prev) =>
      prev.map((inst) =>
        inst.id === selectedId
          ? {
              ...inst,
              scale: inst.scale?.map((s, i) => (i === axis ? value : s)) as [
                number,
                number,
                number
              ],
            }
          : inst
      )
    );
  };

  const selected = instances.find((i) => i.id === selectedId);

  return (
    <div className="flex h-screen">
      {/* Sidebar izquierdo */}
      <aside className="w-1/4 p-4 bg-gray-100 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-[#ff5100]">Add Parts</h2>
        <button
          onClick={() => addComponent("size")}
          className="w-full bg-[#ff5100] text-white py-2 mb-2 rounded hover:bg-orange-600 transition"
        >
          Add Size
        </button>
        <button
          onClick={() => addComponent("corner")}
          className="w-full bg-[#ff5100] text-white py-2 mb-2 rounded hover:bg-orange-600 transition"
        >
          Add Corner
        </button>
        <button
          onClick={() => addComponent("new")}
          className="w-full bg-[#ff5100] text-white py-2 mb-2 rounded hover:bg-teal-600 transition"
        >
          Add Slot Top
        </button>
      </aside>

      {/* Canvas */}
      <main className="flex-1 relative">
        <Canvas
          camera={{ position: [5, 5, 5], fov: 50 }}
          onPointerMissed={() => setSelectedId(null)}
          shadows
        >
          <ambientLight intensity={0.3} />
          <directionalLight
            intensity={0.8}
            position={[10, 10, 5]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <spotLight
            intensity={0.5}
            position={[5, 15, 5]}
            angle={0.3}
            penumbra={1}
            castShadow
          />
          <Environment preset="city" />
          <color attach="background" args={["#f0f0f0"]} />
          <OrbitControls />
          <Grid args={[10, 10]} cellSize={1} cellThickness={0.5} />
          <PreloadModels />
          {instances.map((inst) => (
            <ComponentModel
              key={inst.id}
              file={inst.file}
              position={inst.position}
              color={inst.color}
              rotation={inst.rotation}
              scale={inst.scale}
              isSelected={selectedId === inst.id}
              onClick={() => setSelectedId(inst.id)}
              onPositionChange={(pos) => {
                setInstances((prev) =>
                  prev.map((item) =>
                    item.id === inst.id ? { ...item, position: pos } : item
                  )
                );
              }}
            />
          ))}
        </Canvas>
      </main>

      {/* Panel derecho */}
      <aside className="w-1/4 p-4 bg-gray-50 border-l overflow-y-auto">
        {selected ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-[#ff5100]">
              Edit: {selected.id}
            </h2>

            {/* Color */}
            <label className="block text-sm mb-1">Color</label>
            <input
              type="color"
              value={selected.color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-10 rounded"
            />

            {/* Rotation */}
            <h3 className="mt-6 font-semibold text-gray-700">Rotation</h3>
            {["X", "Y", "Z"].map((axis, i) => (
              <div key={`rot-${axis}`}>
                <label className="block text-sm mt-2 mb-1">
                  Rotation {axis}
                </label>
                <input
                  type="range"
                  step={0.01}
                  min={0}
                  max={Math.PI * 2}
                  value={selected.rotation?.[i] ?? 0}
                  onChange={(e) =>
                    handleRotationChange(i, parseFloat(e.target.value))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            ))}

            {/* Position */}
            <h3 className="mt-6 font-semibold text-gray-700">Position</h3>
            {["X", "Y", "Z"].map((axis, i) => (
              <div key={`pos-${axis}`}>
                <label className="block text-sm mt-2 mb-1">
                  Position {axis}
                </label>
                <input
                  type="number"
                  step={positionStep}
                  min={-5}
                  max={5}
                  value={selected.position?.[i] ?? 0}
                  onChange={(e) =>
                    handlePositionChange(i, parseFloat(e.target.value))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            ))}

            {/* Scale */}
            <h3 className="mt-6 font-semibold text-gray-700">Scale</h3>
            {["X", "Y", "Z"].map((axis, i) => (
              <div key={`scale-${axis}`}>
                <label className="block text-sm mt-2 mb-1">Scale {axis}</label>
                <input
                  type="number"
                  step={scaleStep}
                  min={0.01}
                  max={10}
                  value={selected.scale?.[i] ?? 1}
                  onChange={(e) =>
                    handleScaleChange(i, parseFloat(e.target.value))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            ))}

            {/* Steps */}
            <label className="block text-sm mt-6 mb-1">Position Step</label>
            <select
              value={positionStep}
              onChange={(e) => setPositionStep(parseFloat(e.target.value))}
              className="w-full border px-2 py-1 rounded"
            >
              <option value={0.01}>Fine (0.01)</option>
              <option value={0.1}>Normal (0.1)</option>
              <option value={1}>Fast (1)</option>
            </select>

            <label className="block text-sm mt-4 mb-1">Scale Step</label>
            <select
              value={scaleStep}
              onChange={(e) => setScaleStep(parseFloat(e.target.value))}
              className="w-full border px-2 py-1 rounded"
            >
              <option value={0.01}>Fine (0.01)</option>
              <option value={0.1}>Normal (0.1)</option>
              <option value={0.5}>Fast (0.5)</option>
            </select>
          </>
        ) : (
          <p className="text-gray-500">Select a component to edit it</p>
        )}
      </aside>
    </div>
  );
}
