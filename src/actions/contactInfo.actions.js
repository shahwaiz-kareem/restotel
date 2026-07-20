"use server";

import { Client, Databases, ID } from "node-appwrite";
import { revalidatePath, updateTag } from "next/cache";

// Initialize Appwrite Server Client using Server Secrets safely hidden from browsers
const client = new Client()
  .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_CONTACTINFO_COLLECTION_ID;

export async function getContactInfo() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(1),
    ]);
    return {
      success: true,
      settings: structuredClone(response?.documents ?? {}),
    };
  } catch (error) {
    console.error("Appwrite Gallery Read Error:", error);
    return { success: false, error: error.message, documents: [] };
  }
  poio;
}

export async function upsertContactInfo(documentId, formData) {
  try {
    const phone = formData.get("phone");
    const whatsapp = formData.get("whatsapp");
    const email = formData.get("email");
    const facebook = formData.get("facebook");
    const instagram = formData.get("instagram");
    const twitter = formData.get("linkedin");

    const updatedDocument = await databases.upsertDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId || ID.unique(),
      {
        phone,
        whatsapp,
        email,
        facebook,
        instagram,
        twitter,
      }
    );

    revalidatePath("/");
    updateTag("contactInfo");
    return { success: true, data: structuredClone(updatedDocument) };
  } catch (error) {
    console.error("Appwrite Gallery Update Error:", error);
    return { success: false, error: error.message };
  }
}
