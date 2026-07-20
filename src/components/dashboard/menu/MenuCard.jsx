import React from "react";
import { Edit2, Utensils, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper map to style dietary tags with subtle aesthetic colors
const DIETARY_STYLES = {
  vegetarian:
    "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  vegan:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  "gluten-free":
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  "dairy-free":
    "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  "nut-free":
    "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
};

export function MenuCard({ item, setItemData, setShowForm, setUpdateItem }) {
  const {
    name,
    price,
    category,
    description,
    image,
    isAvailable = true,
    isFeatured = false,
    dietaryTags = [],
  } = item;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 ${
        !isAvailable
          ? "opacity-75 shadow-sm"
          : "hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-none"
      }`}
    >
      {/* 1. MEDIA CONTAINER (With Zoom & Overlays) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={name}
            className={`h-full w-full object-cover transition-transform duration-500 ease-out ${
              isAvailable && "group-hover:scale-105"
            }`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground/40">
            <Utensils className="h-10 w-10 stroke-[1.5] transition-transform duration-300 group-hover:scale-110" />
            <span className="mt-2 text-xs font-medium tracking-wide">
              No Image Provided
            </span>
          </div>
        )}

        {/* Dynamic Badge Row (Top of Image) */}
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between pointer-events-none">
          {/* Category Tag */}
          <span className="rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-md border border-white/20 shadow-sm">
            {category}
          </span>

          {/* NEW FIELD: Featured Glassmorphism Badge */}
          {isFeatured && isAvailable && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 backdrop-blur-md border border-amber-500/30 shadow-sm animate-pulse">
              <Sparkles className="h-3 w-3 fill-current" />
              Chef's Choice
            </span>
          )}
        </div>

        {/* NEW FIELD: Sold Out Screen Overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm transition-all duration-300">
            <span className="rounded-xl bg-destructive px-4 py-2 text-xs font-black uppercase tracking-widest text-destructive-foreground shadow-lg border border-destructive/30">
              Sold Out Today
            </span>
          </div>
        )}
      </div>

      {/* 2. CARD CONTENT BLOCK */}
      <div className="flex flex-grow flex-col p-5">
        {/* Row: Title & Pricing */}
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
          <span
            className={`text-xl font-bold tracking-tight ${
              !isAvailable
                ? "text-muted-foreground/60"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            ${price.toFixed(2)}
          </span>
        </div>

        {/* Description Field */}
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* NEW FIELD: Dietary Metadata Row */}
        {dietaryTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {dietaryTags.map((tag) => {
              const styleClass =
                DIETARY_STYLES[tag.toLowerCase()] ||
                "bg-muted text-muted-foreground border-muted";
              return (
                <span
                  key={tag}
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide transition-colors ${styleClass}`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Clean, Borderless Action Row */}
        <div className="mt-auto flex items-center justify-end pt-4 border-t border-muted/60 mt-5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setItemData(item);
              setShowForm(true);
              setUpdateItem(true);
            }}
            disabled={!isAvailable}
            className="h-9 gap-1.5 rounded-xl bg-muted/60 hover:bg-primary hover:text-primary-foreground font-medium transition-all duration-200"
          >
            <Edit2 className="h-3.5 w-3.5" />
            Edit Item
          </Button>
        </div>
      </div>
    </div>
  );
}
