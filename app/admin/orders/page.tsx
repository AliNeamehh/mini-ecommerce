"use client"
import React, { useEffect, useState } from 'react'
import { getAdminOrders } from '../../lib/api'

type OrderItem = { name: string; quantity: number }
type OrderRow = { id: number; createdAt: string; items: OrderItem[]; totalAmount: number }

export default function AdminOrdersPage() {
  const [rows, setRows] = useState<OrderRow[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getAdminOrders()
      .then((r) => mounted && setRows(r))
      .catch((e) => mounted && setError(e.message || 'Failed to load orders'))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="card">Loading...</div>
  if (error) return <div className="card text-red-600">{error}</div>
  if (!rows || rows.length === 0) return <div className="card">No orders</div>

  const filtered = filter ? rows.filter((o) => String(o.id).includes(filter)) : rows

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="mt-3 mb-2">
        <div className="flex gap-2">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by ID"
            className="input"
          />
          <button onClick={() => setFilter('')} className="btn">Clear</button>
        </div>
      </div>

      <table className="w-full mt-4 table-auto border-collapse">
        <thead>
          <tr>
            <th className="text-left py-2 border-b">ID</th>
            <th className="text-left py-2 border-b">Created</th>
            <th className="text-left py-2 border-b">Items</th>
            <th className="text-left py-2 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="py-2">{r.id}</td>
              <td className="py-2">{new Date(r.createdAt).toLocaleString()}</td>
              <td className="py-2">
                <ul className="list-disc pl-5 m-0">
                  {r.items && r.items.length > 0 ? (
                    r.items.map((it, i) => (
                      <li key={i} className="my-0">{it.name} × {it.quantity}</li>
                    ))
                  ) : (
                    <li className="my-0">-</li>
                  )}
                </ul>
              </td>
              <td className="py-2">${(Number(r.totalAmount) || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}