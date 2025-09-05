import React from 'react'
import { getLowStock } from '../../lib/api'

export default async function LowStockPage() {
  const items = await getLowStock()
  if (!items || items.length === 0) return <div className="card">All good — no low stock</div>
  return (
    <div>
      <h1 className="text-2xl font-bold">Low stock</h1>
      <ul className="mt-4 space-y-2">
        {items.map((p) => (
          <li key={p.id} className="flex justify-between">
            <span>{p.name}</span>
            <span className={p.stockQuantity < 3 ? 'text-red-600' : p.stockQuantity < 5 ? 'text-amber-600' : ''}>{p.stockQuantity}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
