import { type ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/atoms/button"

interface ActionColumnProps<TData> {
  onEdit: (data: TData) => void
  onDelete: (data: TData) => void
}

export function createActionColumn<TData>({ 
  onEdit, 
  onDelete 
}: ActionColumnProps<TData>): ColumnDef<TData> {
  return {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const data = row.original

      const handleDelete = () => {
        toast.promise(
          () => {
            onDelete(data)
            return Promise.resolve()
          },
          {
            loading: 'Deleting...',
            success: 'Deleted successfully',
            error: 'Failed to delete',
          }
        )
      }

      return (
        <div className="text-right">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(data)}
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
    enableHiding: false,
  }
}
