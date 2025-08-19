import { Bug } from 'lucide-react';
import { useState } from 'react';
import { SidebarMenuButton } from '@/components/atoms/sidebar';
import { DebugDrawer } from './DebugDrawer';

export function DebugButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SidebarMenuButton
        onClick={() => setOpen(true)}
        tooltip="Debug Panel"
        className="bg-red-400 dark:bg-red-500 text-white hover:text-white font-medium hover:bg-red-400/90 dark:hover:bg-red-500/90 hover:cursor-pointer"
      >
        <Bug className="h-4 w-4" />
        <span>Debug</span>
      </SidebarMenuButton>
      <DebugDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
