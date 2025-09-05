import axios from 'axios'
import Cookies from 'js-cookie'
import { Product, CreateOrderRequest, LoginRequest, RegisterRequest, Order, AdminOrderRow } from './types'

const baseURL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'

const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

instance.interceptors.request.use((cfg) => {
  // Only read cookies in the browser. On server-side rendering `js-cookie` will not work.
  let token: string | undefined
  try {
    if (typeof window !== 'undefined') {
      token = Cookies.get('jwt')
    }
  } catch (e) {
    token = undefined
  }

  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const h = (cfg.headers as any) || {}
    h['Authorization'] = `Bearer ${token}`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cfg.headers = h as any
  }
  return cfg
})

function friendlyError(e: any) {
  if (e.response && e.response.data && e.response.data.message) return new Error(e.response.data.message)
  if (e.message) return new Error(e.message)
  return new Error('Request failed')
}

export async function getProducts(): Promise<Product[]> {
  try {
    const r = await instance.get('/products')
    // backend returns a Page<T> object: { content: T[], ... }
    if (r.data && Array.isArray((r.data as any).content)) {
      return (r.data as any).content as Product[]
    }
    // fallback if backend returns a plain array
    if (Array.isArray(r.data)) return r.data as Product[]
    return []
  } catch (e) {
    throw friendlyError(e)
  }
}

export async function login(req: LoginRequest): Promise<{ token: string }> {
  try {
    const r = await instance.post('/auth/login', req)
    return r.data
  } catch (e) {
    throw friendlyError(e)
  }
}

export async function register(req: RegisterRequest): Promise<void> {
  try {
    await instance.post('/auth/register', req)
  } catch (e) {
    throw friendlyError(e)
  }
}

export async function placeOrder(payload: CreateOrderRequest): Promise<Order> {
  try {
    const r = await instance.post('/orders', payload)
    return r.data
  } catch (e) {
    throw friendlyError(e)
  }
}

export async function createProduct(payload: Partial<Product>): Promise<Product> {
  try {
  const r = await instance.post('/products', payload)
    return r.data
  } catch (e) {
    throw friendlyError(e)
  }
}

export async function getAdminOrders(): Promise<AdminOrderRow[]> {
  try {
  const r = await instance.get('/orders')
    return r.data
  } catch (e) {
    throw friendlyError(e)
  }
}

export async function getLowStock(): Promise<Product[]> {
  try {
  const r = await instance.get('/products/low-stock')
    return r.data
  } catch (e) {
    throw friendlyError(e)
  }
}

export default instance
