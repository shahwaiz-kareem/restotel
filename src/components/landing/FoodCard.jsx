import { Badge } from "@/components/ui/badge";
import { Sparkles, Ban } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FoodCard({ data, brandColor = "#3b82f6" }) {
  const {
    name = "Signature Dish",
    description = "A culinary masterpiece prepared with locally sourced premium ingredients.",
    price = "0.00",
    category = "Entrée",
    isAvailable = true,
    isFeatured = false,
    dietaryTags = [],
    imageUrl,
  } = data || {};

  return (
    <div
      className={cn(
        "group relative w-full h-[460px] flex flex-col justify-end overflow-hidden border transition-all duration-500 rounded-[2rem]",
        // Dark premium themed styles with high-contrast interactions
        "bg-neutral-950 border-white/[0.06] hover:border-white/[0.15] shadow-2xl",
        !isAvailable && "opacity-60"
      )}
    >
      {/* 1. Background Image Wrapper with Zoom Interaction */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.8] group-hover:brightness-[0.7]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center text-neutral-700 text-xs font-mono">
            No image available
          </div>
        )}
      </div>

      {/* 2. Advanced Ambient Overlays (Cinema Lighting Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-transparent to-neutral-950/80 z-10" />

      {/* 3. Top Floating Capsule Accents */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        {/* Category Pill with high blur glassmorphism */}
        <span className="text-[11px] font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-xl border border-white/[0.08] text-neutral-200 px-3.5 py-1.5 rounded-full shadow-lg">
          {category}
        </span>

        {/* Dynamic State Badges */}
        <div className="flex flex-col gap-2 items-end">
          {isFeatured && isAvailable && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-lg animate-pulse"
              style={{
                backgroundColor: brandColor,
                boxShadow: `0 4px 14px ${brandColor}50`,
              }}
            >
              <Sparkles className="w-3 h-3" />
              Chef's Choice
            </div>
          )}
          {!isAvailable && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-md shadow-lg">
              <Ban className="w-3 h-3" />
              Sold Out
            </div>
          )}
        </div>
      </div>

      {/* 4. Lower Content Container */}
      <div className="relative z-20 p-6 md:p-7 space-y-4 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        {/* Title and Price Hub */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white tracking-tight leading-tight group-hover:text-neutral-100 transition-colors">
            {name}
          </h3>
          <div className="text-xl font-mono font-bold tracking-tight text-right shrink-0">
            {/* Elegant dynamic color branding for the price */}
            <span style={{ color: brandColor }}>$</span>
            <span className="text-white">{parseFloat(price).toFixed(2)}</span>
          </div>
        </div>

        {/* Self-truncating Responsive Description */}
        <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
          {description}
        </p>

        {/* 5. Bottom Dietary Pill Rack */}
        {dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06] transform 0 transition-all duration-500 ease-out">
            {dietaryTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
