"use client";

import { useState } from "react";
import ComponentViewer from "@/shared/components/ThreeViewer";
import { ConfigState } from "@/shared/types";
import { ConfiguratorSidebar } from "@/shared/components/ConfiguratorSideBar";

export default function ConfiguratorPage() {
  const [config, setConfig] = useState<ConfigState>({
    width: "60",
    projection: "60",
    slot1: "TUBE",
    slot2: "CROWN",
    fasciaColor: "WHITE",
    slot1Color: "BRONZ",
    slot2Color: "BRONZ",
    coverColor: "BLACK",
    topRoofColor: "BLACK",
    louverColor: "BRONZ",
    spacing: "10",
    tilt: "22.5",
    louverType: "round",
  });

  const [globalColor, setGlobalColor] = useState<string>("");

  const handleChange = (key: keyof ConfigState, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* <ConfiguratorSidebar config={config} onChange={handleChange} /> */}

      <div className="flex-1 flex flex-col">
        {/* <div className="p-4 bg-white shadow z-10">
          <label className="block font-semibold mb-1">Global Color</label>
          <input
            type="color"
            value={globalColor}
            onChange={(e) => setGlobalColor(e.target.value)}
            className="w-16 h-10 border border-gray-300 rounded"
          />
        </div> */}

        {/* Visor 3D */}
        <div className="flex-1">
          <ComponentViewer  />
        </div>
      </div>
    </div>
  );
}
