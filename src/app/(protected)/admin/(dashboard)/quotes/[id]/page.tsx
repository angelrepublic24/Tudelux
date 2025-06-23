'use client';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { QuoteView } from '@/modules/quotes/components/QuoteView';
import { Spinner } from '@/shared/components/ui/Spinner/Spinner';
import { useGetQuoteById } from '@/modules/quotes/services/quote.service';

export default function QuoteDetailPage() {
  const params = useParams();
  const id = params?.id;

  const { data, isLoading, isError } = useGetQuoteById(Number(id))
  console.log(data);
  if (isLoading) return <Spinner />;
  if (isError || !data) {
    toast.error('Failed to load quote');
    return <p className="text-center text-red-500">Error loading quote.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <QuoteView
        materials={data}
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
