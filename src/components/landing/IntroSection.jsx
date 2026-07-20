import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-6 md:px-12 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Column: Image (5 Columns) */}
        <div className="md:col-span-5 relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-primary/5 shadow-lg">
          <Image
            src="/exterior.webp"
            alt="Rustagaarii Retreat Exterior"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
        </div>

        {/* Right Column: Editorial Text (7 Columns) */}
        <div className="md:col-span-7 flex flex-col space-y-6 md:pr-8">
          {/* Subheading */}
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-xs md:text-sm tracking-[0.25em] font-semibold text-primary uppercase">
              Yasin Valley • Gilgit-Baltistan
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary leading-[1.15] tracking-tight">
            Born in Pakistan,
            <br />
            Inspired by Europe
          </h2>

          {/* Body Text */}
          <div className="space-y-4 text-primary/80 text-base md:text-lg leading-relaxed max-w-2xl">
            <p>
              Nestled in the breathtaking Yasin Valley at the crossroads of the
              Karakoram and Hindu Raj ranges, Rustagaarii Retreat is a family’s
              dream turned reality — a sustainable haven where international
              luxury meets the raw beauty of Pakistan’s northern mountains.
            </p>
            <p className="font-medium text-primary">
              Not a single tree was sacrificed in its creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
