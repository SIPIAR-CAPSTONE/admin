import { NavLink } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ navLinks }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarMenu>
        {navLinks.map((item) => (
          <SidebarMenuItem key={item.name}>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                isActive
                  ? "text-primary-500 block dark:text-primary-400 bg-neutral-100 dark:bg-neutral-700  rounded-md"
                  : "block text-black dark:text-white focus:ring-black"
              }
            >
              <SidebarMenuButton
                className="hover:text-none focus-visible:ring-0 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                tabindex="-1"
              >
                <item.icon />
                <span className="select-none">{item.name}</span>
              </SidebarMenuButton>
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
