import React from 'react'
import { getProducts } from './lib/api'
import ProductCard from './components/ProductCard'

export const revalidate = 0 // no-store like

export default async function Page() {
  const products = await getProducts()
  return (
    <div>
      <h1 className="text-2xl font-bold">Shop</h1>
      <p className="text-sm text-gray-600">Showing {products.length} results</p>
      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
