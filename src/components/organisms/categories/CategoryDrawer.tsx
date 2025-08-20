import { FormDrawer } from "@/components/molecules/form-drawer"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import type { Category } from "@/lib/store/entities/categories"
import { colors } from "@/lib/constants/colors"

interface CategoryDrawerProps {
  category?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: { name: string; color: string }) => void
  onAdd?: (data: { name: string; color: string }) => void
}

export function CategoryDrawer({ 
  category, 
  open, 
  onOpenChange, 
  onSave, 
  onAdd 
}: CategoryDrawerProps) {
  const handleSubmit = (formData: FormData) => {
    const data = {
      name: formData.get('name') as string,
      color: formData.get('color') as string || colors[0].id // Fallback to first color if none selected
    };

    if (category && onSave) {
      onSave(data)
    } else if (onAdd) {
      onAdd(data)
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
        <div className="grid gap-2">
          <Label htmlFor="color">Color</Label>
          <Select name="color" defaultValue={category?.color}>
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color.id} value={color.id}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-4 w-4 rounded-full" 
                      style={{ 
                        backgroundColor: color.value,
                        border: `1px solid ${color.value}` 
                      }} 
                    />
                    <span>{color.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </FormDrawer>
  )
}