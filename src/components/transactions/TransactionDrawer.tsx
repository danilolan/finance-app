import { FormDrawer } from "@/components/ui/form-drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategoryStore } from "@/lib/store/entities/categories"
import { EmptyState } from "@/components/ui/empty-state"
import type { Transaction } from "@/lib/store/entities/transactions"

interface TransactionDrawerProps {
  transaction?: Transaction
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: Partial<Transaction>) => void
  onAdd?: (data: Partial<Transaction>) => void
}

export function TransactionDrawer({ 
  transaction, 
  open, 
  onOpenChange, 
  onSave, 
  onAdd 
}: TransactionDrawerProps) {
  const { items: categories } = useCategoryStore()

  const handleSubmit = (formData: any) => {
    const data: Partial<Transaction> = {
      name: formData.name,
      date: formData.date,
      category: formData.category === "uncategorized" ? null : formData.category,
      price: parseFloat(formData.price),
      installment: formData.installmentTotal ? {
        current: parseInt(formData.installmentCurrent),
        total: parseInt(formData.installmentTotal)
      } : null
    }

    if (transaction && onSave) {
      onSave(data)
    } else if (onAdd) {
      onAdd(data)
    }
  }

  return (
    <FormDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Transaction"
      description="Add your financial transactions here."
      isEditing={!!transaction}
      onSave={handleSubmit}
      onAdd={handleSubmit}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Description</Label>
          <Input
            id="name"
            name="name"
            placeholder="Transaction description"
            defaultValue={transaction?.name}
            autoComplete="off"
          />
        </div>

        <DatePicker
          label="Date"
          date={transaction?.date ? new Date(transaction.date) : undefined}
          onDateChange={(date) => {
            const formElement = document.querySelector('form');
            if (formElement) {
              const dateInput = document.createElement('input');
              dateInput.type = 'hidden';
              dateInput.name = 'date';
              dateInput.value = date ? date.toISOString() : '';
              formElement.appendChild(dateInput);
            }
          }}
        />

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={transaction?.category || "uncategorized"}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uncategorized"><EmptyState type="uncategorized" /></SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            defaultValue={transaction?.price}
          />
        </div>

        <div className="grid gap-2">
          <Label>Installments (Optional)</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                name="installmentCurrent"
                type="number"
                placeholder="Current"
                defaultValue={transaction?.installment?.current}
                min={1}
              />
            </div>
            <div className="flex items-center">of</div>
            <div className="flex-1">
              <Input
                name="installmentTotal"
                type="number"
                placeholder="Total"
                defaultValue={transaction?.installment?.total}
                min={1}
              />
            </div>
          </div>
        </div>
      </div>
    </FormDrawer>
  )
}
