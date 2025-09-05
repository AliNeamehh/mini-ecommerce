import React from 'react'
import { Product } from '../lib/types'
import { useCart } from '../store/cart'
import { isAuthed } from '../lib/auth'
import { useRouter } from 'next/navigation'

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add)
  const router = useRouter()
  const out = product.stockQuantity <= 0

  return (
  <div className="group w-full h-full flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 transform transition duration-150 hover:scale-105 hover:shadow-md min-h-[240px]">
  <div className="relative h-32 bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-1"
            style={{ maxHeight: '100%' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">No image</div>
        )}

        {/* Stock badge in the corner */}
        <div className="absolute top-3 right-3">
          {out ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">Out of Stock</span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">In Stock</span>
          )}
        </div>
      </div>

      <div className="p-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-semibold text-gray-900">{product.name}</h3>

          <div className="mt-1">
            <div className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-0.5">{product.description ? product.description.slice(0, 60) : ''}</div>
          </div>
        </div>

        <div className="mt-2">
          <button
            onClick={() => {
              if (!isAuthed()) {
                // not logged in -> send to login page
                router.push('/login')
                return
              }
              add(product)
            }}
            disabled={out}
            data-testid={`add-to-cart-${product.id}`}
            className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              out
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-200'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
