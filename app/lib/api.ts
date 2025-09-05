import axios from 'axios'
import Cookies from 'js-cookie'
import { Product, CreateOrderRequest, LoginRequest, RegisterRequest, Order, AdminOrderRow } from './types'
import { setToken } from './auth'

const baseURL = process.env.NEXT_PUBLIC_API_BASE || '/api'

const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

instance.interceptors.request.use((cfg) => {
  let token: string | undefined
  try {
    if (typeof window !== 'undefined') {
  token = Cookies.get('jwt') || (window.sessionStorage ? window.sessionStorage.getItem('jwt') || undefined : undefined)
    }
  } catch (e) {
    token = undefined
  }

  if (token) {
    const h = (cfg.headers as any) || {}
    h['Authorization'] = `Bearer ${token}`
  cfg.headers = h as any
  }
  return cfg
})

function friendlyError(e: any) {
  if (e.response && e.response.data && e.response.data.message) return new Error(e.response.data.message)
  if (e.message) return new Error(e.message)
  return new Error('Request failed')
}

export async function getProducts(page = 0, size = 20): Promise<Product[]> {
  try {
    const r = await instance.get(`/products?page=${page}&size=${size}`)
    
    if (r.data && Array.isArray((r.data as any).content)) {
      return (r.data as any).content as Product[]
    }
    
    if (Array.isArray(r.data)) return r.data as Product[]
    return []
  } catch (e) {
    throw friendlyError(e)
  }
}

export async function getProductsPage(page = 0, size = 20): Promise<any> {
  try {
    const r = await instance.get(`/products?page=${page}&size=${size}`)
    return r.data
  } catch (e) {
    throw friendlyError(e)
  }
}

export async function login(req: LoginRequest): Promise<{ token: string }> {
  try {
    const r = await instance.post('/auth/login', req)
  console.debug('[api] login response status=', r.status, 'data=', r.data)
  
  
  const token = typeof r.data === 'string' ? r.data : (r.data && r.data.token) ? r.data.token : undefined
  console.debug('[api] extracted token=', token ? `${token.substring(0,8)}...` : token)
  
  
  
  
  
  
  
  // Validate token looks like a JWT (three base64 parts separated by dots)
  if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
    console.error('[api] login returned invalid token:', r.data)
    throw new Error('Invalid token received from server')
  }
  setToken(token)
  return { token }
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
