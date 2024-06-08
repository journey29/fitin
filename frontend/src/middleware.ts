import { NextRequest, NextResponse } from "next/server"

import { DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes"
import { Tokens } from "./types"

export async function middleware(request: NextRequest) {
  const { url, cookies } = request

  const parsedUrl = new URL(url)
  const pathname = parsedUrl.pathname

  const authRoute = url.includes("/auth")
  const isPublicRoute = publicRoutes.includes(pathname)

  const refreshToken = cookies.get(Tokens.REFRESHTOKEN)?.value

  if (authRoute && refreshToken) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, url))
  }

  if (authRoute) {
    return NextResponse.next()
  }

  if (!isPublicRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
