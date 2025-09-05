import React from 'react'
import { getAdminOrders } from '../../lib/api'

export default async function AdminOrdersPage() {
  const rows = await getAdminOrders()
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
          {rows.map((r) => (
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
