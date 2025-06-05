import React, { useEffect, useRef } from "react";

interface AddOnTooltipProps {
  title: string;
  buttons: string[];
  selected: string[];
  onToggle: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AddOnTooltip: React.FC<AddOnTooltipProps> = ({
  title,
  buttons,
  selected,
  onToggle,
  onConfirm,
  onCancel,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  return (
    <div
      ref={tooltipRef}
      className="absolute top-full mt-2 right-0 bg-white shadow-lg border border-gray-200 rounded-lg p-4 z-50 w-64"
    >
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => onToggle(btn)}
            disabled={!selected.includes(btn) && selected.length >= 3}
            className={`px-2 py-1 text-sm rounded border transition ${
              selected.includes(btn)
                ? "bg-[#ff5100] text-white border-[#ff5100]"
                : "bg-white text-gray-700 border-gray-300"
            } ${
              !selected.includes(btn) && selected.length >= 3 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={onCancel}
          className="text-sm text-gray-500 underline"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="text-sm bg-[#ff5100] text-white px-4 py-1 rounded hover:bg-orange-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
