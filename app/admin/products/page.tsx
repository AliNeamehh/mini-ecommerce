"use client"
import React, { useState } from 'react'
import { createProduct } from '../../lib/api'
import { productSchema } from '../../lib/validators'
import { useToast } from '../../components/Toaster'
import Button from '../../components/ui/button'
import Input from '../../components/ui/input'

export default function AdminProductsPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const p = parseFloat(price)
    const s = parseInt(stock, 10)
    const parsed = { name, price: p, stockQuantity: s, imageUrl: imageUrl || undefined }
    const ok = productSchema.safeParse(parsed)
    if (!ok.success) return setError(ok.error.errors.map((x) => x.message).join(', '))
    try {
      setError(null)
      await createProduct({ name, price: p, stockQuantity: s, imageUrl: imageUrl || undefined })
      setName('')
      setPrice('')
      setStock('')
      setImageUrl('')
      toast.success('Product created')
    } catch (e: any) {
      setError(e.message || 'Failed')
      toast.error(e.message || 'Failed')
    }
  }

  return (
    <div className="card max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">Add product</h2>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <Input className="" placeholder="Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        <Input className="" placeholder="Price" value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
        <Input className="" placeholder="Stock" value={stock} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStock(e.target.value)} />
        <Input className="" placeholder="Image URL" value={imageUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)} />
        {imageUrl && <img src={imageUrl} alt="preview" className="mt-2 h-32 object-cover" />}
  <Button type="submit">Save product</Button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  )
}
