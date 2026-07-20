import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only run this logic on /admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Check for the Appwrite session cookie
    const projectId = process.env.NEXT_APPWRITE_PROJECT_ID?.toLowerCase();
    const sessionCookie = request.cookies.get(`a_session_${projectId}`);

    // If the cookie is missing, immediately redirect back to the login page
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// Optimize middleware to only trigger on admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
