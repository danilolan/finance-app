import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { PopulateDataButton } from '@/components/ui/populate-data-button';

export function TransactionsPage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <div className="flex items-center gap-2">
          <PopulateDataButton />
          <Button onClick={() => window.dispatchEvent(new CustomEvent('open-transaction-drawer'))}>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>
      <div className="rounded-lg bg-card p-4 shadow-sm">
        <TransactionTable />
      </div>
    </div>
  );
}