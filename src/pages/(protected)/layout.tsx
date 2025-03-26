import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar"
import AppSidebar from "@/widgets/app-sidebar"
import { Outlet } from "react-router"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <Outlet/>
      </main>
    </SidebarProvider>   
  )
}
