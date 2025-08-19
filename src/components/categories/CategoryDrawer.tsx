"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Category } from "@/lib/store/categories"

interface CategoryDrawerProps {
  category?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (name: string) => void
  onAdd?: (name: string) => void
}

export function CategoryDrawer({ category, open, onOpenChange, onSave, onAdd }: CategoryDrawerProps) {
  const [name, setName] = React.useState(category?.name ?? "")

  React.useEffect(() => {
    if (category) {
      setName(category.name)
    }
  }, [category])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!name.trim()) return

    if (category) {
      onSave?.(name)
      onOpenChange(false)
    } else if (onAdd) {
      onAdd(name)
      setName("") // Only clear when adding
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{category ? "Edit Category" : "New Category"}</DrawerTitle>
            <DrawerDescription>
              {category 
                ? "Make changes to your category here." 
                : "Create a new category here."
              }
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button
              type="submit"
              disabled={!name.trim()}
            >
              Save
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}