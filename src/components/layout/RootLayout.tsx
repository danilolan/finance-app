import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Toaster } from "@/components/ui/sonner"

export function RootLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-muted p-4">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  )
}