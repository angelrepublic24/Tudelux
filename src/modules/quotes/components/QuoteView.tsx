"use client";
import { CostSummary, MaterialQuote } from "@/shared/types";
import Image from "next/image";
import { QuoteHeader } from "./QuoteHeader";
import { CreateQuotePayload, QuoteToSendPayload } from "../schema/quote.schema";
import { formatCurrency } from "@/shared/utils/formatCurency";

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

export const QuoteView = ({
  materials,
  summary,
  customerInfo,
  quoteNumber,
  quoteDate,
}: Props) => {
  console.log(materials);
  return (
    <div className=" text-black font-sans text-sm">
      {/* Header */}
      <QuoteHeader
        customerInfo={customerInfo}
        quoteDate={quoteDate}
        quoteNumber={quoteNumber}
      />

      {/* Product Table */}
      <div className="bg-white w">
        <div className=" overflow-hidden mb-2 max-w-5xl mx-auto p-10">
          <table className="min-w-full text-sm">
            <thead className="text-white text-left border-b border-b-gray-200">
              <tr>
                <th className="px-3 py-5 text-[#ff5100] text-lg">Product</th>
                {/* <th className="px-3 py-5 text-[#ff5100] text-lg">Color</th>
              <th className="px-3 py-5 text-[#ff5100] text-lg">Size</th> */}
                <th className="px-3 py-5 text-[#ff5100] text-lg">Qty</th>
                <th className="px-3 py-5 text-[#ff5100] text-lg text-right">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-5 text-lg">
                    <h4>
                      {item.product} - {item.product_type}
                    </h4>
                    <div className="flex flex-col italic text-sm">
                      {item.product === "Architectural Canopy" && (
                        <>
                          <small>
                            Front Width: {item.dimensions?.frontWidth}"
                          </small>
                          <small>
                            Back Width: {item.dimensions?.backWidth}"
                          </small>
                          <small>
                            Middle Width: {item.dimensions?.middleWidth}"
                          </small>
                          <small>
                            Left Projection: {item.dimensions?.leftProjection}"
                          </small>
                          <small>
                            Right Projection: {item.dimensions?.rightProjection}
                            "
                          </small>
                          <small>
                            Middle Projection:{" "}
                            {item.dimensions?.middleProjection}"
                          </small>
                        </>
                      )}
                      {item.product === "Partition Walls" && (
                        <>
                          <span className="text-gray-600">
                            {item.dimensions?.width} x {item.dimensions?.height}
                          </span>
                        </>
                      )}
                      <span className="text-gray-600">{item.color}</span>
                    </div>
                  </td>
                  <td className="px-3 py-5">{item.quantity}</td>
                  <td className="px-3 py-5 text-right font-semibold">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end max-w-5xl mx-auto">
          <div className="w-full sm:w-1/2 md:w-1/3text-sm space-y-2">
            {/* <SummaryLine label="Material Cost" value={summary.materialCost} />
          <SummaryLine label="Cut Cost" value={summary.cutsCost} />
          <SummaryLine label="Subtotal" value={summary.combinedCost} />
          <SummaryLine label="15% Markup" value={summary.markup} />
          <SummaryLine label="Subtotal + Markup" value={summary.pricePlus15Markup} />
          <SummaryLine label="Final Markup" value={summary.finalMarkup} /> */}
            <SummaryLine label="Total" value={summary.finalTotal} highlight />
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
  <div className="flex justify-between border-b py-5">
    <span className={`text-gray-600 ${highlight ? "font-bold text-base" : ""}`}>
      {label}
    </span>
    <span
      className={
        highlight ? "text-[#ff5100] font-bold text-base" : "text-gray-800"
      }
    >
      {formatCurrency(value)}
    </span>
  </div>
);
