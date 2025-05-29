'use client';

import { CostSummary, MaterialItemTable } from '@/types';
import Image from 'next/image';

interface Props {
  materials: MaterialItemTable[];
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

  const formattedMaterials = materials.map((item) => ({
  material: item.name,
  color: item.color,
  size: item.inches,
  qty: item.quantity,
  price: item.total,
}));
  console.log(materials);
  return (
    <div className="max-w-5xl mx-auto bg-[#f2f2f2] p-10 text-black">
      <div className="flex justify-between items-start mb-10">
        {/* LOGO Y CLIENTE */}
        <div>
          <Image src="/Tudelu.png" alt="Tudelu Logo" width={120} height={60} />
        </div>

        {/* EMPRESA */}
        <div className="text-right text-sm">
          <p className="text-[#ff5100] font-bold">Tudelu Holdings LLC</p>
          <p>100 Industrial Avenue</p>
          <p>Little Ferry, NJ 07643</p>
          <p>718.782.7882</p>
          <p>info@tudelu.com</p>
        </div>
      </div>

      <div className="flex justify-between items-start mb-6">
        {/* INFORMACIÓN CLIENTE */}
        <div className="text-sm leading-relaxed">
          <p className="text-[#ff5100] font-bold text-base">{customerInfo.name} {customerInfo.lName}</p>
          <p>{customerInfo.email}</p>
          <p>{customerInfo.phone}</p>
          <p>{customerInfo.address}</p>
        </div>

        {/* COTIZACIÓN */}
        <div className="text-right">
          <p className="text-2xl font-bold text-[#ff5100]">Quote</p>
          <p className="text-sm mb-2">And Purchase Agreement</p>
          <p><strong>Quote No.</strong><br />{quoteNumber}</p>
          <p className="mt-2"><strong>Quote Date</strong><br />{quoteDate}</p>
        </div>
      </div>

      {/* TABLA DE DESGLOSE */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white border border-gray-200">
  <table className="min-w-full divide-y divide-gray-200 text-sm">
    <thead className="bg-[#ff5100] text-white uppercase tracking-wider text-xs">
      <tr>
        <th className="px-6 py-3 text-left">Material</th>
        <th className="px-6 py-3 text-left">Color</th>
        <th className="px-6 py-3 text-left">Size</th>
        <th className="px-6 py-3 text-left">Qty</th>
        <th className="px-6 py-3 text-left">Price</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {formattedMaterials.map((item, i) => (
        <tr
          key={i}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          <td className="px-6 py-4 font-medium text-gray-800">{item.material}</td>
          <td className="px-6 py-4 text-gray-600">{item.color}</td>
          <td className="px-6 py-4 text-gray-600">{item.size} in</td>
          <td className="px-6 py-4 text-gray-600">{item.qty}</td>
          <td className="px-6 py-4 font-semibold text-gray-900">
            ${typeof item.price === 'number' ? item.price : '0.00'}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* TOTALES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-sm">
        <SummaryCard label="Material Cost" value={summary.materialCost} />
        <SummaryCard label="Cut Cost" value={summary.cutsCost} />
        <SummaryCard label="Subtotal" value={summary.combinedCost} />
        <SummaryCard label="15% Markup" value={summary.markup} />
        <SummaryCard label="Subtotal + Markup" value={summary.pricePlus15Markup} />
        <SummaryCard label="Final Markup" value={summary.finalMarkup} />
        <SummaryCard label="Total" value={summary.finalTotal} highlight />
      </div>
    </div>
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
}) => (
  <div className="border rounded-md p-4 text-center bg-white shadow-sm">
    <p className="text-gray-500">{label}</p>
    <p className={`font-bold ${highlight ? 'text-[#ff5100] text-xl' : 'text-gray-800'}`}>
      ${value.toFixed(2)}
    </p>
  </div>
);
