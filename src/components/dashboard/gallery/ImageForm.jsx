"use client";

import { toast } from "sonner";
import {
  createGalleryItem,
  updateGalleryItem,
} from "@/actions/gallery.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
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

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Image name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  image: z.any().optional(), // In a real app, you might validate file type/size here
});

export function ImageForm({ onSuccess, itemData, updateItem }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: itemData?.name || "",
      description: itemData?.description || "",
      category: itemData?.category || "",
      image: null,
    },
  });

  // ... inside your GalleryForm component ...

  async function onSubmit(values) {
    const toastId = toast.loading(
      updateItem
        ? "Updating gallery element..."
        : "Uploading asset to gallery..."
    );

    try {
      const dataPayload = new FormData();
      dataPayload.append("name", values.name);
      dataPayload.append("description", values.description);
      dataPayload.append("category", values.category);

      if (values.image instanceof File) {
        dataPayload.append("image", values.image);
      }

      let result;

      if (updateItem && itemData?.$id) {
        dataPayload.append("existingImageId", itemData.imageId || "");
        dataPayload.append("existingImageUrl", itemData.imageUrl || "");

        result = await updateGalleryItem(itemData.$id, dataPayload);
      } else {
        result = await createGalleryItem(dataPayload);
      }

      if (result.success) {
        toast.success(
          updateItem
            ? "Gallery data saved!"
            : "Showcase photo successfully published!",
          { id: toastId }
        );
        if (onSuccess) onSuccess();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Gallery Submission Error:", error);
      toast.error(error.message || "Could not complete image asset upload.", {
        id: toastId,
      });
    }
  }

  return (
    <div className="max-w-xl p-6  rounded-lg border shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          {" "}
          {updateItem ? "Edit" : "Add"} Image
        </h2>
        <p className="text-muted-foreground text-sm">
          Upload a new photo to your restaurant's gallery.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Interior Dining Area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly describe the image..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <SelectItem value="interior">Interior</SelectItem>
                    <SelectItem value="exterior">Exterior</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
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

          <Button type="submit" className="w-full">
            Save Image
          </Button>
        </form>
      </Form>
    </div>
  );
}
