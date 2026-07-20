import { Home, Utensils, Mountain, Landmark } from "lucide-react";

const experiences = [
  {
    icon: Home,
    title: "Luxury Cottages",
    description:
      "Handcrafted, insulated stone and wood sanctuaries designed to merge rustic authenticity with premium comfort.",
  },
  {
    icon: Utensils,
    title: "Mountain Dining",
    description:
      "Savor carefully curated local and continental flavors, crafted from organic, high-altitude ingredients.",
  },
  {
    icon: Mountain,
    title: "Nazbar Stream & Treks",
    description:
      "Step outside directly into glacial trails, hidden valleys, and roaring pristine streams waiting to be explored.",
  },
  {
    icon: Landmark,
    title: "Art & Culture",
    description:
      "Immerse yourself in the ancient heritage, architecture, and enduring hospitality of the Yasin Valley families.",
  },
];

export default function ExperienceGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 lg:px-16 text-center">
      {/* Section Header */}
      <div className="flex flex-col items-center space-y-3 mb-16 md:mb-24">
        <span className="text-xs md:text-sm tracking-[0.3em] font-semibold text-primary uppercase">
          What Awaits You
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-tight">
          The Rustagaarii Experience
        </h2>
        <p className="text-primary/70 text-base md:text-lg max-w-xl mx-auto pt-2">
          Every element of your stay is crafted to connect you with the
          mountains — and with yourself.
        </p>
      </div>

      {/* Borderless Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {experiences.map((exp, index) => {
          const IconComponent = exp.icon;
          return (
            <div
              key={index}
              className="group flex flex-col items-center text-center cursor-pointer border-b border-primary/10 pb-8 transition-colors duration-500 hover:border-primary/40"
            >
              {/* Icon Container with Hover Animation */}
              <div className="mb-6 transform transition-transform duration-300 ease-out group-hover:-translate-y-2">
                <IconComponent
                  className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-[#C5A880]"
                  strokeWidth={1.2} // Keeps the editorial, thin-stroke luxury aesthetic
                />
              </div>

              {/* Experience Title */}
              <h3 className="text-sm md:text-base font-semibold tracking-[0.15em] text-primary uppercase mb-3">
                {exp.title}
              </h3>

              {/* Experience Description */}
              <p className="text-sm text-primary/70 leading-relaxed max-w-xs px-2">
                {exp.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
