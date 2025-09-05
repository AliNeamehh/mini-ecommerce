"use client"
import React, { useState } from 'react'
import { login } from '../lib/api'
import { setToken } from '../lib/auth'
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
      const r = await login({ email: username, password })
      setToken(r.token)
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-semibold">Login</h2>
      <form onSubmit={onSubmit} className="mt-4">
  <Input className="mb-2" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} placeholder="Email" />
  <Input type="password" className="mb-2" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" />
        <Button className="w-full" type="submit">Login</Button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      <div className="mt-4 text-sm">No account? <a href="/register" className="text-blue-600">Register</a></div>
    </div>
  )
}
