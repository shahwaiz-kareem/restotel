import { AppSidebar } from "@/components/dashboard/shared/AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Playfair_Display,
} from "next/font/google";

import { cn } from "@/lib/utils";

import "../globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { cloneElement } from "react";
import { fetchSettings } from "@/utils/fetchers";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamically generate metadata

export async function generateMetadata() {
  const { settings } = await fetchSettings();
  try {
    // Construct the title. Fallback to defaults if specific fields are missing.
    const siteTitle = `${settings.brandName} | Admin`;

    return {
      title: siteTitle,
      description:
        "Admin dashboard for managing your site settings and content.",
      icons: {
        icon: settings?.faviconUrl || "/favicon.ico", // Dynamic favicon
      },
    };
  } catch (error) {
    // Robust fallback to ensure the site still loads with default metadata if the API fails
    return {
      title: "",
      description: "",
      icons: {
        icon: "/favicon.ico",
      },
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased scroll-smooth ",
        geistSans.variable,
        geistMono.variable,
        notoSans.variable,
        playfairDisplayHeading.variable
      )}
      suppressHydrationWarning
    >
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex fixed h-16 z-50 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b-2 bg-sidebar w-full">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
              </div>
            </header>
            <section className="mt-12">
              <ThemeProvider attribute="class" enableSystem>
                {children}
              </ThemeProvider>
            </section>
          </SidebarInset>
        </SidebarProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}

// app/layout.jsx
