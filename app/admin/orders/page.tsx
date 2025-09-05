import React from 'react'

type OrderItem = { name: string; quantity: number }
type OrderRow = { id: number; createdAt: string; items: OrderItem[]; totalAmount: number }

async function fetchOrders(cookieHeader?: string): Promise<OrderRow[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE || '/api'
  const res = await fetch(`${base}/orders`, {
    method: 'GET',
    credentials: 'include',
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  })
  if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`)
  const data = await res.json()
  // assume backend returns array
  return data as OrderRow[]
}

export default async function AdminOrdersPage({ searchParams }: { searchParams?: { q?: string } }) {
  // Server-side fetch so cookies are forwarded by Next automatically in production
  const orders = await fetchOrders()

  if (!orders || orders.length === 0) {
    return <div className="card">No orders found</div>
  }

  // optional query filtering on server (by id)
  const q = searchParams?.q?.trim() || ''
  const filtered = q ? orders.filter((o) => String(o.id) === q) : orders

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <div className="mt-3 mb-2">
        <form method="GET" className="flex gap-2">
          <input name="q" placeholder="Search by ID" defaultValue={q} className="input" />
          <button className="btn">Search</button>
        </form>
      </div>

      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Created</th>
            <th className="text-left">Items</th>
            <th className="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="border-t align-top">
              <td className="py-2">{r.id}</td>
              <td className="py-2">{new Date(r.createdAt).toLocaleString()}</td>
              <td className="py-2">
                <ul className="list-disc pl-5">
                  {r.items && r.items.length > 0 ? (
                    r.items.map((it, i) => (
                      <li key={i}>
                        {it.name} × {it.quantity}
                      </li>
                    ))
                  ) : (
                    <li>-</li>
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
