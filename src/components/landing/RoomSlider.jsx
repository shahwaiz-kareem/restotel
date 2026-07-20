import CarouselContainer from "@/components/landing/shared/CarouselContainer";
import RoomCard from "../landing/RoomCard";
import { fetchRooms } from "@/utils/fetchers";

export default async function RoomSlider() {
  let response = {};
  try {
    response = await fetchRooms({ page: 1, limit: 6, category: "all" });
  } catch (error) {
    console.error("Error fetching room data:", error);
  }

  return (
    <CarouselContainer
      items={response?.documents ?? []}
      controlsVariant="top"
      heading={"Our Featured Rooms"}
      itemSize="basis-full sm:basis-1/2 lg:basis-1/3" // 3 columns on desktop
    >
      <RoomCard />
    </CarouselContainer>
  );
}
