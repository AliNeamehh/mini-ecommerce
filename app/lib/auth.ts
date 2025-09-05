import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export function setToken(token: string) {
  Cookies.set('jwt', token, { path: '/', sameSite: 'lax' })
  try {
    if (typeof window !== 'undefined') {
      // store a sessionStorage fallback so client code can read token when cookie is not readable
      try {
        sessionStorage.setItem('jwt', token)
        // derive role from token payload (backend uses a `roles` array like ['ROLE_ADMIN'])
        const payload = jwt_decode(token) as JwtPayload
        let derived: string | null = null
        if (payload) {
          if (Array.isArray(payload.roles) && payload.roles.length > 0) {
            // look for ROLE_ADMIN (or ADMIN)
            const r = payload.roles.find((x) => /ADMIN/i.test(x))
            derived = r ? 'ADMIN' : 'USER'
          } else if (payload.role) {
            derived = /admin/i.test(payload.role) ? 'ADMIN' : 'USER'
          }
        }
        if (derived) sessionStorage.setItem('auth_role', derived)
      } catch (e) {
        // ignore storage errors
      }
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { authed: true } }))
    }
  } catch (e) {
    // no-op
  }
}

export function clearToken() {
  Cookies.remove('jwt', { path: '/' })
  try {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('jwt')
        sessionStorage.removeItem('auth_role')
      } catch (e) {}
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { authed: false } }))
    }
  } catch (e) {
    // no-op
  }
}

type JwtPayload = { sub?: string; role?: string; roles?: string[]; username?: string; exp?: number }

export function getRoleFromToken(token?: string): 'ADMIN' | 'USER' | null {
  try {
  // prefer explicitly provided token, then cookie, then sessionStorage fallback
  let t = token || Cookies.get('jwt')
  if (!t && typeof window !== 'undefined') t = sessionStorage.getItem('jwt') || undefined
    if (!t) return null
  const payload = jwt_decode(t) as JwtPayload
    if (!payload) return null
    // prefer an explicit single role claim
    if (payload.role) return /admin/i.test(payload.role) ? 'ADMIN' : 'USER'
    // check array claim `roles` (e.g. ['ROLE_ADMIN'])
    if (Array.isArray(payload.roles) && payload.roles.length > 0) {
      const found = payload.roles.find((r) => /ADMIN/i.test(r))
      return found ? 'ADMIN' : 'USER'
    }
    // fallback to sessionStorage cached role
    try {
      if (typeof window !== 'undefined') {
        const r = window.sessionStorage.getItem('auth_role')
        if (r === 'ADMIN' || r === 'USER') return r as 'ADMIN' | 'USER'
      }
    } catch (e) {}
    return null
  } catch (e) {
    return null
  }
}

export function isAuthed(): boolean {
  try {
  let t = Cookies.get('jwt')
  if (!t && typeof window !== 'undefined') t = sessionStorage.getItem('jwt') || undefined
  if (!t) return false
  const payload = jwt_decode(t) as JwtPayload
    if (!payload || !payload.exp) return true
    return payload.exp * 1000 > Date.now()
  } catch (e) {
    return false
  }
}
