// "use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavItems } from "./NavItems";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Optional Logo / Team Switcher goes here */}
      </SidebarHeader>
      <SidebarContent>
        {/* Passing the navigation data items here */}
        <NavItems />
      </SidebarContent>
      <SidebarFooter>{/* Optional User Avatar Menu goes here */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
