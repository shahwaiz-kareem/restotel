"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Shadcn UI Imports
import { toast } from "sonner";
import { createFoodItem, updateFoodItem } from "@/actions/menu.actions.js";
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
import { foodCategories } from "@/app/content";

// 1. Available dietary options for selection
const DIETARY_OPTIONS = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "nut-free", label: "Nut-Free" },
];

// 2. Upgraded Zod Validation Schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Food name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a valid positive number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  image: z.any().optional(),

  // NEW OPERATIONAL & MARKETING FIELDS
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  dietaryTags: z.array(z.string()).default([]),
});

export function FoodForm({ onSuccess, itemData, updateItem }) {
  // 3. Initialize React Hook Form with expanded defaults
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: itemData?.name || "",
      description: itemData?.name || "",
      price: itemData?.price || "",
      category: itemData?.category || "",
      image: itemData?.image || null,
      isAvailable: itemData?.isAvailable || true,
      isFeatured: itemData?.isFeatured || false,
      dietaryTags: itemData?.dietaryTags || [],
    },
  });

  async function onSubmit(values) {
    // 1. Fire up a responsive loading state toast
    const toastId = toast.loading(
      updateItem ? "Saving menu changes..." : "Adding item to menu..."
    );

    try {
      // 2. Build the structural FormData payload container
      const dataPayload = new FormData();
      dataPayload.append("name", values.name);
      dataPayload.append("description", values.description);
      dataPayload.append("price", values.price);
      dataPayload.append("category", values.category);
      dataPayload.append("isAvailable", values.isAvailable);
      dataPayload.append("isFeatured", values.isFeatured);
      dataPayload.append("dietaryTags", JSON.stringify(values.dietaryTags)); // Safely stringify arrays

      // Only append the image if the user picked a new local file binary
      if (values.image instanceof File) {
        dataPayload.append("image", values.image);
      }

      let result;

      // 3. Branching execution: Update vs. Create
      if (updateItem && itemData?.$id) {
        // Pass along tracking parameters to let the action find and clean up old image assets
        dataPayload.append("existingImageId", itemData.imageId || "");
        dataPayload.append("existingImageUrl", itemData.imageUrl || "");

        result = await updateFoodItem(itemData.$id, dataPayload);
      } else {
        result = await createFoodItem(dataPayload);
      }

      // 4. Handle structural server feedback responses
      if (result.success) {
        toast.success(
          updateItem
            ? "Dish metrics updated!"
            : `${values.name} is now live on the menu!`,
          { id: toastId } // Replaces the loading spinner automatically
        );
        if (onSuccess) onSuccess();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Menu Submission Error:", error);
      toast.error(error.message || "Failed to update terminal matrix.", {
        id: toastId,
      });
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl border shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {updateItem ? "Edit" : "Add"} Menu Item
        </h2>
        <p className="text-muted-foreground text-sm">
          Configure your dish details, statuses, and dietary metadata.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* FOOD NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Food</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Truffle Mushroom Risotto"
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
                    placeholder="Briefly describe the ingredients and flavor profile..."
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* PRICE PER UNIT */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
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

            {/* CATEGORY SELECT */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {foodCategories.map(({ type, label }) => {
                        <SelectItem key={type} value={type}>
                          {label}
                        </SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* IMAGE UPLOAD */}
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Food Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files && event.target.files[0];
                      if (file) onChange(file);
                    }}
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="border-muted/60" />

          {/* NEW SECTION: SWITCH CONTROLS */}
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
                    <FormLabel>Item Availability</FormLabel>
                    <FormDescription className="text-xs">
                      Toggle off to temporarily mark this dish as "Sold Out".
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
                    <FormLabel>Chef's Special / Popular</FormLabel>
                    <FormDescription className="text-xs">
                      Highlight this item on your primary customer-facing home
                      page.
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

          {/* NEW SECTION: DIETARY CHECKBOXES */}
          <div className="space-y-3">
            <div>
              <FormLabel className="text-base">
                Dietary & Allergen Tags
              </FormLabel>
              <FormDescription className="text-xs">
                Select all health attributes that apply to this recipe.
              </FormDescription>
            </div>

            <FormField
              control={form.control}
              name="dietaryTags"
              render={() => (
                <FormItem className="grid grid-cols-2 gap-3 sm:grid-cols-3 space-y-0">
                  {DIETARY_OPTIONS.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="dietaryTags"
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
                            <FormLabel className="font-normal cursor-pointer select-none">
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

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium rounded-xl shadow-md"
          >
            Save Food Item
          </Button>
        </form>
      </Form>
    </div>
  );
}
