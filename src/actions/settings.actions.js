"use server";

import { Client, Databases, Storage, ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { revalidatePath, updateTag } from "next/cache";

const client = new Client()
  .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_SETTINGS_COLLECTION_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

export async function upsertSettings(formData) {
  try {
    const documentId = formData.get("documentId");

    // Parse Text & Colors
    const brandName = formData.get("brandName");
    const brandColor = formData.get("brandColor");
    const heroTitle = formData.get("heroTitle");
    const heroSubtext = formData.get("heroSubtext");

    // Parse Booleans
    const enableRooms = formData.get("enableRooms") === "true";
    const enableGallery = formData.get("enableGallery") === "true";
    const enableMenu = formData.get("enableMenu") === "true";
    const isDarkMode = formData.get("isDarkMode") === "true";

    async function processFile(fileField, existingIdField) {
      const file = formData.get(fileField);
      const existingId = formData.get(existingIdField) || null;

      let finalId = existingId;
      let finalUrl = existingId
        ? `${process.env.NEXT_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${existingId}/view?project=${process.env.NEXT_APPWRITE_PROJECT_ID}`
        : null;

      if (file && file.size > 0) {
        if (existingId) {
          try {
            await storage.deleteFile(BUCKET_ID, existingId);
          } catch (e) {
            console.warn(
              `Orphaned asset ${existingId} missing. Proceeding.`,
              e
            );
          }
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const parsedInputFile = InputFile.fromBuffer(buffer, file.name);

        const appwriteFile = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          parsedInputFile
        );
        finalId = appwriteFile.$id;
        finalUrl = `${process.env.NEXT_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${finalId}/view?project=${process.env.NEXT_APPWRITE_PROJECT_ID}`;
      }

      return { id: finalId, url: finalUrl };
    }

    // Process all media streams
    const videoData = await processFile("heroVideo", "existingVideoId");
    const logoData = await processFile("logo", "existingLogoId");
    const faviconData = await processFile("favicon", "existingFaviconId");

    const payload = {
      brandName,
      brandColor,
      heroTitle,
      heroSubtext,
      enableRooms,
      enableGallery,
      enableMenu,
      isDarkMode,
      videoId: videoData.id,
      videoUrl: videoData.url,
      logoId: logoData.id,
      logoUrl: logoData.url,
      faviconId: faviconData.id,
      faviconUrl: faviconData.url,
    };

    let updatedDocument;

    // Explicit Create vs Update routing since upsert is not a native Appwrite SDK database function
    if (documentId && documentId !== "undefined" && documentId !== "null") {
      updatedDocument = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
        payload
      );
    } else {
      updatedDocument = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        payload
      );
    }

    revalidatePath("/");
    updateTag("settings");
    return { success: true, data: structuredClone(updatedDocument) };
  } catch (error) {
    console.error("Appwrite Settings Update Error:", error);
    return { success: false, error: error.message };
  }
}
