import dynamic from 'next/dynamic'
import React from 'react'

const LowStock = dynamic(() => import('../../admin/low-stock/page'), { ssr: false })

export default function LowStockPage() {
  return <LowStock />
}
