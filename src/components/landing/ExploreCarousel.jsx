import { ExploreCard } from "./ExploreCard";
import CarouselContainer from "./shared/CarouselContainer";

const attractions = [
  {
    number: "01",
    title: "Sultanabad Viewpoint",
    description:
      "Panoramic views at 7,200 feet — a hidden gem perfectly positioned for quiet reflection and sunrise photography.",
    imgSrc: "/attractions/sultanabad.jpg",
  },
  {
    number: "02",
    title: "Nazbar Stream",
    description:
      "Secluded paths, hidden canyon viewpoints, and icy, crystal-clear glacial waters running directly past the valley edge.",
    imgSrc: "/attractions/nazbar.webp",
  },
  {
    number: "03",
    title: "Darkut Lake & Glacier",
    description:
      "A breathtaking 2-hour alpine hike starting from Pakistan's last frontier village up to a dramatic glacial lake.",
    imgSrc: "/attractions/darkut.jpg",
  },
  {
    number: "04",
    title: "Makuli Lake",
    description:
      "Azure, mirror-like waters mirroring the vast sky at 11,500 feet, accessible via wildflower-filled alpine meadows.",
    imgSrc: "/attractions/makuli.webp",
  },
  {
    number: "05",
    title: "Burusho Museum",
    description:
      "A curated collection of regional artifacts chronicling the ancient heritage, architecture, and history of Yasin.",
    imgSrc: "/attractions/burusho.jpg",
  },
];

export default function ExploreCarousel() {
  return (
    <section className="w-full py-24 overflow-hidden">
      {/* Editorial Headers Layer */}
      <div className="flex flex-col items-center text-center space-y-3 mb-2 max-w-7xl mx-auto px-6">
        <span className="text-xs md:text-sm tracking-[0.3em] font-semibold text-primary uppercase">
          Beyond the Retreat
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-tight">
          Explore Yasin Valley
        </h2>
        <p className="text-primary/70 text-base md:text-lg max-w-xl pt-2">
          Ancient trails, glacial lakes, and hidden viewpoints await just beyond
          your doorstep.
        </p>
      </div>

      {/* Your Carousel Container integration */}
      <CarouselContainer
        items={attractions}
        itemSize="basis-full md:basis-1/2 lg:basis-1/3"
        controlsVariant="top"
        heading="" // Handled cleanly by our custom header block above
      >
        <ExploreCard />
      </CarouselContainer>
    </section>
  );
}
