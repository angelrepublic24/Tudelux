'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useFindSales } from '@/modules/sales/services/sales.service';
import { useAssignQuote } from '../services/quote.service';

interface AssignQuoteModalProps {
  open: boolean;
  onClose: () => void;
  quoteId: number;
  assignedTo?: {
    id: string;
    name: string;
    lName: string;
    email: string;
  } | null;
  onAssigned?: () => void;
}

export const AssignQuoteModal = ({
  open,
  onClose,
  quoteId,
  assignedTo,
  onAssigned,
}: AssignQuoteModalProps) => {
  const [selectedSalesId, setSelectedSalesId] = useState('');
  const { data: salesData, isLoading: loadingSales } = useFindSales(50, 1);
  const { mutate, isPending } = useAssignQuote();

  useEffect(() => {
    if (assignedTo?.id) {
      setSelectedSalesId(assignedTo.id);
    }
  }, [assignedTo]);

  const handleAssign = () => {
    if (!selectedSalesId) return;
    mutate(
      { quoteId, userId: Number(selectedSalesId) },
      {
        onSuccess: () => {
          onClose();
          onAssigned?.();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Quote to Sales</DialogTitle>
        </DialogHeader>

        {assignedTo && (
          <p className="text-sm text-muted-foreground mb-2">
            Currently assigned to:{' '}
            <strong>
              {assignedTo.name} {assignedTo.lName}
            </strong>{' '}
            - {assignedTo.email}
          </p>
        )}

        <Select value={selectedSalesId} onValueChange={setSelectedSalesId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a sales user" />
          </SelectTrigger>
          <SelectContent>
            {loadingSales ? (
              <div className="p-2 text-sm text-gray-500">Loading...</div>
            ) : (
              salesData?.data?.map((sales: any) => (
                <SelectItem key={sales.id} value={sales.id}>
                  {sales.name} {sales.lName} - {sales.email}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        <DialogFooter className="mt-4">
          <Button onClick={handleAssign} disabled={!selectedSalesId || isPending}>
            {isPending ? 'Assigning...' : 'Assign'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
