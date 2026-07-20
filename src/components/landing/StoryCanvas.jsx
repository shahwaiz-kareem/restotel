export default function StoryCanvas() {
  return (
    <section className="w-full bg-[#1d2d24] py-28 md:py-36 px-6 text-center text-stone-100 relative overflow-hidden">
      {/* Decorative Subtle Background Texture Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2a3d32] rounded-full blur-[120px] opacity-40 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center space-y-6 md:space-y-8">
        {/* Editorial Subheading */}
        <span className="text-xs md:text-sm tracking-[0.35em] font-semibold text-[#C5A880] uppercase">
          The People Behind The Place
        </span>

        {/* Elegant Italic Serif Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-stone-100 font-light tracking-wide">
          A Family&apos;s Dream
        </h2>

        {/* Custom Luxury Separator */}
        <div className="flex items-center justify-center space-x-3 w-24 my-2">
          <span className="h-[1px] w-full bg-[#C5A880]/30"></span>
          <span className="text-xs text-[#C5A880]/60 select-none">✦</span>
          <span className="h-[1px] w-full bg-[#C5A880]/30"></span>
        </div>

        {/* Intimate Reading Container */}
        <blockquote className="relative w-full pt-4">
          {/* Top Elegant Large Quote Mark */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-7xl font-serif text-[#C5A880]/15 select-none pointer-events-none">
            “
          </span>

          {/* Narrative Content */}
          <div className="space-y-6 text-base md:text-lg lg:text-xl text-stone-200/90 leading-relaxed font-light tracking-wide">
            <p>
              From a dreamer’s global wanderings arose a simple question: why
              couldn’t Pakistan offer the same luxury amidst its breathtaking
              landscapes? That question became a family’s mission.
            </p>
            <p>
              Aunts, uncles, daughters, and sons united — one designed the logo,
              another found paradise in Yasin Valley, while the mother wove
              elegance into every space. The dreamer left city life behind,
              laying stone by stone by hand.
            </p>
            <p className="font-serif italic text-stone-100 pt-2 text-lg md:text-xl lg:text-2xl text-[#C5A880]/90">
              Today, Rustagaarii stands as a testament to passion,
              collaboration, and a reverence for nature’s wonders.
            </p>
          </div>

          {/* Bottom Elegant Large Quote Mark */}
          <span className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-7xl font-serif text-[#C5A880]/15 select-none pointer-events-none">
            ”
          </span>
        </blockquote>
      </div>
    </section>
  );
}
