"use client"
import React, { useState } from 'react'
import { login } from '../lib/api'
import { setToken, clearToken } from '../lib/auth'
import { useRouter } from 'next/navigation'
import Button from '../components/ui/button'
import Input from '../components/ui/input'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(null)
      // Clear any existing jwt cookie (stale or malformed) before login
      clearToken()
      const r = await login({ email: username, password })
  // login() now throws if token is invalid; still be defensive here
  const token = typeof r === 'string' ? r : (r && (r as any).token) ? (r as any).token : ''
  if (!token) throw new Error('Login failed (no token)')
  setToken(token)
  router.push('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 text-center">Login</h2>
        <form onSubmit={onSubmit} className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input className="w-full rounded-md border px-3 py-2 mb-4" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} placeholder="you@example.com" />

          <label className="block text-sm font-medium text-gray-700">Password</label>
          <Input type="password" className="w-full rounded-md border px-3 py-2 mb-4" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" />

          <button type="submit" className="w-full rounded-lg bg-black text-white py-2 text-sm font-semibold hover:bg-gray-800">Login</button>

          {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}

          <div className="mt-4 text-center text-sm text-gray-600">No account? <a href="/register" className="text-black font-medium">Register</a></div>
        </form>
      </div>
    </div>
  )
}
