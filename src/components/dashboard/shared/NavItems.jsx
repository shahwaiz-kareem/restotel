import Link from "next/link";
import {
  LayoutDashboard,
  BedDouble,
  GalleryVerticalEnd,
  ForkKnifeCrossed,
  User,
  Settings,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { fetchSettings } from "@/utils/fetchers";

export async function NavItems() {
  const { settings } = await fetchSettings();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>ADMIN PANEL</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="mt-4" asChild>
            <Link href="/admin/">
              <LayoutDashboard className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* 4. MENU */}
        {settings?.enableMenu && (
          <SidebarMenuItem>
            <SidebarMenuButton className="mt-4" asChild>
              <Link href="/admin/menu">
                <ForkKnifeCrossed className="h-4 w-4" />
                <span>Menu</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        {/* 2. ROOMS */}
        {settings?.enableRooms && (
          <SidebarMenuItem>
            <SidebarMenuButton className="mt-4" asChild>
              <Link href="/admin/rooms">
                <BedDouble className="h-4 w-4" />
                <span>Rooms</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        {/* 3. GALLERY */}
        {settings?.enableGallery && (
          <SidebarMenuItem>
            <SidebarMenuButton className="mt-4" asChild>
              <Link href="/admin/gallery">
                <GalleryVerticalEnd className="h-4 w-4" />
                <span>Gallery</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        {/* 5. ACCOUNT */}
        <SidebarMenuItem>
          <SidebarMenuButton className="mt-4" asChild>
            <Link href="/admin/account">
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* 6. SETTINGS */}
        <SidebarMenuItem>
          <SidebarMenuButton className="mt-4" asChild>
            <Link href="/admin/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
