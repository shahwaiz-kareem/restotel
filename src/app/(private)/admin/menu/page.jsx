"use client";

import { FoodForm } from "@/components/dashboard/menu/FoodForm";
import { MenuCard } from "@/components/dashboard/menu/MenuCard";
import TableContainer from "@/components/dashboard/shared/TableContainer";
import { deleteFoodItem } from "@/actions/menu.actions"; // <-- Import Actions

export default function MenuPage() {
  return (
    <TableContainer
      CrudForm={FoodForm}
      ItemCard={MenuCard}
      headerTitle="Menu"
      headerDesc="Browse and manage your restaurant's culinary catalog."
      itemType="food"
      columns={[
        {
          key: "name",
          label: "Room Name",
        },
        {
          key: "category",
          label: "Type",
          render: (val) => <span className="capitalize">{val}</span>,
        },
        {
          key: "price",
          label: "Price",
          render: (val) => `$${val}`,
        },
        {
          key: "isAvailable",
          label: "Status",
          render: (val) => (val ? "Available" : "Booked"),
        },
      ]}
      fetchEndpoint={"/menu"} // <-- Connect Fetch
      deleteAction={deleteFoodItem} // <-- Connect Delete
    />
  );
}
