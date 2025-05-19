"use client";
import { CostSummary, MaterialItem, MaterialItemTable } from "@/types";
import React from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  materials: MaterialItemTable[];
  summary: CostSummary;
  projectName: string;
  onClose: () => void;
};

export const PricingBreakdownModal = ({
  materials,
  summary,
  projectName,
  onClose,
}: Props) => {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 z-80 w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 transform -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{projectName}</h2>
            <p className="text-sm text-gray-500">Generated on {today}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto h-[60vh]">
          <table className="w-full text-sm border border-slate-300 rounded-md overflow-hidden">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="py-2 px-3">Material</th>
                <th className="py-2 px-3">Color</th>
                <th className="py-2 px-3">Size</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {materials
                .filter((item) => item.total > 0)
                .map((item, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3">{item.color}</td>
                    <td className="py-2 px-3">{item.inches} in</td>
                    <td className="py-2 px-3">{item.quantity} pcs</td>
                    <td className="py-2 px-3 font-semibold">
                      ${item.total.toFixed(2)}
                      <div className="text-xs text-gray-500">
                        (${item.pricePerInch.toFixed(2)}/in)
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <SummaryCard label="Material Cost" value={summary.materialCost} />
          <SummaryCard label="Cut Cost" value={summary.cutsCost} />
          <SummaryCard label="Material + Cut" value={summary.combinedCost} />
          <SummaryCard label="15% Markup" value={summary.markup} />
          <SummaryCard
            label="Subtotal + 15%"
            value={summary.pricePlus15Markup}
          />
          <SummaryCard label="Final Markup" value={summary.finalMarkup} />
          <SummaryCard label="Total" value={summary.finalTotal} highlight />
        </div>
      </div>
    </>
  );
};

const SummaryCard = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center border rounded-xl justify-center shadow-sm bg-white h-16">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={
          highlight
            ? "text-[#ff5100] font-bold text-xl"
            : "text-orange-500 font-semibold text-lg"
        }
      >
        ${value.toFixed(2)}
      </span>
    </div>
  );
};
