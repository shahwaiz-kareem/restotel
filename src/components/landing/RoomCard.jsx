import React from "react";
import { Edit2, BedDouble, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Maps room types into clear, human-readable titles
const ROOM_TYPE_LABELS = {
  standard: "Standard Room",
  deluxe: "Deluxe Room",
  suite: "Executive Suite",
  penthouse: "Penthouse",
};

// Maps technical amenity IDs to clear aesthetic design pills
const AMENITY_STYLES = {
  wifi: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  ac: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
  tv: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
  minibar:
    "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  balcony:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  oceanview:
    "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
  "room-service":
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  bathtub: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20",
};

export default function RoomCard({ data }) {
  const {
    name,
    description,
    pricePerNight,
    roomType,
    maxOccupancy,
    imageUrl,
    isAvailable = true,
    isFeatured = false,
    amenities = [],
  } = data ?? {};

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl shadow border bg-car transition-all duration-300 ${
        !isAvailable
          ? "opacity-75 shadow-sm"
          : "hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-none"
      }`}
    >
      {/* 1. IMAGE CONTAINER WITH ZOOM OVERLAYS */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            height={500}
            width={500}
            src={imageUrl}
            alt={name}
            className={`h-full w-full object-cover transition-transform duration-500 ease-out ${
              isAvailable && "group-hover:scale-105"
            }`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground/40">
            <BedDouble className="h-10 w-10 stroke-[1.5] transition-transform duration-300 group-hover:scale-110" />
            <span className="mt-2 text-xs font-medium tracking-wide">
              No Image Uploaded
            </span>
          </div>
        )}

        {/* Floating Context Badges (Top of Image) */}
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between pointer-events-none">
          {/* Room Tier Tag */}
          <span className="rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-md border border-white/20 shadow-sm">
            {ROOM_TYPE_LABELS[roomType] || roomType}
          </span>

          {/* Featured Room Ribbon */}
          {isFeatured && isAvailable && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 backdrop-blur-md border border-amber-500/30 shadow-sm animate-pulse">
              <Sparkles className="h-3 w-3 fill-current" />
              Premium
            </span>
          )}
        </div>

        {/* Unavailable Block Overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm transition-all duration-300">
            <span className="rounded-xl bg-neutral-800 text-white dark:bg-zinc-100 dark:text-zinc-950 px-4 py-2 text-xs font-black uppercase tracking-widest shadow-lg border border-white/10">
              Unavailable / Booked
            </span>
          </div>
        )}
      </div>

      {/* 2. CARD CORE INFORMATION CONTAINER */}
      <div className="flex flex-grow flex-col p-5">
        {/* Title and Nightly Rate Row */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`font-semibold text-lg tracking-tight transition-colors ${
              !isAvailable
                ? "text-muted-foreground line-through"
                : "text-foreground group-hover:text-primary"
            }`}
          >
            {name}
          </h3>
          <div className="text-right flex flex-col">
            <span
              className={`text-xl font-bold tracking-tight leading-none ${
                !isAvailable
                  ? "text-muted-foreground/60"
                  : "text-zinc-900 dark:text-zinc-50"
              }`}
            >
              ${pricePerNight.toFixed(0)}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase mt-0.5 tracking-wide">
              / Night
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Room Specific Variant: Occupancy Limit Bar */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Users className="h-3.5 w-3.5" />
          <span>
            Max Occupancy: {maxOccupancy}{" "}
            {maxOccupancy === 1 ? "Guest" : "Guests"}
          </span>
        </div>

        {/* Amenities Dynamic Badge Row */}
        {amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {amenities.map((item) => {
              const styleClass =
                AMENITY_STYLES[item.toLowerCase()] ||
                "bg-muted text-muted-foreground border-muted";
              return (
                <span
                  key={item}
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide transition-colors ${styleClass}`}
                >
                  {item.replace("-", " ")}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
