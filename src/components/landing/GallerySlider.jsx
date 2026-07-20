import CarouselContainer from "@/components/landing/shared/CarouselContainer";
import GalleryCard from "./GalleryCard";
import { fetchGallery } from "@/utils/fetchers";

export default async function GallerySlider() {
  let response = {};
  try {
    response = await fetchGallery({ page: 1, limit: 6, category: "all" });
  } catch (error) {
    console.error("Error fetching gallery data:", error);
  }

  return (
    <CarouselContainer
      items={response?.documents ?? []}
      controlsVariant="top"
      heading={"Glimpse of Our Gallery"}
      itemSize="basis-full sm:basis-1/2 lg:basis-1/3" // 3 columns on desktop
    >
      <GalleryCard />
    </CarouselContainer>
  );
}
