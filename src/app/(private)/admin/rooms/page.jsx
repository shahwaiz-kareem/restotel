"use client";

import { RoomForm } from "@/components/dashboard/room/RoomForm";
import TableContainer from "@/components/dashboard/shared/TableContainer";
import { deleteRoomItem } from "@/actions/rooms.action"; // <-- Import Actions

export default function RoomPage() {
  return (
    <TableContainer
      CrudForm={RoomForm}
      headerTitle="Room"
      headerDesc="Browse and manage your restaurant's rooms."
      itemType="room"
      fetchEndpoint={"/rooms"}
      columns={[
        {
          key: "name",
          label: "Room Name",
        },
        {
          key: "roomType",
          label: "Type",
          render: (val) => <span className="capitalize">{val}</span>,
        },
        {
          key: "pricePerNight",
          label: "Price per Night",
          render: (val) => `$${val}`,
        },
        {
          key: "isAvailable",
          label: "Status",
          render: (val) => (val ? "Available" : "Booked"),
        },
      ]}
      deleteAction={deleteRoomItem}
    />
  );
}
