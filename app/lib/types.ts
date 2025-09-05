export type Role = 'ADMIN' | 'USER'

export type Product = {
  id: number
  name: string
  description?: string
  price: number
  stockQuantity: number
  imageUrl?: string
}

export type OrderItem = { productId: number; quantity: number }

export type CreateOrderRequest = { orderLines: OrderItem[] }

export type Order = {
  id: number
  status: string
  totalAmount: number
  items: { productId: number; productName: string; price: number; quantity: number; lineTotal: number }[]
  createdAt: string
}

export type LoginRequest = { email: string; password: string }
export type RegisterRequest = { name: string; email: string; password: string }

export type AdminOrderRow = {
  id: number
  userName: string
  totalAmount: number
  status: string
  createdAt: string
}
