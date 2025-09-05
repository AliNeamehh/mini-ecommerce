"use client"
import React, { useEffect, useState, useRef } from 'react'
import { getProducts, getProductsPage } from './lib/api'
import ProductCard from './components/ProductCard'
import Button from './components/ui/button'
import { Product } from './lib/types'

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [size] = useState(20)
  const [totalPages, setTotalPages] = useState(1)
  const gridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let mounted = true
    const load = (p = page) => {
      setLoading(true)
      getProductsPage(p, size)
        .then((res) => {
          if (!mounted) return
         
          const content = Array.isArray(res.content) ? res.content : []
          setProducts(content)
          setTotalPages(res.totalPages || 1)
          setPage(res.number || p)
        })
        .catch(() => {
          if (mounted) setProducts([])
        })
        .finally(() => mounted && setLoading(false))
    }

    load()

    const onCreated = (e: any) => {
  
      const last = Math.max(0, totalPages - 1)
      load(last)
    }
    window.addEventListener('product-created', onCreated)

    return () => {
      mounted = false
      window.removeEventListener('product-created', onCreated)
    }
  }, [])

  const goto = (p: number) => {
    if (p < 0 || p >= totalPages) return
    ;(async () => {
      try {
        return (
          <div className="pb-24">
            <h1 className="text-2xl font-bold">Shop</h1>
        <p className="text-sm text-gray-600">Page {page + 1} of {totalPages}  Showing {products.length} results</p>

            <div ref={gridRef} className="mt-6 w-full grid gap-4 justify-center" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
              {loading ? (
                <div className="w-full text-center py-10 text-gray-500">Loading products...</div>
              ) : (
                products.map((p) => <ProductCard key={p.id} product={p} />)
              )}
            </div>

            <div className="mt-6 mb-8 flex items-center justify-center gap-3 bg-white px-4 py-3 rounded-md shadow-sm">
              <Button aria-label="Previous page" onClick={() => goto(page - 1)} disabled={page <= 0}>Prev</Button>
              <div className="text-sm text-gray-600">Page {page + 1} of {totalPages}</div>
              <Button aria-label="Next page" onClick={() => goto(page + 1)} disabled={page >= totalPages - 1}>Next</Button>
            </div>
          </div>
        )

      <div ref={gridRef} className="mt-6 w-full flex flex-wrap gap-4 items-start">
        {loading ? (
          <div className="w-full text-center py-10 text-gray-500">Loading products...</div>
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
      {/* pagination controls rendered after the product grid so they appear below the last product */}
      <div className="mt-6 mb-8 flex items-center justify-center gap-3 bg-white px-4 py-3 rounded-md shadow-sm">
        <Button aria-label="Previous page" onClick={() => goto(page - 1)} disabled={page <= 0}>Prev</Button>
        <div className="text-sm text-gray-600">Page {page + 1} of {totalPages}</div>
        <Button aria-label="Next page" onClick={() => goto(page + 1)} disabled={page >= totalPages - 1}>Next</Button>
      </div>
    </div>
  )
}
