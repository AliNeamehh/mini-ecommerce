import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt_decode from 'jwt-decode'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname.startsWith('/admin')) {
    const cookie = req.cookies.get('jwt')
    if (!cookie) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    try {
      const payload: any = jwt_decode(cookie.value)
      if (!payload || payload.role !== 'ADMIN') {
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    } catch (e) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
