"use client"
import React, { useEffect, useState } from 'react'
import { getLowStock } from '../../lib/api'

export default function LowStockPage() {
  const [items, setItems] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getLowStock()
      .then((r) => mounted && setItems(r))
      .catch((e) => mounted && setError(e.message || 'Failed to load'))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className="card">Loading...</div>
  if (error) return <div className="card text-red-600">{error}</div>
  if (!items || items.length === 0) return <div className="card">All good — no low stock</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Low stock</h1>
      <ul className="mt-4 space-y-2">
        {items.map((p) => {
          const cls = p.stockQuantity < 3 ? 'text-red-600' : p.stockQuantity < 5 ? 'text-amber-600' : ''
          return (
            <li key={p.id} className="flex justify-between">
              <span>{p.name}</span>
              <span className={cls}>{p.stockQuantity}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
