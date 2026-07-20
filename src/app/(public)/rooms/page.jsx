"use client";
import { roomCategories } from "@/app/content";
import RoomCard from "@/components/landing/RoomCard";
import DynamicTabsContainer from "@/components/landing/shared/DynamicTabsContainer";
// import Navbar from "@/components/landing/shared/Navbar";

export default function HotelSuitesSection() {
  return (
    <>
      {/* <Navbar /> */}
      <DynamicTabsContainer
        endpoint={`/api/rooms`}
        categories={roomCategories}
        limit={6} // Fits a clean single desktop row boundary perfectly out of the box
        renderCard={(room) => <RoomCard data={room} />}
      />
    </>
  );
}
