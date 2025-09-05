import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt_decode from 'jwt-decode'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname.startsWith('/admin')) {
    const cookie = req.cookies.get('jwt')
    console.debug('[middleware] admin path hit, cookie present=', !!cookie)
    if (!cookie) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    try {
      const payload: any = jwt_decode(cookie.value)
      console.debug('[middleware] jwt payload keys=', Object.keys(payload || {}).join(','), 'role=', payload?.role, 'roles=', payload?.roles)
      const isAdmin = (() => {
        if (!payload) return false
        if (payload.role && /admin/i.test(String(payload.role))) return true
        if (Array.isArray(payload.roles) && payload.roles.length > 0) {
          return payload.roles.some((r: string) => /admin/i.test(String(r)))
        }
        return false
      })()
      console.debug('[middleware] isAdmin=', isAdmin)
      if (!isAdmin) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    } catch (e) {
      console.debug('[middleware] jwt decode error', e && String(e))
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
