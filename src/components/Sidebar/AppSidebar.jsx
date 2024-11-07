import * as React from "react";
import {
  Map,
  LayoutDashboard,
  BadgeCheck,
  FileClock,
  Users,
  Bug,
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
import AppLogo from "@/components/Sidebar/AppLogo";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Broadcast",
      url: "broadcast",
      icon: Map,
    },
    {
      name: "Incident History",
      url: "incidents",
      icon: FileClock,
    },
    {
      name: "Users",
      url: "users",
      icon: Users,
    },
    {
      name: "Verification Request",
      url: "verification-request",
      icon: BadgeCheck,
    },
    {
      name: "Bug Report",
      url: "bug-report",
      icon: Bug,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="pt-2 bg-sidebar" {...props}>
      <SidebarHeader>
        <AppLogo logoOnly={state === "collapsed"} />
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
