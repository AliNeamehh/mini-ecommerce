"use client"
import React from 'react'
import Link from 'next/link'
import { useCart } from '../store/cart'
import { isAuthed, clearToken } from '../lib/auth'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const count = useCart((s) => s.count())
  const router = useRouter()
  const authed = isAuthed()
  return (
    <header className="border-b bg-white">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="brand">MiniShop</Link>
          <nav className="flex items-center gap-4 text-gray-700">
            <Link href="/">Shop</Link>
            <Link href="/cart" className="relative">Cart <span className="ml-2 inline-block bg-blue-600 text-white px-2 rounded-full text-sm">{count}</span></Link>
            <Link href="/admin" className="">Admin</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          {authed ? (
            <button
              onClick={() => {
                clearToken()
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
