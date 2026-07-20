// components/Navbar.jsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Menu,
  BedDouble,
  Utensils,
  Image as ImageIcon,
  Phone,
  Home,
} from "lucide-react";
import Image from "next/image";
import { fetchSettings } from "@/utils/fetchers";

export default async function Navbar() {
  const { settings } = await fetchSettings();

  const {
    brandName = "Lumina",
    logoUrl,
    enableRooms = true,
    enableGallery = true,
    enableMenu = true,
  } = settings;

  const navLinks = [];
  navLinks.push({ label: "Home", href: "/", icon: Home });
  if (enableRooms)
    navLinks.push({ label: "Rooms", href: "/rooms", icon: BedDouble });
  if (enableMenu)
    navLinks.push({ label: "Menu", href: "/menu", icon: Utensils });
  if (enableGallery)
    navLinks.push({ label: "Gallery", href: "/gallery", icon: ImageIcon });
  navLinks.push({ label: "Contact", href: "/contact", icon: Phone });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full ">
      <header className="w-full  border border-white/[0.08] bg-primary backdrop-blur-xl px-4 sm:px-6 h-16 flex items-center justify-between shadow-lg transition-all duration-300">
        {/* Logo wrapped in a clean container */}
        <Link href="/" className="flex items-center gap-2 group">
          {logoUrl ? (
            <Image
              height={250}
              width={250}
              priority
              src={logoUrl}
              alt={`${brandName} Logo`}
              className="h-10 w-auto object-contain transition-transform rounded-lg duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-xl font-heading font-bold tracking-tight text-white">
              {brandName}
            </span>
          )}
        </Link>

        {/* Desktop Navigation Link Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] p-1 rounded-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-neutral-300 hover:text-white px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/[0.06] flex items-center gap-1.5"
            >
              <link.icon className="w-3.5 h-3.5 opacity-70" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button with dynamic glow mapping */}
        <div className="hidden md:flex items-center">
          <Link
            href={"/contact"}
            className="rounded-full text-sm  flex items-center font-semibold px-6 h-9 text-primary transition-all duration-300 bg-white shadow hover:bg-white hover:text-primary/40"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger Layout */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10 h-9 w-9"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] pl-4 bg-neutral-950 border-l border-white/10 flex flex-col pt-16 rounded-l-[2rem]"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>

              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-4 text-base font-medium text-neutral-300 hover:text-white p-3 rounded-2xl hover:bg-white/5 transition-all"
                  >
                    <div className="p-2.5 rounded-xl text-primary bg-white/5">
                      <link.icon className="w-4 h-4" />
                    </div>
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pb-6">
                <Button className="w-full rounded-full text-primary py-6 text-sm font-semibold transition-all bg-white">
                  Book Your Stay
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}
