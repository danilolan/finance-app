"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Trash } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/atoms/button"
import { Checkbox } from "@/components/atoms/checkbox"
import { DataTable } from "@/components/organisms/data-table/data-table"
import { useCategoryStore } from "@/lib/store/entities/categories"
import type { Category } from "@/lib/store/entities/categories"
import { CategoryDrawer } from "./CategoryDrawer"

export const columns: ColumnDef<Category>[] = [
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
    cell: ({ row }) => <div className="capitalize pl-3">{row.getValue("name")}</div>,
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
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row, table }) => {
      const category = row.original
      const { remove } = useCategoryStore()
      const { setSelectedCategory, setOpen } = table.options.meta as {
        setSelectedCategory: (category: Category) => void
        setOpen: (open: boolean) => void
      }

      const handleDelete = () => {
        toast.promise(
          () => {
            remove(category.id)
            return Promise.resolve()
          },
          {
            loading: 'Deleting category...',
            success: 'Category deleted successfully',
            error: 'Failed to delete category',
          }
        )
      }

      return (
        <div className="text-right">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setSelectedCategory(category)
              setOpen(true)
            }}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-600 hover:text-red-700"
            onClick={handleDelete}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )
    },
  },
]

export function CategoriesTable() {
  const { items, update, add } = useCategoryStore()
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

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={items}
        filterColumn="name"
        defaultVisibility={{
          createdAt: false
        }}
        meta={{
          setSelectedCategory,
          setOpen,
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
    </div>
  )
}