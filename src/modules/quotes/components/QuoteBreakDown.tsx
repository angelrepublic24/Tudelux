"use client";
import { CostSummary, MaterialQuote } from "@/shared/types";
import { QuoteHeader } from "./QuoteHeader";
import { formatCurrency } from "@/shared/utils/formatCurency";
import { CreateQuotePayload, QuoteToSendPayload } from "../schema/quote.schema";

interface Props {
  materials: QuoteToSendPayload;
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
 const product = materials.items.find((m) => m.product === "Architectural Canopy");
 const materialPlusCuts = product.cutCost + product.materialCost
 const markup15 = materialPlusCuts * 0.15
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
            {product.materials.map((item, i) => (
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
          <SummaryLine label="Material Cost" value={product.materialCost} />
          <SummaryLine label="Cut Cost" value={product.cutCost} />
          <SummaryLine label="Subtotal" value={materialPlusCuts} />
          <SummaryLine label="15% Markup" value={markup15} />
          <SummaryLine label="Subtotal + Markup" value={product.subtotal} />
          <SummaryLine label="Final Markup" value={product.markup} />
          <SummaryLine
            label="Total"
            value={product.total}
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
      {formatCurrency(value)}
    </span>
  </div>
);
