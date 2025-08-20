import { useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import { CategoryDrawer } from "@/components/organisms/categories/CategoryDrawer";
import { CategoriesTable } from "@/components/organisms/categories/CategoriesTable";
import { useCategoryStore } from "@/lib/store/category.store";

export function CategoriesPage() {
  const { fetchCategories, error, clearError, setSelectedCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <div className="container py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={() => setSelectedCategory({} as any)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>
      <CategoriesTable />
      <CategoryDrawer />
    </div>
  );
}