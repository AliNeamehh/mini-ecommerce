"use client"
import React, { useEffect, useState } from 'react'
import { getAdminOrders } from '../../lib/api'

export default function AdminOrdersPage() {
  const [rows, setRows] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    getAdminOrders()
      .then((r) => mounted && setRows(r))
      .catch((e) => mounted && setError(e.message || 'Failed to load'))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className="card">Loading...</div>
  if (error) return <div className="card text-red-600">{error}</div>
  if (!rows || rows.length === 0) return <div className="card">No orders</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created</th>
            <th>User</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any) => (
            <tr key={r.id} className="border-t">
              <td>{r.id}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td>{r.userName}</td>
              <td>{r.status}</td>
              <td>${r.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
