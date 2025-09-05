import dynamic from 'next/dynamic'
import React from 'react'

const Products = dynamic(() => import('../../admin/products/page'), { ssr: false })

export default function ProductsPage() {
  return <Products />
}
