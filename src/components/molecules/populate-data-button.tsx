'use client';

import { Button } from '@/components/atoms/button';
import { populateStores } from '@/lib/store/mock-data';
import { useCategoryStore } from '@/lib/store/entities/categories';
import { useTransactionStore } from '@/lib/store/entities/transactions';
import { toast } from 'sonner';

interface PopulateDataButtonProps {
  className?: string;
}

export function PopulateDataButton({ className }: PopulateDataButtonProps) {
  const categoryStore = useCategoryStore();
  const transactionStore = useTransactionStore();

  const handlePopulate = async () => {
    try {
      await populateStores(categoryStore, transactionStore);
      toast.success('Mock data populated successfully!');
    } catch (error) {
      console.error('Error populating mock data:', error);
      toast.error('Failed to populate mock data');
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handlePopulate}
      className={className}
    >
      Populate Mock Data
    </Button>
  );
}
