import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import { DataTable } from "@/components/organisms/data-table/data-table";
import { useCategoryStore } from "@/lib/store/category.store";

export function CategoriesTable() {
  const { categories, isLoading, deleteCategory, setSelectedCategory } = useCategoryStore();

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
    } catch (error) {
      // Error is already handled by the store
    }
  };

  const columns = [
    {
      header: "Color",
      accessorKey: "color",
      cell: ({ row }: any) => (
        <div className="w-[30px]">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: row.original.color }}
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: any) => (
        <div className="">{row.getValue("name")}</div>
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
            onClick={() => setSelectedCategory(row.original)}
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
      data={categories}
    />
  );
}