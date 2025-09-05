import dynamic from 'next/dynamic'
import React from 'react'

const AdminOrders = dynamic(() => import('../../admin/orders/page'), { ssr: false })

export default function OrdersPage() {
  return <AdminOrders />
}
