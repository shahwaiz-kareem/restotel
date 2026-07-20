// app/layout.jsx
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Playfair_Display,
} from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { fetchSettings } from "@/utils/fetchers";
import Navbar from "@/components/landing/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";

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
  try {
    const { settings } = await fetchSettings();

    // Construct the title. Fallback to defaults if specific fields are missing.
    const siteTitle = `${settings.brandName} `;

    return {
      title: siteTitle,
      description: settings?.heroSubtext,
      icons: {
        icon: settings?.faviconUrl || "/favicon.ico", // Dynamic favicon
      },
      openGraph: {
        title: siteTitle,
        description: settings?.heroSubtext,
        images: settings?.logoUrl ? [settings.logoUrl] : [],
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

export default async function RootLayout({ children }) {
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
        {/* Main Page Content */}
        <main className="flex- fle flex-col w-full relative z-0">
          <Navbar />
          {children}
        </main>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
