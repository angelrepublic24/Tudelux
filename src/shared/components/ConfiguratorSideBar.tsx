"use client";

import { ConfigState } from "../types";

interface ConfiguratorSidebarProps {
  config: ConfigState;
  onChange: (key: keyof ConfigState, value: string) => void;
}

const inputClass = "border px-2 py-1 rounded w-full";

export const ConfiguratorSidebar = ({
  config,
  onChange,
}: ConfiguratorSidebarProps) => {
  return (
    <div className="w-80 bg-white shadow-xl p-4 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Configurator</h2>

      {/* Width */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Width</label>
        <input
          type="number"
          className={inputClass}
          value={config.width}
          onChange={(e) => onChange("width", e.target.value)}
        />
      </div>

      {/* Projection */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Projection</label>
        <input
          type="number"
          className={inputClass}
          value={config.projection}
          onChange={(e) => onChange("projection", e.target.value)}
        />
      </div>

      {/* Slot 1 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Slot 1</label>
        <select
          className={inputClass}
          value={config.slot1}
          onChange={(e) => onChange("slot1", e.target.value)}
        >
          {["CHANNEL", "TUBE", "CROWN", "NONE"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Slot 1 Color */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Slot 1 Color</label>
        <select
          className={inputClass}
          value={config.slot1Color}
          onChange={(e) => onChange("slot1Color", e.target.value)}
        >
          {["WHITE", "BRONZ", "BLACK"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Slot 2 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Slot 2</label>
        <select
          className={inputClass}
          value={config.slot2}
          onChange={(e) => onChange("slot2", e.target.value)}
        >
          {["CHANNEL", "TUBE", "CROWN", "NONE"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Slot 2 Color */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Slot 2 Color</label>
        <select
          className={inputClass}
          value={config.slot2Color}
          onChange={(e) => onChange("slot2Color", e.target.value)}
        >
          {["WHITE", "BRONZ", "BLACK"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Fascia Color */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Fascia Color</label>
        <select
          className={inputClass}
          value={config.fasciaColor}
          onChange={(e) => onChange("fasciaColor", e.target.value)}
        >
          {["WHITE", "BRONZ", "BLACK"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Cover Color */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Cover Color</label>
        <select
          className={inputClass}
          value={config.coverColor}
          onChange={(e) => onChange("coverColor", e.target.value)}
        >
          {["WHITE", "BRONZ", "BLACK"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Top Roof Color */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Top Roof Color</label>
        <select
          className={inputClass}
          value={config.topRoofColor}
          onChange={(e) => onChange("topRoofColor", e.target.value)}
        >
          {["WHITE", "BRONZ", "BLACK"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Louver Color */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Louver Color</label>
        <select
          className={inputClass}
          value={config.louverColor}
          onChange={(e) => onChange("louverColor", e.target.value)}
        >
          {["WHITE", "BRONZ", "BLACK"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Louver Type */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Louver Type</label>
        <select
          className={inputClass}
          value={config.louverType}
          onChange={(e) => onChange("louverType", e.target.value)}
        >
          {["round", "flat"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Spacing */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Spacing</label>
        <input
          type="number"
          className={inputClass}
          value={config.spacing}
          onChange={(e) => onChange("spacing", e.target.value)}
        />
      </div>

      {/* Tilt */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Tilt</label>
        <input
          type="number"
          className={inputClass}
          value={config.tilt}
          onChange={(e) => onChange("tilt", e.target.value)}
        />
      </div>
    </div>
  );
};
