import { NextResponse, type NextRequest } from "next/server"
import { verifySession } from "@/lib/auth"

export default async function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("admin_session")?.value

  // Protect admin routes - redirect to login if no valid session
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    if (!sessionToken || !verifySession(sessionToken)) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
