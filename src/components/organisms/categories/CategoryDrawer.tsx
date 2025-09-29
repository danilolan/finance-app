import { toast } from "sonner";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";
import { FormDrawer } from "@/components/molecules/form-drawer";
import type { CreateCategoryDto } from "@/lib/api/dtos/category.dto";
import { colors } from "@/lib/constants/colors";
import { useCategoryStore } from "@/lib/store/category.store";

export function CategoryDrawer() {
  const { selectedCategory, createCategory, updateCategory, setSelectedCategory } = useCategoryStore();

  const isEditMode = !!selectedCategory?.id;
  const isOpen = selectedCategory !== null;

  const handleSave = async (formData: FormData) => {
    const data: CreateCategoryDto = {
      name: formData.get("name") as string,
      color: formData.get("color") as string,
    };

    try {
      if (isEditMode && selectedCategory?.id) {
        await updateCategory(selectedCategory.id, data);
        toast.success("Category updated successfully");
      }
      setSelectedCategory(null);
    } catch (error) {
      // Error is already handled by the store
    }
  };

  const handleAdd = async (formData: FormData) => {
    const data: CreateCategoryDto = {
      name: formData.get("name") as string,
      color: formData.get("color") as string,
    };

    try {
      await createCategory(data);
      toast.success("Category created successfully");
      setSelectedCategory(null);
    } catch (error) {
      // Error is already handled by the store
    }
  };

  return (
    <FormDrawer
      open={isOpen}
      onOpenChange={(open) => !open && setSelectedCategory(null)}
      title="Category"
      description="Manage your transaction categories"
      isEditing={isEditMode}
      onSave={handleSave}
      onAdd={handleAdd}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={isEditMode ? selectedCategory?.name : ""}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="color">Color</Label>
          <Select 
            name="color" 
            defaultValue={isEditMode ? selectedCategory?.color : colors[0].value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem
                  key={color.id}
                  value={color.value}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </FormDrawer>
  );
}