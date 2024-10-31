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
      name: "Verification Request",
      url: "verification-request",
      icon: BadgeCheck,
    },
    {
      name: "Verified Users",
      url: "verified-user",
      icon: UserCheck,
    },
    {
      name: "Incident History",
      url: "incident",
      icon: FileClock,
    },
    {
      name: "Broadcast",
      url: "broadcast",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="py-2" {...props}>
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
