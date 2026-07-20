"use client";
import DynamicTabsContainer from "@/components/landing/shared/DynamicTabsContainer";
import GalleryCard from "@/components/landing/GalleryCard";

const imageCategories = [
  { type: "interior", label: "Interior" },
  { type: "exterior", label: "Exterior" },
];

export default function GalleryPage() {
  return (
    <DynamicTabsContainer
      endpoint={`/api/gallery`}
      categories={imageCategories}
      limit={6}
      renderCard={(image) => <GalleryCard data={image} />}
    />
  );
}
