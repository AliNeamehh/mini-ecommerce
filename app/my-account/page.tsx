import React from 'react'
import { isAuthed, clearToken } from '../lib/auth'
import Cookies from 'js-cookie'

export default function MyAccountPage() {
  const token = Cookies.get('jwt')
  if (!isAuthed()) {
    return (
      <div className="card">
        <h2 className="text-lg">Not signed in</h2>
        <a href="/login" className="text-blue-600">Login</a>
      </div>
    )
  }
  let payload: any = null
  try { payload = token ? JSON.parse(atob(token.split('.')[1])) : null } catch(e) { payload = null }
  return (
    <div className="card">
      <h2 className="text-lg">My account</h2>
      <div className="mt-2">Username: {payload?.username}</div>
      <div>Role: {payload?.role}</div>
      <div>Expires: {payload?.exp ? new Date(payload.exp * 1000).toLocaleString() : 'n/a'}</div>
      <button className="button-primary mt-4" onClick={() => { clearToken(); window.location.href = '/' }}>Logout</button>
    </div>
  )
}
