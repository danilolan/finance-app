import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Trash } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table/data-table"
import { Money } from "@/components/ui/money"
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
          className="h-3 w-3"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="h-3 w-3"
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
          className="h-6 px-2 text-xs font-medium"
        >
          Description
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => <div className="pl-3 text-xs">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-2 text-xs font-medium"
        >
          Date
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return <div className="pl-3 text-xs">{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-2 text-xs font-medium"
        >
          Category
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const categoryId = row.getValue("category") as string
        const category = categories.find(c => c.id === categoryId)
        return <div className="pl-2 text-xs">{category?.name}</div>
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-2 text-xs font-medium w-[80px] text-right"
        >
          Price
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = row.getValue("price") as number
        return (
          <div className="w-[80px] px-2 text-right">
            <Money value={price} colored={false} className="text-xs font-medium" />
          </div>
        )
      },
    },
    {
      accessorKey: "installment",
      header: "Installment",
      cell: ({ row }) => {
        const installment = row.getValue("installment") as Transaction["installment"]
        if (!installment) return null
        return (
          <div className="text-center text-xs text-muted-foreground">
            {installment.current}/{installment.total}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right text-xs">Actions</div>,
      cell: ({ row }) => {
        const transaction = row.original

        const handleDelete = () => {
          toast.promise(
            () => {
              remove(transaction.id)
              return Promise.resolve()
            },
            {
              loading: 'Deleting transaction...',
              success: 'Transaction deleted successfully',
              error: 'Failed to delete transaction',
            }
          )
        }

        return (
          <div className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => {
                setSelectedTransaction(transaction)
                setOpen(true)
              }}
            >
              <Pencil className="h-3 w-3" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-red-600 hover:text-red-700"
              onClick={handleDelete}
            >
              <Trash className="h-3 w-3" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        )
      },
      enableHiding: false,
    },
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
        pageSize={500}
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