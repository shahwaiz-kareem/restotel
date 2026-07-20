"use server";

import { Client, Databases, Storage, ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file"; // Official module for server-side binary processing
import { revalidatePath } from "next/cache";

// Initialize Appwrite Server Client using Server Secrets safely hidden from browsers
const client = new Client()
  .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_ROOM_COLLECTION_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

export async function createRoomItem(formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const pricePerNight = parseFloat(formData.get("pricePerNight"));
    const roomType = formData.get("roomType");
    const maxOccupancy = parseInt(formData.get("maxOccupancy"), 10);
    const isAvailable = formData.get("isAvailable") === "true";
    const isFeatured = formData.get("isFeatured") === "true";

    const amenitiesRaw = formData.get("amenities");
    const amenities = amenitiesRaw ? JSON.parse(amenitiesRaw) : [];

    const imageFile = formData.get("image");
    let imageId = null;
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      // Convert incoming web streams securely to system buffers
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const parsedInputFile = InputFile.fromBuffer(buffer, imageFile.name);

      const appwriteFile = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        parsedInputFile
      );

      imageId = appwriteFile.$id;
      imageUrl = `${process.env.NEXT_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${imageId}/view?project=${process.env.NEXT_APPWRITE_PROJECT_ID}`;
    }

    const document = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        name,
        description,
        pricePerNight,
        roomType,
        maxOccupancy,
        isAvailable,
        isFeatured,
        amenities,
        imageId,
        imageUrl,
      }
    );

    revalidatePath("/");

    return { success: true, data: structuredClone(document) };
  } catch (error) {
    console.error("Appwrite Room Create Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateRoomItem(documentId, formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const pricePerNight = parseFloat(formData.get("pricePerNight"));
    const roomType = formData.get("roomType");
    const maxOccupancy = parseInt(formData.get("maxOccupancy"), 10);
    const isAvailable = formData.get("isAvailable") === "true";
    const isFeatured = formData.get("isFeatured") === "true";

    const amenitiesRaw = formData.get("amenities");
    const amenities = amenitiesRaw ? JSON.parse(amenitiesRaw) : [];

    let imageId = formData.get("existingImageId") || null;
    let imageUrl = formData.get("existingImageUrl") || null;
    const newImageFile = formData.get("image");

    if (newImageFile && newImageFile.size > 0) {
      // Purge historical storage assets clean to eliminate orphan storage files
      if (imageId) {
        try {
          await storage.deleteFile(BUCKET_ID, imageId);
        } catch (e) {
          console.warn(
            "Stale image file target missing from storage bucket engine.",
            e
          );
        }
      }

      const arrayBuffer = await newImageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const parsedInputFile = InputFile.fromBuffer(buffer, newImageFile.name);

      const appwriteFile = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        parsedInputFile
      );

      imageId = appwriteFile.$id;
      imageUrl = `${process.env.NEXT_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${imageId}/view?project=${process.env.NEXT_APPWRITE_PROJECT_ID}`;
    }

    const updatedDocument = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId,
      {
        name,
        description,
        pricePerNight,
        roomType,
        maxOccupancy,
        isAvailable,
        isFeatured,
        amenities,
        imageId,
        imageUrl,
      }
    );

    revalidatePath("/");

    return { success: true, data: structuredClone(updatedDocument) };
  } catch (error) {
    console.error("Appwrite Room Update Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteRoomItem(documentId, imageId) {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);

    if (imageId) {
      try {
        await storage.deleteFile(BUCKET_ID, imageId);
      } catch (fileErr) {
        console.error(
          "Document dropped, but cascading storage engine asset cleanup failed:",
          fileErr
        );
      }
    }

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Appwrite Room Delete Error:", error);
    return { success: false, error: error.message };
  }
}
