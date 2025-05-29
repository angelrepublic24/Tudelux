'use client';

import { useQuery } from '@tanstack/react-query';
import { getQuoteById } from '@/api/QuoteApi';
import { toast } from 'react-toastify';
import { QuoteView } from '@/components/quote/QuoteView';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { useParams } from 'next/navigation';

export default function QuoteDetailPage() {
  const params = useParams();
  const id = params?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['quote', id],
    queryFn: () => getQuoteById(Number(id)),
    enabled: !!id,
  });

  console.log(data);

  if (isLoading) return <Spinner />;
  if (isError || !data) {
    toast.error('Failed to load quote');
    return <p className="text-center text-red-500">Error loading quote.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <QuoteView
        materials={data.materials}
        summary={{
          materialCost: data.materialCost,
          cutsCost: data.cutCost,
          markup: data.markup,
          combinedCost: data.materialCost + data.cutCost,
          pricePlus15Markup: data.subtotal,
          finalMarkup: data.markup,
          finalTotal: data.total,
        }}
        customerInfo={{
          name: data.customerName,
          lName: data.customerLastName,
          email: data.customerEmail,
          phone: data.customerPhone,
          address:
            data.address_street + ', ' +
            data.address_city + ', ' +
            data.address_state + ' ' +
            data.address_zip,
        }}
        quoteNumber={`Q-${data.id}`}
        quoteDate={new Date(data.createdAt).toLocaleDateString('en-US')}
      />
    </div>
  );
}
