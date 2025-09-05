import React from 'react'
import { Product } from '../lib/types'
import { useCart } from '../store/cart'

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add)
  const out = product.stockQuantity <= 0
  return (
    <div className="card relative">
      <div className="relative h-44 w-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="object-contain max-h-36" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>
      <div className="mt-6">
        <div className="font-semibold text-lg">{product.name}</div>
        <div className="text-sm text-gray-600 mt-1">${product.price.toFixed(2)}</div>
        <div className="mt-3">
          <span className="badge-instock">{out ? 'Out of stock' : 'In stock:'}</span>
        </div>
        <div className="mt-4 flex flex-col gap-3 items-center">
          <button
            className="button-primary w-36"
            onClick={() => add(product)}
            disabled={out}
            data-testid={`add-to-cart-${product.id}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
