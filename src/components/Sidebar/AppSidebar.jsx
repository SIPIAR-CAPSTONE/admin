import * as React from "react";
import {
  Map,
  LayoutDashboard,
  BadgeCheck,
  FileClock,
  Users,
  Ambulance,
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
import { useAuth } from "@/context/AuthProvider";

const data = {
  adminUser: {
    name: "admin",
    email: "sipiaradmin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  verifierUser: {
    name: "verifier",
    email: "sipiarverifier@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  adminNav: [
    {
      name: "Dashboard",
      url: "dashboard",
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
  ],
  verifierNav: [
    {
      name: "Verification Request",
      url: "verification-request",
      icon: BadgeCheck,
    },
    {
      name: "Bystanders",
      url: "bystanders",
      icon: Users,
    },
    {
      name: "Responders",
      url: "responders",
      icon: Ambulance,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { state } = useSidebar();
  const { role } = useAuth();
  const sidebarNav = role === "admin" ? data.adminNav : data.verifierNav;
  const user = role === "admin" ? data.adminUser : data.verifierUser;

  return (
    <Sidebar collapsible="icon" className="pt-2 bg-sidebar" {...props}>
      <SidebarHeader>
        <AppLogo logoOnly={state === "collapsed"} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain navLinks={sidebarNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
