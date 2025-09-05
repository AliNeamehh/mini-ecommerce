import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export function setToken(token: string) {
  Cookies.set('jwt', token, { path: '/', sameSite: 'lax' })
  try {
    if (typeof window !== 'undefined') {
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
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { authed: false } }))
    }
  } catch (e) {
    // no-op
  }
}

type JwtPayload = { sub?: string; role?: string; username?: string; exp?: number }

export function getRoleFromToken(token?: string): 'ADMIN' | 'USER' | null {
  try {
    const t = token || Cookies.get('jwt')
    if (!t) return null
  const payload = jwt_decode(t) as JwtPayload
    if (!payload || !payload.role) return null
    return (payload.role as 'ADMIN' | 'USER') || null
  } catch (e) {
    return null
  }
}

export function isAuthed(): boolean {
  try {
    const t = Cookies.get('jwt')
    if (!t) return false
  const payload = jwt_decode(t) as JwtPayload
    if (!payload || !payload.exp) return true
    return payload.exp * 1000 > Date.now()
  } catch (e) {
    return false
  }
}
