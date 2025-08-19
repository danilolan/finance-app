import { FormDrawer } from "@/components/molecules/form-drawer"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import type { Category } from "@/lib/store/entities/categories"

interface CategoryDrawerProps {
  category?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (name: string) => void
  onAdd?: (name: string) => void
}

export function CategoryDrawer({ 
  category, 
  open, 
  onOpenChange, 
  onSave, 
  onAdd 
}: CategoryDrawerProps) {
  const handleSubmit = (data: any) => {
    if (category && onSave) {
      onSave(data.name)
    } else if (onAdd) {
      onAdd(data.name)
    }
  }

  return (
    <FormDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Category"
      description="Categories help you organize your transactions."
      isEditing={!!category}
      onSave={handleSubmit}
      onAdd={handleSubmit}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Category name"
            defaultValue={category?.name}
            autoComplete="off"
          />
        </div>
      </div>
    </FormDrawer>
  )
}