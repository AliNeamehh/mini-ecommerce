"use client"
import React, { useState } from 'react'
import { register } from '../lib/api'
import { useRouter } from 'next/navigation'
import Button from '../components/ui/button'
import Input from '../components/ui/input'
import { registerSchema } from '../lib/validators'
import { useToast } from '../components/Toaster'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) return setError('Passwords do not match')
    const ok = registerSchema.safeParse({ name: username, email: username, password, confirm })
    if (!ok.success) return setError(ok.error.errors.map((x) => x.message).join(', '))
    try {
      setError(null)
  await register({ name: username, email: username, password })
      router.push('/login')
    } catch (err: any) {
      setError(err.message || 'Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-semibold">Register</h2>
      <form onSubmit={onSubmit} className="mt-4">
        <Input className="mb-2" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} placeholder="Name / Email" />
        <Input type="password" className="mb-2" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" />
        <Input type="password" className="mb-2" value={confirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)} placeholder="Confirm password" />
        <Button className="w-full" type="submit">Register</Button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  )
}
