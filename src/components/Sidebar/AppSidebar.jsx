import * as React from "react";
import {
  Map,
  LayoutDashboard,
  BadgeCheck,
  UserCheck,
  FileClock,
} from "lucide-react";

import { NavMain } from "@/components/Sidebar/NavMain";
import { NavUser } from "@/components/Sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      name: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      name: "Verification Request",
      url: "#",
      icon: BadgeCheck,
    },
    {
      name: "Verified Users",
      url: "#",
      icon: UserCheck,
    },
    {
      name: "Incident History",
      url: "#",
      icon: FileClock,
    },
    {
      name: "Broadcast",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1 className="text-red-500 ">{open ? "Temp " : ""}Logo</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain navLinks={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
