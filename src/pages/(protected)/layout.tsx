import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar"
import { AppSidebar } from '@/widgets/app-sidebar'
import ExplorePage from './explore/page'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <ExplorePage/>
      </main>
    </SidebarProvider>
  )
}
