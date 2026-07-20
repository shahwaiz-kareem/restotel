"use client";
import DynamicTabsContainer from "@/components/landing/shared/DynamicTabsContainer";
import FoodCard from "@/components/landing/FoodCard";
import { foodCategories } from "@/app/content";

export default function MenuPage() {
  return (
    <DynamicTabsContainer
      endpoint={`/api/menu`}
      categories={foodCategories}
      limit={6}
      renderCard={(dish) => <FoodCard data={dish} />}
    />
  );
}
