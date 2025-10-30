import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This is a client-side auth check, so we'll let the pages handle redirects
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/settings"],
}
