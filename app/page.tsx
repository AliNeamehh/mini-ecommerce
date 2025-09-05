"use client"
import React, { useEffect, useState } from 'react'
import { getProducts } from './lib/api'
import ProductCard from './components/ProductCard'
import { Product } from './lib/types'

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = () => {
      setLoading(true)
      // request a larger page size so admin-created items show up
      getProducts(0, 50)
        .then((p) => {
          if (mounted) setProducts(p)
        })
        .catch(() => {
          if (mounted) setProducts([])
        })
        .finally(() => mounted && setLoading(false))
    }

    load()

    const onCreated = (e: any) => {
      // re-fetch when product created
      load()
    }
    window.addEventListener('product-created', onCreated)

    return () => {
      mounted = false
      window.removeEventListener('product-created', onCreated)
    }
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold">Shop</h1>
      <p className="text-sm text-gray-600">Showing {products.length} results</p>
  <div className="mt-6 grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-500">Loading products...</div>
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  )
}
