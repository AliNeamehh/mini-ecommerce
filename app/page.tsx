"use client"
import React, { useEffect, useState, useRef } from 'react'
import { getProducts, getProductsPage } from './lib/api'
import ProductCard from './components/ProductCard'
import Button from './components/ui/button'
export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [size] = useState(20)
  const [totalPages, setTotalPages] = useState(1)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const totalPagesRef = useRef<number>(totalPages)

  useEffect(() => {
    totalPagesRef.current = totalPages
  }, [totalPages])

  const load = async (p = 0) => {
    setLoading(true)
    try {
      const res = await getProductsPage(p, size)
      const content = Array.isArray(res.content) ? res.content : []
      setProducts(content)
      setTotalPages(res.totalPages || 1)
      setPage(typeof res.number === 'number' ? res.number : p)
    } catch (e) {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted) load(0)

    const onCreated = () => {
      const last = Math.max(0, totalPagesRef.current - 1)
      load(last)
    }
    window.addEventListener('product-created', onCreated)

    return () => {
      mounted = false
      window.removeEventListener('product-created', onCreated)
    }
    // totalPagesRef keeps the latest totalPages without reattaching listener
  }, [])

  const goto = async (p: number) => {
    if (p < 0 || p >= totalPages) return
    setPage(p)
    setLoading(true)
    try {
      const res = await getProductsPage(p, size)
      const content = Array.isArray(res.content) ? res.content : []
      setProducts(content)
      setTotalPages(res.totalPages || 1)
      // scroll to the top of the grid so user sees new items
      if (gridRef.current) gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (e) {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pb-24">
      <h1 className="text-2xl font-bold">Shop</h1>
      <p className="text-sm text-gray-600">Page {page + 1} of {totalPages} — Showing {products.length} results</p>

      <div ref={gridRef} className="mt-6 w-full grid gap-6 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
}
 
