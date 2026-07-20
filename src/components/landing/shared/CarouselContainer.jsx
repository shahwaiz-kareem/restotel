import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function CarouselContainer({
  items = [],
  itemSize = "basis-full sm:basis-1/2 lg:basis-1/3",
  opts = { align: "start", loop: true },
  controlsVariant = "top",
  heading,
  className = "",
  children,
}) {
  const icons = {
    left: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    ),
    right: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    ),
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="px-4 sm:px-12 py-8">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font text-center mx-auto font-bol">
          {heading}
        </h2>
      </div>
      <div className="w-full max-w-7xl  flex flex-col relative select-none">
        <Carousel
          opts={opts}
          className={cn("w-full h-full relative group/carousel", className)}
        >
          {/* Top Controls Layout: Now fully responsive, scaling safely above the track */}
          {controlsVariant === "top" && (
            <div className="w-full flex justify-end items-center gap-2 mb-6 sm:absolute sm:-top-16 sm:right-0 sm:mb-0 z-30">
              <CarouselPrevious
                className="static translate-y-0 h-10 w-10 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
                icon={icons.left}
              />
              <CarouselNext
                className="static translate-y-0 h-10 w-10 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
                icon={icons.right}
              />
            </div>
          )}

          {/* Main Viewport Slide Track Wrapper */}
          <div className="w-full overflow-hidden">
            <CarouselContent className="-ml-2 sm:-ml-6 flex w-full">
              {items.map((item, index) => (
                <CarouselItem
                  key={index}
                  className={cn(
                    "pl-4 sm:pl-6 min-w-0 flex-shrink-0 flex-grow-0 ",
                    itemSize
                  )}
                >
                  {/* Individual pristine wrapper shell */}
                  <div className="h-full w-full rounded-[2rem] overflow-hidden transition-all duration-300">
                    {React.cloneElement(children, { data: item })}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          {/* Bottom Floating Control Dock Variant */}
          {controlsVariant === "bottom" && (
            <div className="flex justify-center mt-8 w-full">
              <div className="inline-flex items-center gap-4 bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl px-4 py-2 rounded-full shadow-xl">
                <CarouselPrevious
                  className="static translate-y-0 h-9 w-9 rounded-full bg-neutral-950 border border-neutral-800 text-white hover:bg-white hover:text-black transition-all active:scale-95"
                  icon={icons.left}
                />

                {/* High Contrast Primary Pagination Dashboard Layout */}
                <div className="flex gap-1.5 px-1 items-center">
                  {items.slice(0, Math.min(items.length, 5)).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === 0 ? "w-4 bg-white" : "w-1.5 bg-neutral-700"
                      )}
                    />
                  ))}
                </div>

                <CarouselNext
                  className="static translate-y-0 h-9 w-9 rounded-full bg-neutral-950 border border-neutral-800 text-white hover:bg-white hover:text-black transition-all active:scale-95"
                  icon={icons.right}
                />
              </div>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
}
