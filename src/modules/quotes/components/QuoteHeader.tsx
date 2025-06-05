// components/quote/QuoteHeader.tsx
import Image from "next/image";

interface QuoteHeaderProps {
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

export const QuoteHeader = ({ customerInfo, quoteNumber, quoteDate }: QuoteHeaderProps) => {
  return (
    <div className="mx-auto max-w-5xl p-10">
      <div className="flex justify-between items-start mb-10">
        <Image src="/Tudelu.png" alt="Tudelu Logo" width={120} height={60} />
        <div className="text-right text-sm">
          <p className="text-[#ff5100] font-bold">Tudelu Holdings LLC</p>
          <p>100 Industrial Avenue</p>
          <p>Little Ferry, NJ 07643</p>
          <p>718.782.7882</p>
          <p>info@tudelu.com</p>
        </div>
      </div>

      <div className="flex justify-between mb-10">
        <div>
          <p className="font-bold text-[#ff5100]">
            {customerInfo.name} {customerInfo.lName}
          </p>
          <p>{customerInfo.email}</p>
          <p>{customerInfo.phone}</p>
          <p>{customerInfo.address}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#ff5100]">Quote</p>
          <p className="text-sm mb-2">And Purchase Agreement</p>
          <p>
            <strong>Quote No:</strong> {quoteNumber}
          </p>
          <p>
            <strong>Date:</strong> {quoteDate}
          </p>
        </div>
      </div>
    </div>
  );
};
