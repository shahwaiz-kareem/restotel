import { Client, Databases, Query } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_SETTINGS_COLLECTION_ID;

export async function GET() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(1),
    ]);

    return Response.json({
      success: true,
      settings: structuredClone(response?.documents[0] ?? {}),
    });
  } catch (error) {
    console.error("Appwrite Settings Read Error:", error);
    return Response.json({
      success: false,
      error: error.message,
      settings: {},
      total: 0,
    });
  }
}
