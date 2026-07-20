import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Arizonia } from "next/font/google";

const arizonia = Arizonia({
  weight: "400",
  subsets: ["latin"],
});

export default function Footer({ settingsData, contactData }) {
  // Extract Configuration Data Safely
  const {
    brandName = "Lumina",
    heroSubtext,
    logoUrl,
    enableRooms = true,
    enableGallery = true,
    enableMenu = true,
  } = settingsData || {};

  // Extract Contact Data Safely
  const { phone, email, facebook, instagram, twitter } = contactData || {};

  // Custom XML Vectors for High-Performance Rendering
  const socialIcons = {
    facebook: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-4 h-4"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
    instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 8.686 5.5h6.628c.646 0 1.27.257 1.73.717a2.31 2.31 0 0 1 .67 1.73v6.628c0 .646-.257 1.27-.717 1.73a2.31 2.31 0 0 1-1.73.67H8.686a2.31 2.31 0 0 1-1.73-.67 2.31 2.31 0 0 1-.67-1.73V7.947c0-.646.257-1.27.717-1.73Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 7.5h.008v.008H16.5V7.5Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
    twitter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-4 h-4"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  };

  // const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary border-t border-white/[0.06] text-white pt-16 pb-8 select-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Upper Functional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Presentation Module */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              {logoUrl ? (
                <Image
                  height={200}
                  width={200}
                  src={logoUrl}
                  alt={brandName}
                  className="h-7 w-auto object-contain"
                />
              ) : (
                <span className="text-lg font-heading font-bold tracking-tight">
                  {brandName}
                </span>
              )}
            </Link>
            <p
              className={`${arizonia.className}  text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-sans font-normal leading-relaxed `}
            >
              {heroSubtext}
            </p>
          </div>

          {/* Dynamic Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              Explore
            </h4>
            <nav className="flex flex-col space-y-2.5">
              {enableRooms && (
                <Link
                  href="/rooms"
                  className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors w-fit"
                >
                  Rooms & Suites
                </Link>
              )}
              {enableMenu && (
                <Link
                  href="/menu"
                  className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors w-fit"
                >
                  Culinary Menu
                </Link>
              )}
              {enableGallery && (
                <Link
                  href="/gallery"
                  className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors w-fit"
                >
                  Visual Gallery
                </Link>
              )}
              <Link
                href="/contact"
                className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors w-fit"
              >
                Concierge Contact
              </Link>
            </nav>
          </div>

          {/* Dynamic Direct Communications Column */}
          {(phone || email) && (
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Connect Direct
              </h4>
              <div className="flex flex-col space-y-2.5 text-xs sm:text-sm text-neutral-400 font-mono">
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="hover:text-white transition-colors truncate w-fit"
                  >
                    {phone}
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-white transition-colors truncate w-fit"
                  >
                    {email}
                  </a>
                )}
              </div>

              {/* Floating Social Icons Capsule Group */}
              {(facebook || instagram || twitter) && (
                <div className="flex items-center gap-2 pt-2">
                  {facebook && (
                    <a
                      href={facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
                    >
                      {socialIcons.facebook}
                    </a>
                  )}
                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
                    >
                      {socialIcons.instagram}
                    </a>
                  )}
                  {twitter && (
                    <a
                      href={twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
                    >
                      {socialIcons.twitter}
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lower Utility & Attribution Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          {/* Premium Custom Developer Credit */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-200 font-sans tracking-wide">
            <span>Designed and Developed by</span>
            <Link
              href="https://www.linkedin.com/in/shahwaiz-kareem-bb41142ba" // Absolute path matches your credentials
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-300 hover:text-white transition-all duration-300 relative group py-0.5 px-1.5 rounded-full bg-white/[0] border border-white/[0.05] hover:border-white/[0.15] flex items-center gap-1"
            >
              {/* Tiny vector badge for LinkedIn branding context inside the credit tag */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 group-hover:text-blue-400 transition-colors"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="underline decoration-white/0 group-hover:decoration-white/40 underline-offset-4 transition-all">
                Shahwaiz Kareem
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
