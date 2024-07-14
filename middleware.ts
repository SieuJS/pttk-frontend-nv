import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/dashboard', '/payment' , '/hiring-sheet', '/regis-sheet' ]
const authPaths = ['/signin']

const productEditRegex = /^\/products\/\d+\/edit$/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('sessionToken')?.value
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  else if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/:path*']
}
