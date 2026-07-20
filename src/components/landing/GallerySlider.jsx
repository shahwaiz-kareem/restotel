import CarouselContainer from "@/components/landing/shared/CarouselContainer";
import GalleryCard from "./GalleryCard";

export default async function GallerySlider() {
  let items = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/gallery?page=1&limit=6`
    );
    const data = await res.json();
    items = data?.documents;
  } catch (error) {
    console.log(error);
  }
  return (
    <CarouselContainer
      items={items}
      controlsVariant="top"
      heading={"Glimpse of Our Gallery"}
      itemSize="basis-full sm:basis-1/2 lg:basis-1/3" // 3 columns on desktop
    >
      <GalleryCard />
    </CarouselContainer>
  );
}
