import { Bug, Database } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/molecules/sheet";
import { Separator } from "@/components/atoms/separator";
import { DebugGroup } from "./DebugGroup";

interface DebugDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DebugDrawer({ open, onOpenChange }: DebugDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Debug Panel
          </SheetTitle>
          <SheetDescription>
            Development tools to help with debugging and testing.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-4">
          <DebugGroup title="Data">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-muted-foreground">
                API-based data management is now active.
              </p>
            </div>
          </DebugGroup>
        </div>
      </SheetContent>
    </Sheet>
  );
}
