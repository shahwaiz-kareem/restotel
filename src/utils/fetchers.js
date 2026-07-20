import { cacheLife, cacheTag } from "next/cache";

import { Client, Databases, Query } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

export async function fetchSettings() {
  "use cache";
  cacheLife("max");
  cacheTag("settings");

  const COLLECTION_ID = process.env.APPWRITE_SETTINGS_COLLECTION_ID;
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(1),
    ]);

    return {
      success: true,
      settings: structuredClone(response?.documents[0] ?? {}),
    };
  } catch (error) {
    console.error("Appwrite Settings Read Error:", error);
    return {
      success: false,
      error: error.message,
      settings: {},
      total: 0,
    };
  }
}

export async function fetchContactInfo() {
  "use cache";
  cacheLife("max");
  cacheTag("contactInfo");

  const COLLECTION_ID = process.env.APPWRITE_CONTACTINFO_COLLECTION_ID;
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(1),
    ]);

    return {
      success: true,
      contactInfo: structuredClone(response?.documents[0] ?? {}),
    };
  } catch (error) {
    console.error("Appwrite Gallery Read Error:", error);
    return {
      success: false,
      error: error.message,
      contactInfo: {},
    };
  }
}
export async function fetchFoods({ page, limit, category = "all" }) {
  const COLLECTION_ID = process.env.APPWRITE_FOODS_COLLECTION_ID;

  try {
    const categoryFilter = category === "all" ? [] : [category];
    const offset = (page - 1) * limit;

    const queries = [
      Query.orderDesc("$createdAt"),
      Query.orderAsc("isFeatured", true),
      Query.limit(limit),
      Query.offset(offset),
    ];

    if (category !== "all")
      queries.push(Query.equal("category", categoryFilter));

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      queries
    );

    return {
      success: true,
      documents: structuredClone(response?.documents ?? []),
      total: response?.total ?? 0, // <--- Crucial line to fix the NaN bug
    };
  } catch (error) {
    console.error("Appwrite Gallery Read Error:", error);
    return {
      success: false,
      error: error.message,
      documents: [],
      total: 0,
    };
  }
}

export async function fetchRooms({ page, limit, category = "all" }) {
  const COLLECTION_ID = process.env.APPWRITE_ROOM_COLLECTION_ID;

  try {
    const categoryFilter = category === "all" ? [] : [category];

    const offset = (page - 1) * limit;
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.orderAsc("isFeatured", true),
      Query.limit(limit),
      Query.offset(offset),
    ];

    if (category !== "all")
      queries.push(Query.equal("roomType", categoryFilter));

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      queries
    );

    return {
      success: true,
      documents: structuredClone(response?.documents ?? []),
      total: response?.total ?? 0,
    };
  } catch (error) {
    console.error("Appwrite Rooms Read Error:", error);
    return {
      success: false,
      error: error.message,
      documents: [],
      total: 0,
    };
  }
}

export async function fetchGallery({ page, limit, category = "all" }) {
  const COLLECTION_ID = process.env.APPWRITE_GALLERY_COLLECTION_ID;

  try {
    const categoryFilter = category === "all" ? [] : [category];

    const offset = (page - 1) * limit;
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.limit(limit),
      Query.offset(offset),
    ];

    if (category !== "all")
      queries.push(Query.equal("category", categoryFilter));

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      queries
    );

    return {
      success: true,
      documents: structuredClone(response?.documents ?? []),
      total: response?.total ?? 0,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      documents: [],
      total: 0,
    };
  }
}
