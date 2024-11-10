import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-white dark:bg-neutral-900">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
