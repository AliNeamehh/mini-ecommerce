import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt_decode from 'jwt-decode'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname.startsWith('/admin')) {
    const cookie = req.cookies.get('jwt')
    // debug: log whether cookie exists (do not log token contents in prod)
    // eslint-disable-next-line no-console
    console.debug('[middleware] admin path hit, cookie present=', !!cookie)
    if (!cookie) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    try {
      const payload: any = jwt_decode(cookie.value)
      // debug: show roles/role presence
      // eslint-disable-next-line no-console
      console.debug('[middleware] jwt payload keys=', Object.keys(payload || {}).join(','), 'role=', payload?.role, 'roles=', payload?.roles)
      // Accept either a single `role` claim or an array `roles` (e.g. ['ROLE_ADMIN'])
      const isAdmin = (() => {
        if (!payload) return false
        if (payload.role && /admin/i.test(String(payload.role))) return true
        if (Array.isArray(payload.roles) && payload.roles.length > 0) {
          return payload.roles.some((r: string) => /admin/i.test(String(r)))
        }
        return false
      })()
      // eslint-disable-next-line no-console
      console.debug('[middleware] isAdmin=', isAdmin)
      if (!isAdmin) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.debug('[middleware] jwt decode error', e && String(e))
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
