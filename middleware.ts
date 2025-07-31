import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect the admin route
  if (request.nextUrl.pathname.startsWith("/home/admin")) {
    // In a real app, you'd validate the JWT token here
    // For now, we'll let the client-side component handle the verification
    // since we're using client-side auth context
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/admin/:path*"],
};
