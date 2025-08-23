import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/atoms/button';
import { TransactionDrawer } from '@/components/organisms/transactions/TransactionDrawer';
import { TransactionTable } from '@/components/organisms/transactions/TransactionTable';
import { useTransactionStore } from '@/lib/store/transaction.store';

export function TransactionsPage() {
  const { error, clearError, setSelectedTransaction } = useTransactionStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <div className="container mx-auto flex h-[calc(100vh-theme(spacing.16))] max-w-7xl flex-col gap-4 overflow-hidden p-6">
      <div className="flex shrink-0 items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setSelectedTransaction({} as any)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <TransactionTable />
      </div>
      <TransactionDrawer />
    </div>
  );
}