import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table/data-table"
import { createActionColumn } from "@/components/ui/data-table/action-column"
import { useCategoryStore } from "@/lib/store/categories"
import type { Category } from "@/lib/store/categories"
import { CategoryDrawer } from "./CategoryDrawer"

export function CategoryTable() {
  const { items, update, add, remove } = useCategoryStore()
  const [open, setOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<Category | undefined>()

  React.useEffect(() => {
    const handleOpenDrawer = () => {
      setSelectedCategory(undefined)
      setOpen(true)
    }
    
    window.addEventListener('open-category-drawer', handleOpenDrawer)
    return () => window.removeEventListener('open-category-drawer', handleOpenDrawer)
  }, [])

  const handleAdd = (name: string) => {
    toast.promise(
      () => {
        add({ name })
        return Promise.resolve()
      },
      {
        loading: 'Creating category...',
        success: 'Category created successfully',
        error: 'Failed to create category',
      }
    )
  }

  const handleUpdate = (name: string) => {
    if (selectedCategory) {
      toast.promise(
        () => {
          update(selectedCategory.id, { name })
          return Promise.resolve()
        },
        {
          loading: 'Updating category...',
          success: 'Category updated successfully',
          error: 'Failed to update category',
        }
      )
    }
  }

  const columns: ColumnDef<Category>[] = [
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    createActionColumn({
      onEdit: (category) => {
        setSelectedCategory(category)
        setOpen(true)
      },
      onDelete: (category) => remove(category.id),
    }),
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={items}
        filterColumn="name"
        defaultVisibility={{
          createdAt: false,
        }}
      />
      <CategoryDrawer
        category={selectedCategory}
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (!isOpen) {
            setSelectedCategory(undefined)
          }
        }}
        onSave={handleUpdate}
        onAdd={handleAdd}
      />
    </>
  )
}
