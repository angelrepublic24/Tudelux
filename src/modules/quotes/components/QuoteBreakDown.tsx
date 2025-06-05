"use client";
import { CostSummary, MaterialQuote } from "@/shared/types";
import Image from "next/image";
import { QuoteHeader } from "./QuoteHeader";

interface Props {
  materials: MaterialQuote[];
  summary: CostSummary;
  customerInfo: {
    name: string;
    lName: string;
    email: string;
    phone: string;
    address: string;
  };
  quoteNumber: string;
  quoteDate: string;
}

export const QuoteBreakDown = ({
  materials,
  summary,
  customerInfo,
  quoteNumber,
  quoteDate,
}: Props) => {
  return (
    <div className=" text-black font-sans text-sm">
      {/* Header */}
      <QuoteHeader customerInfo={customerInfo} quoteDate={quoteDate} quoteNumber={quoteNumber} />

      {/* Product Table */}
      <div className="bg-white w">
        <div className=" overflow-hidden mb-8 max-w-5xl mx-auto p-10">
        <table className="min-w-full text-sm">
          <thead className="text-white text-left">
            <tr>
              <th className="p-3 text-[#ff5100]">Material</th>
              <th className="p-3 text-[#ff5100]">Color</th>
              <th className="p-3 text-[#ff5100]">Size</th>
              <th className="p-3 text-[#ff5100]">Qty</th>
              <th className="p-3 text-[#ff5100] text-right">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-3">{item.material}</td>
                <td className="p-3">{item.color}</td>
                <td className="p-3">{item.size} in</td>
                <td className="p-3">{item.qty}</td>
                <td className="p-3 text-right font-semibold">
                  ${Number(item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end max-w-5xl mx-auto">
        <div className="w-full sm:w-1/2 md:w-1/3text-sm space-y-2">
          <SummaryLine label="Material Cost" value={summary.materialCost} />
          <SummaryLine label="Cut Cost" value={summary.cutsCost} />
          <SummaryLine label="Subtotal" value={summary.combinedCost} />
          <SummaryLine label="15% Markup" value={summary.markup} />
          <SummaryLine label="Subtotal + Markup" value={summary.pricePlus15Markup} />
          <SummaryLine label="Final Markup" value={summary.finalMarkup} />
          <SummaryLine
            label="Total"
            value={summary.finalTotal}
            highlight
          />
        </div>
      </div>
      </div>

      {/* Totals Section */}
      
    </div>
  );
};

const SummaryLine = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) => (
  <div className="flex justify-between border-b pb-1">
    <span className={`text-gray-600 ${highlight ? "font-bold text-base" : ""}`}>{label}</span>
    <span className={highlight ? "text-[#ff5100] font-bold text-base" : "text-gray-800"}>
      ${value.toFixed(2)}
    </span>
  </div>
);
