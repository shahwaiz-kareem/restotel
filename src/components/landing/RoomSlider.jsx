import CarouselContainer from "@/components/landing/shared/CarouselContainer";
import RoomCard from "../landing/RoomCard";

export default async function RoomSlider() {
  let items = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/rooms?page=1&limit=6`
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
      heading={"Our Featured Rooms"}
      itemSize="basis-full sm:basis-1/2 lg:basis-1/3" // 3 columns on desktop
    >
      <RoomCard />
    </CarouselContainer>
  );
}
