import * as React from "react"
import { Button } from "@/components/atoms/button"
import {
  Sheet as Drawer,
  SheetClose as DrawerClose,
  SheetContent as DrawerContent,
  SheetDescription as DrawerDescription,
  SheetFooter as DrawerFooter,
  SheetHeader as DrawerHeader,
  SheetTitle as DrawerTitle,
} from "@/components/molecules/sheet"

interface FormDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  isEditing?: boolean
  onSave: (data: FormData) => void
  onAdd?: (data: FormData) => void
  children: React.ReactNode
}

export function FormDrawer({
  open,
  onOpenChange,
  title,
  description,
  isEditing,
  onSave,
  onAdd,
  children,
}: FormDrawerProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    if (isEditing) {
      onSave(formData)
      onOpenChange(false)
    } else if (onAdd) {
      onAdd(formData)
      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
      // Focus the first input
      const firstInput = form.querySelector('input, textarea, select') as HTMLElement
      firstInput?.focus()
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{isEditing ? `Edit ${title}` : `New ${title}`}</DrawerTitle>
            <DrawerDescription>
              {isEditing 
                ? `Make changes to your ${title.toLowerCase()} here.`
                : `Create a new ${title.toLowerCase()} here.`
              }
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {children}
          </div>
          <DrawerFooter>
            <Button type="submit">
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
