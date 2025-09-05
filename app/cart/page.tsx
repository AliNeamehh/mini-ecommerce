"use client"
import React, { useState } from 'react'
import { useCart } from '../store/cart'
import { placeOrder } from '../lib/api'
import { useToast } from '../components/Toaster'

export default function CartPage() {
  const lines = useCart((s) => s.lines)
  const updateQty = useCart((s) => s.updateQty)
  const remove = useCart((s) => s.remove)
  const clear = useCart((s) => s.clear)
  const total = useCart((s) => s.total())
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  if (lines.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl">Your cart is empty</h2>
        <a href="/" className="text-blue-600">Start shopping</a>
      </div>
    )
  }

  const onPlace = async () => {
    setLoading(true)
    try {
  await placeOrder({ orderLines: lines.map((l) => ({ productId: l.product.id, quantity: l.quantity })) })
      clear()
      toast.success('Order placed')
    } catch (e: any) {
      toast.error(e.message || 'Order failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="mt-4 space-y-4">
        {lines.map((l) => (
          <div key={l.product.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{l.product.name}</div>
              <div className="text-sm text-gray-600">${l.product.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center">
              <input type="number" value={l.quantity} min={1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQty(l.product.id, Number(e.target.value) || 1)} className="border p-1 w-20 mr-2" />
              <button onClick={() => remove(l.product.id)} className="text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 card">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Total: ${total.toFixed(2)}</div>
          <button className="button-primary" onClick={onPlace} disabled={loading} aria-busy={loading} data-testid="place-order">
            {loading ? 'Placing...' : 'Place order'}
          </button>
        </div>
      </div>
    </div>
  )
}
