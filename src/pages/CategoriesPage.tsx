import { Button } from '@/components/atoms/button';
import { Plus } from 'lucide-react';
import { CategoriesTable } from '@/components/organisms/categories/CategoriesTable';

export function CategoriesPage() {
  return (
    <div className="container mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <Button onClick={() => window.dispatchEvent(new CustomEvent('open-category-drawer'))}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      <div className="">
        <CategoriesTable />
      </div>
    </div>
  );
}