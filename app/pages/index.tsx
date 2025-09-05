import React, { useEffect, useState } from 'react'
import { getProducts } from '../lib/api'
import ProductCard from '../components/ProductCard'
import { Product } from '../lib/types'

export default function IndexPage() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => { getProducts().then(setProducts).catch(() => setProducts([])) }, [])
  return (
    <div>
      <h1 className="text-2xl font-bold">Shop</h1>
      <p className="text-sm text-gray-600">Showing {products.length} results</p>
      <section className="mx-auto max-w-screen-xl px-4">
  <div
    className="mt-6 w-full"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 16,
    }}
  >
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
</section>

    </div>
  )
}
