import { cacheLife, cacheTag } from "next/cache";

export async function fetchSettings() {
  "use cache";
  cacheLife("max");
  cacheTag("settings");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/settings`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch settings: ${response.statusText}`);
    }
    const settings = await response.json();
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}

export async function fetchContactInfo() {
  "use cache";
  cacheLife("max");
  cacheTag("contactInfo");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/contact-info`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch contactInfo: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
}
export async function fetchFoods() {
  "use cache";
  cacheLife("max");
  cacheTag("contactInfo");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/menu`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch foods: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
}

export async function fetchRooms() {
  "use cache";
  cacheLife("max");
  cacheTag("contactInfo");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/rooms`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch rooms: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
}

export async function fetchGallery() {
  "use cache";
  cacheLife("max");
  cacheTag("contactInfo");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/gallery`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch gallery: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    throw error;
  }
}
