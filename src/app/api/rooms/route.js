import { Client, Databases, Query } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_ROOM_COLLECTION_ID;

export async function GET(request) {
  try {
    // Calculate skip offset for Appwrite queries
    const searchParams = request?.nextUrl?.searchParams;

    const page = searchParams.get("page") ?? 1;
    const limit = searchParams.get("limit") ?? 6;

    const category = searchParams.get("category") ?? "all";
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

    return Response.json({
      success: true,
      documents: structuredClone(response?.documents ?? []),
      total: response?.total ?? 0,
    });
  } catch (error) {
    console.error("Appwrite Rooms Read Error:", error);
    return Response.json({
      success: false,
      error: error.message,
      documents: [],
      total: 0,
    });
  }
}
