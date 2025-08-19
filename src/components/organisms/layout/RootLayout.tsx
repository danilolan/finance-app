import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/atoms/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Toaster } from "@/components/atoms/sonner"

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