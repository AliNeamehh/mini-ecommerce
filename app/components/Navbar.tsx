"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '../store/cart'
import { isAuthed, clearToken } from '../lib/auth'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const count = useCart((s) => s.count())
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const auth = require('../lib/auth')
      setAuthed(!!auth.isAuthed())
      setRole(auth.getRoleFromToken())
    } catch (e) {
      setAuthed(false)
      setRole(null)
    }

    function onAuthChange(e: Event) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const auth = require('../lib/auth')
        setAuthed(!!auth.isAuthed())
        setRole(auth.getRoleFromToken())
      } catch (err) {
        setAuthed(false)
        setRole(null)
      }
    }
    window.addEventListener('auth-change', onAuthChange)
    return () => window.removeEventListener('auth-change', onAuthChange)
  }, [])
  return (
    <header className="border-b bg-white">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="brand">MiniShop</Link>
          <nav className="flex items-center gap-4 text-gray-700">
            <Link href="/">Shop</Link>
            <Link href="/cart" className="relative">Cart <span className="ml-2 inline-block bg-blue-600 text-white px-2 rounded-full text-sm">{mounted ? count : ''}</span></Link>
            {role === 'ADMIN' && (
              <>
                <Link href="/admin/orders">Orders</Link>
                <Link href="/admin/products">Products</Link>
                <Link href="/admin/low-stock">Low stock</Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          {authed ? (
            <button
              onClick={() => {
                // clear client token and update local state so UI reflects logout immediately
                clearToken()
                setAuthed(false)
                setRole(null)
                router.push('/')
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register" className="ml-2">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
