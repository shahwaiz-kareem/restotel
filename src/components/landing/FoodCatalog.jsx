import CarouselContainer from "@/components/landing/shared/CarouselContainer";
import FoodCard from "./FoodCard";
import { fetchFoods } from "@/utils/fetchers";

export default async function FoodCatalog() {
  let response = {};
  try {
    response = await fetchFoods({ page: 1, limit: 6, category: "all" });
  } catch (error) {
    console.error("Error fetching food data:", error);
  }

  return (
    <CarouselContainer
      items={response?.documents ?? []}
      controlsVariant="top"
      heading={"Popular Dishes"}
      itemSize="basis-full sm:basis-1/2 lg:basis-1/3"
    >
      <FoodCard />
    </CarouselContainer>
  );
}
