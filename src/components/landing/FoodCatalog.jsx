import CarouselContainer from "@/components/landing/shared/CarouselContainer";
import FoodCard from "./FoodCard";

export default async function FoodCatalog() {
  let items = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/menu?page=1&limit=6`
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
      heading={"Popular Dishes"}
      itemSize="basis-full sm:basis-1/2 lg:basis-1/3"
    >
      <FoodCard />
    </CarouselContainer>
  );
}
