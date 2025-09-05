"use client"
import React, { useState } from 'react'
import { register, login } from '../lib/api'
import { useRouter } from 'next/navigation'
import Button from '../components/ui/button'
import Input from '../components/ui/input'
import { registerSchema } from '../lib/validators'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) return setError('Passwords do not match')
    const ok = registerSchema.safeParse({ name, email, password, confirm })
    if (!ok.success) return setError(ok.error.errors.map((x) => x.message).join(', '))
    try {
      setError(null)
      await register({ name, email, password })
      // Auto-login after successful registration
      try {
        await login({ email, password })
        router.push('/')
        return
      } catch (loginErr: any) {
        // If auto-login fails, fall back to the login page
        console.debug('Auto-login failed after register:', loginErr)
        router.push('/login')
        return
      }
    } catch (err: any) {
      setError(err.message || 'Register failed')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 text-center">Register</h2>
        <form onSubmit={onSubmit} className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input className="w-full rounded-md border px-3 py-2 mb-2" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="Full name" />

          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input type="email" className="w-full rounded-md border px-3 py-2 mb-4" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="you@example.com" />

          <label className="block text-sm font-medium text-gray-700">Password</label>
          <Input type="password" className="w-full rounded-md border px-3 py-2 mb-4" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" />

          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <Input type="password" className="w-full rounded-md border px-3 py-2 mb-4" value={confirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)} placeholder="Confirm password" />

          <button type="submit" className="w-full rounded-lg bg-black text-white py-2 text-sm font-semibold hover:bg-gray-800">Register</button>

          {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}

          <div className="mt-4 text-center text-sm text-gray-600">Already have an account? <a href="/login" className="text-black font-medium">Login</a></div>
        </form>
      </div>
    </div>
  )
}
