"use client";

import { ImageForm } from "@/components/dashboard/gallery/ImageForm"; // Adjust path to where you saved the form
import CardsContainer from "@/components/dashboard/shared/CardsContainer";
import GalleryCard from "./GalleryCard";
import {
  deleteGalleryItem,
  getGalleryCatalog,
} from "@/actions/gallery.actions";

// Temporary mock data for the gallery
const mockImages = [
  {
    id: 1,
    name: "Main Dining Room",
    category: "interior",
    description:
      "A wide shot of our newly renovated main dining area during evening service.",
  },
  {
    id: 2,
    name: "Patio Seating",
    category: "exterior",
    description: "Outdoor seating arrangement ready for the summer season.",
  },
];

export default function Gallery() {
  return (
    <CardsContainer
      CrudForm={ImageForm}
      ItemCard={GalleryCard}
      headerDesc={"Browse and manage your restaurant's photo gallery."}
      headerTitle={"Gallery"}
      itemType={"image"}
      deleteAction={deleteGalleryItem}
      fetchEndpoint={"/gallery"}
      itemsList={mockImages}
    />
  );
}
