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
const COLLECTION_ID = process.env.APPWRITE_GALLERY_COLLECTION_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

export async function createGalleryItem(formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const imageFile = formData.get("image");
    const category = formData.get("category");

    let imageId = null;
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      // Official Appwrite Method: Safely streams file data from memory buffers
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
        category,
        imageId,
        imageUrl,
      }
    );

    revalidatePath("/"); // Wipe router edge cache instantly
    return { success: true, data: structuredClone(document) };
  } catch (error) {
    console.error("Appwrite Gallery Create Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateGalleryItem(documentId, formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");

    let imageId = formData.get("existingImageId") || null;
    let imageUrl = formData.get("existingImageUrl") || null;
    const newImageFile = formData.get("image");

    if (newImageFile && newImageFile.size > 0) {
      // Avoid accumulating orphan asset binaries in your bucket storage
      if (imageId) {
        try {
          await storage.deleteFile(BUCKET_ID, imageId);
        } catch (e) {
          console.warn(
            "Previous file asset missing from engine. Proceeding safely.",
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
        imageId,
        category,
        imageUrl,
      }
    );

    revalidatePath("/");
    return { success: true, data: structuredClone(updatedDocument) };
  } catch (error) {
    console.error("Appwrite Gallery Update Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteGalleryItem(documentId, imageId) {
  try {
    // 1. Wipe the contextual entry from the database collection
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);

    // 2. Cascade delete file asset out of Storage completely
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
    console.error("Appwrite Gallery Delete Error:", error);
    return { success: false, error: error.message };
  }
}
