"use client"
import React, { useEffect, useState } from 'react'
import { isAuthed, clearToken } from '../lib/auth'
import Cookies from 'js-cookie'

export default function MyAccountPage() {
  const [authed, setAuthed] = useState(false)
  const [payload, setPayload] = useState<any>(null)

  useEffect(() => {
    setAuthed(isAuthed())
    try {
      const token = Cookies.get('jwt')
      if (token) {
        const body = token.split('.')[1]
        const json = body ? JSON.parse(atob(body)) : null
        setPayload(json)
      }
    } catch (e) {
      setPayload(null)
    }
  }, [])

  if (!authed) {
    return (
      <div className="card">
        <h2 className="text-lg">Not signed in</h2>
        <a href="/login" className="text-blue-600">Login</a>
      </div>
    )
  }

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
