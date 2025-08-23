import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";
import { FormDrawer } from "@/components/molecules/form-drawer";
import { DatePicker } from "@/components/molecules/date-picker";
import type { CreateTransactionDto } from "@/lib/api/dtos/transaction.dto";
import { useTransactionStore } from "@/lib/store/transaction.store";
import { useCategoryStore } from "@/lib/store/category.store";

export function TransactionDrawer() {
  const { selectedTransaction, createTransaction, updateTransaction, setSelectedTransaction } = useTransactionStore();
  const { categories } = useCategoryStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const isEditMode = !!selectedTransaction?.id;
  const isOpen = selectedTransaction !== null;

  useEffect(() => {
    if (selectedTransaction?.date) {
      setSelectedDate(new Date(selectedTransaction.date));
    } else {
      setSelectedDate(undefined);
    }
  }, [selectedTransaction]);

  const handleSave = async (formData: FormData) => {
    const data: CreateTransactionDto = {
      description: formData.get("description") as string,
      payment: parseFloat(formData.get("payment") as string) || 0,
      deposit: parseFloat(formData.get("deposit") as string) || 0,
      date: selectedDate?.toISOString() || new Date().toISOString(),
      categoryId: formData.get("categoryId") as string,
    };

    try {
      if (isEditMode && selectedTransaction?.id) {
        await updateTransaction(selectedTransaction.id, data);
        toast.success("Transaction updated successfully");
      }
      setSelectedTransaction(null);
    } catch (error) {
      // Error is already handled by the store
    }
  };

  const handleAdd = async (formData: FormData) => {
    const data: CreateTransactionDto = {
      description: formData.get("description") as string,
      payment: parseFloat(formData.get("payment") as string) || 0,
      deposit: parseFloat(formData.get("deposit") as string) || 0,
      date: selectedDate?.toISOString() || new Date().toISOString(),
      categoryId: formData.get("categoryId") as string,
    };

    try {
      await createTransaction(data);
      toast.success("Transaction created successfully");
      setSelectedTransaction(null);
    } catch (error) {
      // Error is already handled by the store
    }
  };

  return (
    <FormDrawer
      open={isOpen}
      onOpenChange={(open) => !open && setSelectedTransaction(null)}
      title="Transaction"
      description="Add your financial transactions here."
      isEditing={isEditMode}
      onSave={handleSave}
      onAdd={handleAdd}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="Enter transaction description"
            defaultValue={selectedTransaction?.description}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="categoryId">Category</Label>
          <Select name="categoryId" defaultValue={selectedTransaction?.categoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="payment">Payment</Label>
            <Input
              id="payment"
              name="payment"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              defaultValue={selectedTransaction?.payment}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="deposit">Deposit</Label>
            <Input
              id="deposit"
              name="deposit"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              defaultValue={selectedTransaction?.deposit}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <DatePicker
            date={selectedDate}
            onDateChange={setSelectedDate}
            label="Date"
          />
        </div>
      </div>
    </FormDrawer>
  );
}
