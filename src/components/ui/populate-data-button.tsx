'use client';

import { Button } from './button';
import { populateStores } from '@/lib/store/mock-data';
import { useCategoryStore } from '@/lib/store/categories';
import { useTransactionStore } from '@/lib/store/transactions';
import { toast } from 'sonner';

export function PopulateDataButton() {
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
    >
      Populate Mock Data
    </Button>
  );
}
