import Image from "next/image";

export function ExploreCard({ data }) {
  if (!data) return null;

  return (
    <div className="group relative w-full h-full aspect-[3/4] border border-primary/10 bg-primary/5 backdrop-blur-md p-8 flex flex-col justify-between select-none">
      {/* Magic Touch: Hover-Reveal Desaturated Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity group-hover:opacity-20 transition-opacity duration-700 ease-out">
        <Image
          src={data.imgSrc}
          alt={data.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Top Row: Elegant Number */}
      <div className="z-10">
        <span className="text-4xl md:text-5xl font-serif font-light text-primary/40 group-hover:text-primary transition-colors duration-500">
          {data.number}
        </span>
      </div>

      {/* Bottom Row: Content (Left-aligned for reading flow) */}
      <div className="z-10 flex flex-col bg-primary/70 rounded-xl p-2 space-y-3 text-left">
        <h3 className="text-lg md:text-xl font-serif text-white/80 font-semibold tracking-wide">
          {data.title}
        </h3>
        <p className="text-xs md:text-sm text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {data.description}
        </p>
      </div>
    </div>
  );
}
