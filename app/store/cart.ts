import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../lib/types'

type Line = { product: Product; quantity: number }

type CartState = {
  lines: Line[]
  add: (product: Product) => void
  updateQty: (productId: number, qty: number) => void
  remove: (productId: number) => void
  clear: () => void
  count: () => number
  total: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (product) =>
        set((s) => {
          const exist = s.lines.find((l) => l.product.id === product.id)
          if (exist) {
            return { lines: s.lines.map((l) => (l.product.id === product.id ? { ...l, quantity: l.quantity + 1 } : l)) }
          }
          return { lines: [...s.lines, { product, quantity: 1 }] }
        }),
      updateQty: (productId, qty) =>
        set((s) => ({ lines: s.lines.map((l) => (l.product.id === productId ? { ...l, quantity: Math.max(1, qty) } : l)) })),
      remove: (productId) => set((s) => ({ lines: s.lines.filter((l) => l.product.id !== productId) })),
      clear: () => set(() => ({ lines: [] })),
      count: () => get().lines.reduce((acc, l) => acc + l.quantity, 0),
      total: () => get().lines.reduce((acc, l) => acc + l.product.price * l.quantity, 0),
    }),
    { name: 'mini-ecom-cart' }
  )
)
