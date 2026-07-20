"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createRoomItem, updateRoomItem } from "@/actions/rooms.action";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roomCategories } from "@/app/content";

// 1. Available hotel room amenities for dynamic check selection
const AMENITY_OPTIONS = [
  { id: "wifi", label: "Free Wi-Fi" },
  { id: "ac", label: "Air Conditioning" },
  { id: "tv", label: "Smart TV" },
  { id: "minibar", label: "Mini Bar" },
  { id: "balcony", label: "Private Balcony" },
  { id: "oceanview", label: "Ocean View" },
  { id: "room-service", label: "24/7 Room Service" },
  { id: "bathtub", label: "Luxury Bathtub" },
];

// 2. Hotel Room Zod Validation Schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Room name/number must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  pricePerNight: z.coerce.number().positive({
    message: "Price per night must be a valid positive number.",
  }),
  roomType: z.string().min(1, {
    message: "Please select a room type.",
  }),
  maxOccupancy: z.coerce.number().positive({
    message: "Max occupancy must be at least 1 guest.",
  }),
  image: z.any().optional(),

  // OPERATIONAL & MARKETING FIELDS (Mirrored from Food Form)
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  amenities: z.array(z.string()).default([]),
});

export function RoomForm({ onSuccess, itemData, updateItem }) {
  // 3. Initialize React Hook Form with dynamic item defaults
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: itemData?.name || "",
      description: itemData?.description || "", // Fixed original code description default typo
      pricePerNight: itemData?.pricePerNight || "",
      roomType: itemData?.roomType || "",
      maxOccupancy: itemData?.maxOccupancy || "",
      image: itemData?.image || null,
      isAvailable: itemData?.isAvailable ?? true,
      isFeatured: itemData?.isFeatured ?? false,
      amenities: itemData?.amenities || [],
    },
  });

  // ... inside your RoomForm component ...

  async function onSubmit(values) {
    const toastId = toast.loading(
      updateItem
        ? "Processing room structural changes..."
        : "Registering new room blueprint..."
    );

    try {
      const dataPayload = new FormData();
      dataPayload.append("name", values.name);
      dataPayload.append("description", values.description);
      dataPayload.append("pricePerNight", values.pricePerNight);
      dataPayload.append("roomType", values.roomType);
      dataPayload.append("maxOccupancy", values.maxOccupancy);
      dataPayload.append("isAvailable", values.isAvailable);
      dataPayload.append("isFeatured", values.isFeatured);
      dataPayload.append("amenities", JSON.stringify(values.amenities)); // Safely serialize amenities matrix array

      if (values.image instanceof File) {
        dataPayload.append("image", values.image);
      }

      let result;

      if (updateItem && itemData?.$id) {
        dataPayload.append("existingImageId", itemData.imageId || "");
        dataPayload.append("existingImageUrl", itemData.imageUrl || "");

        result = await updateRoomItem(itemData.$id, dataPayload);
      } else {
        result = await createRoomItem(dataPayload);
      }

      if (result.success) {
        toast.success(
          updateItem
            ? "Room updated!"
            : `${values.name} is now open for bookings.`,
          { id: toastId }
        );
        if (onSuccess) onSuccess();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Room Submission Error:", error);
      toast.error(
        error.message || "Failed to commit lodging configuration data.",
        { id: toastId }
      );
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6  rounded-2xl border shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {updateItem ? "Edit" : "Add"} Hotel Room
        </h2>
        <p className="text-muted-foreground text-sm">
          Configure room configurations, rates, availability status, and
          amenities matrix.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* ROOM TITLE / NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Name or Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Deluxe Ocean Suite / Room 402"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe room layouts, bedding specifications, and views..."
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PRICING & TYPE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pricePerNight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Night ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roomType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room tier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roomCategories.map(({ type, label }) => (
                        <SelectItem key={type} value={type}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* CAPACITY & IMAGE UPLOAD MATRIX */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="sm:col-span-1">
              <FormField
                control={form.control}
                name="maxOccupancy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Occupancy</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Max guests"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="sm:col-span-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Room Showcase Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file =
                            event.target.files && event.target.files[0];
                          if (file) onChange(file);
                        }}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <hr className="border-muted/60" />

          {/* OPERATIONAL SWITCHES */}
          <div className="space-y-4 rounded-xl border bg-muted/20 p-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase opacity-70">
              Operational Preferences
            </h3>

            {/* IS AVAILABLE SWITCH */}
            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border bg-background p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Room Availability Status</FormLabel>
                    <FormDescription className="text-xs">
                      Toggle off to pull this room from bookings for
                      housekeeping/maintenance.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* IS FEATURED SWITCH */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border bg-background p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Featured Showcase</FormLabel>
                    <FormDescription className="text-xs">
                      Promote this unit prominently on the main lodging home
                      page grid.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* AMENITIES CHECKBOX GRID */}
          <div className="space-y-3">
            <div>
              <FormLabel className="text-base">In-Room Amenities</FormLabel>
              <FormDescription className="text-xs">
                Select all features included inside this specific room unit.
              </FormDescription>
            </div>

            <FormField
              control={form.control}
              name="amenities"
              render={() => (
                <FormItem className="grid grid-cols-2 gap-3 sm:grid-cols-3 space-y-0">
                  {AMENITY_OPTIONS.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.id}
                            className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border p-3 bg-background/50 hover:bg-muted/40 transition-colors"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        option.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm cursor-pointer select-none">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* SUBMIT ACTION */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium rounded-xl shadow-md"
          >
            Save Room
          </Button>
        </form>
      </Form>
    </div>
  );
}
