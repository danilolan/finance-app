import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table/data-table"
import { createActionColumn } from "@/components/ui/data-table/action-column"
import { useTransactionStore } from "@/lib/store/transactions"
import { useCategoryStore } from "@/lib/store/categories"
import type { Transaction } from "@/lib/store/transactions"
import { TransactionDrawer } from "./TransactionDrawer"

export function TransactionTable() {
  const { items, update, add, remove } = useTransactionStore()
  const { items: categories } = useCategoryStore()
  const [open, setOpen] = React.useState(false)
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | undefined>()

  React.useEffect(() => {
    const handleOpenDrawer = () => {
      setSelectedTransaction(undefined)
      setOpen(true)
    }
    
    window.addEventListener('open-transaction-drawer', handleOpenDrawer)
    return () => window.removeEventListener('open-transaction-drawer', handleOpenDrawer)
  }, [])

  const handleAdd = (data: Partial<Transaction>) => {
    toast.promise(
      () => {
        add(data as Transaction)
        return Promise.resolve()
      },
      {
        loading: 'Creating transaction...',
        success: 'Transaction created successfully',
        error: 'Failed to create transaction',
      }
    )
  }

  const handleUpdate = (data: Partial<Transaction>) => {
    if (selectedTransaction) {
      toast.promise(
        () => {
          update(selectedTransaction.id, data)
          return Promise.resolve()
        },
        {
          loading: 'Updating transaction...',
          success: 'Transaction updated successfully',
          error: 'Failed to update transaction',
        }
      )
    }
  }

  const columns: ColumnDef<Transaction>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const categoryId = row.getValue("category") as string
        const category = categories.find(c => c.id === categoryId)
        return <div>{category?.name}</div>
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = row.getValue("price") as number
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "installment",
      header: "Installment",
      cell: ({ row }) => {
        const installment = row.getValue("installment") as Transaction["installment"]
        if (!installment) return null
        return (
          <div className="text-center text-muted-foreground">
            {installment.current}/{installment.total}
          </div>
        )
      },
    },
    createActionColumn({
      onEdit: (transaction) => {
        setSelectedTransaction(transaction)
        setOpen(true)
      },
      onDelete: (transaction) => remove(transaction.id),
    }),
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={items}
        filterColumn="name"
        defaultVisibility={{
          installment: false,
        }}
      />
      <TransactionDrawer
        transaction={selectedTransaction}
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (!isOpen) {
            setSelectedTransaction(undefined)
          }
        }}
        onSave={handleUpdate}
        onAdd={handleAdd}
      />
    </>
  )
}
