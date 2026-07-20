import { cn } from "@/lib/utils";

export default function GalleryCard({ data }) {
  const {
    name = "Gallery Image",
    category = "Exteriors",
    imageUrl,
  } = data || {};

  return (
    <div className="group relative w-full h-[460px] overflow-hidden rounded-[2rem] shadow-2xl bg-neutral-900">
      {/* 1. Complete Frame Image Cover */}
      <div className="absolute inset-0 h-full w-full overflow-hidden z-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name} // Alt attribute handles accessibility behind the scenes without rendering text
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.9] group-hover:brightness-100"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-neutral-600 text-xs font-mono">
            Image Missing
          </div>
        )}
      </div>

      {/* 2. Soft Protective Corner Gradient (Ensures white text readability on bright images) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-70" />

      {/* 3. The Only Visible Element: Floating Category Badge */}
      <div className="absolute top-5 left-5 z-20">
        <span className="text-[11px] font-semibold tracking-widest uppercase bg-black/40 backdrop-blur-xl border border-white/[0.08] text-neutral-200 px-4 py-2 rounded-full shadow-md transition-all duration-300 group-hover:bg-black/60">
          {category}
        </span>
      </div>
    </div>
  );
}
