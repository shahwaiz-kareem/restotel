"use server";

import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

async function getAdminSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_APPWRITE_PROJECT_ID);

  const cookieStore = await cookies();

  // Locate the Appwrite native session cookie
  const cookieName = `a_session_${process.env.NEXT_APPWRITE_PROJECT_ID.toLowerCase()}`;
  const sessionCookie = cookieStore.get(cookieName);

  if (!sessionCookie || !sessionCookie.value) {
    throw new Error("Unauthorized. Active admin session not found.");
  }

  // Hydrate the SDK client with the incoming session token
  client.setSession(sessionCookie.value);

  return {
    account: new Account(client),
  };
}

export async function loginAdmin(email, password) {
  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  try {
    // 1. Initialize the Appwrite Client
    const client = new Client()
      .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const account = new Account(client);

    // 2. Create the Session
    const session = await account.createEmailPasswordSession(email, password);

    // 3. Store the Appwrite session securely in Next.js cookies
    // Appwrite looks for a specific cookie format: a_session_[project_id]
    const cookieName = `a_session_${process.env.NEXT_APPWRITE_PROJECT_ID.toLowerCase()}`;
    const cookieStore = await cookies();

    cookieStore.set(cookieName, session.secret, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 1 month
    });

    return { success: true };
  } catch (error) {
    console.error("Admin Login Error:", error);
    return {
      success: false,
      error: error.message || "Invalid admin credentials.",
    };
  }
}

export async function updateAdminPassword(currentPassword, newPassword) {
  if (!currentPassword || !newPassword) {
    return {
      success: false,
      error: "Both current and new passwords are required.",
    };
  }

  try {
    // 1. Initialize the authenticated session context
    const { account } = await getAdminSessionClient();

    await account.updatePassword({
      password: newPassword,
      oldPassword: currentPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("Appwrite Password Update Error:", error);

    return {
      success: false,
      error: error.message || "Failed to update security credentials.",
    };
  }
}
