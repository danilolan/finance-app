import { useEffect } from "react";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import { DataTable } from "@/components/organisms/data-table/data-table";
import { Money } from "@/components/atoms/money";
import { useTransactionStore } from "@/lib/store/transaction.store";
import { useCategoryStore } from "@/lib/store/category.store";

export function TransactionTable() {
  const { 
    transactions,
    deleteTransaction, 
    setSelectedTransaction,
    fetchTransactions,
    error,
    clearError
  } = useTransactionStore();
  
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [fetchTransactions, fetchCategories]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      toast.success("Transaction deleted successfully");
    } catch (error) {
      // Error is already handled by the store
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Uncategorized';
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || '#6b7280';
  };

  const columns = [
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }: any) => (
        <div className="font-medium">{row.getValue("description")}</div>
      ),
    },
    {
      header: "Category",
      accessorKey: "categoryId",
      cell: ({ row }: any) => {
        const categoryId = row.getValue("categoryId");
        const categoryName = getCategoryName(categoryId);
        const categoryColor = getCategoryColor(categoryId);
        
        return (
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
            <span>{categoryName}</span>
          </div>
        );
      },
    },
    {
      header: "Payment",
      accessorKey: "payment",
      cell: ({ row }: any) => (
        row.getValue("payment") == 0 ?  <div className="text-gray-500">---</div>
          :
          <Money 
            value={row.getValue("payment")} 
            className="text-red-600 font-medium" 
        />
      ),
    },
    {
      header: "Deposit",
      accessorKey: "deposit",
      cell: ({ row }: any) => (
        row.getValue("deposit") == 0 ?  <div className="text-gray-500">---</div>
          :
          <Money 
            value={row.getValue("deposit")} 
            className="text-green-600 font-medium" 
        />
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: any) => (
        <div className="text-sm text-muted-foreground">
          {new Date(row.getValue("date")).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }: any) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedTransaction(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={transactions}
    />
  );
}