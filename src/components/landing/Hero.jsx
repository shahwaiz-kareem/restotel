import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { Arizonia } from "next/font/google";

const arizonia = Arizonia({
  weight: "400",
  subsets: ["latin"],
});

export default async function HeroSection({ settings }) {
  const { brandName, heroTitle, heroSubtext, videoUrl } = settings;

  if (videoUrl) {
    return (
      <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Video */}
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-[1.02] filter brightness-[0.85] z-0"
          aria-hidden="true"
        />

        {/* Advanced Multi-Layer Radial Overlay for Cinema effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_90%)] z-10 opacity-90" />

        {/* Floating Content Card */}
        <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center max-w-4xl mt-8">
          {/* Clean Variable Typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-heading tracking-tight leading-[1.1] font-bold drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {heroTitle}
          </h1>

          <p
            className={`${arizonia.className} mt-6 text-2xl sm:text-3xl md:text-5xl text-neutral-300 max-w-4xl font-sans font-normal leading-relaxed drop-shadow-md`}
          >
            {heroSubtext}
          </p>

          {/* Fully Pill-shaped Action Controls
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
            <Link
              href={"/menu"}
              className="rounded-full flex items-center text-sm font-semibold px-8 h-12 text-white hover:brightness-110 active:scale-98 transition-all duration-200 w-full sm:w-auto border-0 bg-primary shadow"
            >
              Discover Menu
            </Link>

            <Link
              size="lg"
              variant="outline"
              href={"/gallery"}
              className="rounded-full flex items-center text-sm font-semibold px-8 h-12 text-white border-white/20 bg-white/[0.03] backdrop-blur-md hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-full sm:w-auto shadow-lg"
            >
              View Gallery
            </Link>
          </div> */}
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Dynamic Aura Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-primary rounded-full blur-[160px] opacity-15 animate-pulse duration-[6000ms]" />
      </div>

      <div className="container relative z-10 px-4 py-32 mx-auto flex flex-col items-center text-center max-w-4xl">
        {/* Floating Capsule Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-semibold tracking-wider text-neutral-400 mb-8 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span>The {brandName} Experience</span>
        </div>

        {/* Modern Clean Header Text */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tight text-white leading-[1.15]">
          {heroTitle}
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {heroSubtext}
        </p>

        {/* Pill Shaped CTA block */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto">
          <Button
            size="lg"
            className="rounded-full text-sm font-semibold px-8 h-12 text-white hover:brightness-110 transition-all group w-full sm:w-auto bg-primary shadow"
          >
            Explore Options
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="rounded-full text-sm font-semibold px-8 h-12 text-neutral-400 hover:text-white hover:bg-white/5 w-full sm:w-auto"
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Tech Grid Mask Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
    </section>
  );
}
