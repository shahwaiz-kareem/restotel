"use server";

import { Client, Databases, Storage, ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file"; // Official module for server-side file handling
import { revalidatePath } from "next/cache";

// Initialize Appwrite Server Client using Server Secrets safely hidden from browsers
const client = new Client()
  .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_FOODS_COLLECTION_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

export async function createFoodItem(formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const category = formData.get("category");
    const isAvailable = formData.get("isAvailable") === "true";
    const isFeatured = formData.get("isFeatured") === "true";

    const dietaryTagsRaw = formData.get("dietaryTags");
    const dietaryTags = dietaryTagsRaw ? JSON.parse(dietaryTagsRaw) : [];

    const imageFile = formData.get("image");
    let imageId = null;
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      // Official Appwrite Method: Replaces the deprecated hybrid file processor
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
        price,
        category,
        isAvailable,
        isFeatured,
        dietaryTags,
        imageId,
        imageUrl,
      }
    );

    revalidatePath("/");
    return { success: true, data: structuredClone(document) };
  } catch (error) {
    console.error("Appwrite Create Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateFoodItem(documentId, formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const category = formData.get("category");
    const isAvailable = formData.get("isAvailable") === "true";
    const isFeatured = formData.get("isFeatured") === "true";

    const dietaryTagsRaw = formData.get("dietaryTags");
    const dietaryTags = dietaryTagsRaw ? JSON.parse(dietaryTagsRaw) : [];

    let imageId = formData.get("existingImageId") || null;
    let imageUrl = formData.get("existingImageUrl") || null;
    const newImageFile = formData.get("image");

    if (newImageFile && newImageFile.size > 0) {
      if (imageId) {
        try {
          await storage.deleteFile(BUCKET_ID, imageId);
        } catch (e) {
          console.warn(
            "Old file asset missing from engine. Proceeding safely.",
            e
          );
        }
      }

      // Official Appwrite Method implementation
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
        price,
        category,
        isAvailable,
        isFeatured,
        dietaryTags,
        imageId,
        imageUrl,
      }
    );

    revalidatePath("/");
    return { success: true, data: structuredClone(updatedDocument) };
  } catch (error) {
    console.error("Appwrite Update Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteFoodItem(documentId, imageId) {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);

    if (imageId) {
      try {
        await storage.deleteFile(BUCKET_ID, imageId);
      } catch (fileErr) {
        console.error(
          "Record wiped, but storage binary asset removal failed:",
          fileErr
        );
      }
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Appwrite Delete Error:", error);
    return { success: false, error: error.message };
  }
}
