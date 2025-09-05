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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const pRaw = parseFloat(price || '0')
    const p = Number.isFinite(pRaw) ? parseFloat(pRaw.toFixed(2)) : NaN
    const s = parseInt(stock || '0', 10)
    const payload = { name: name.trim(), price: p, stockQuantity: s, imageUrl: imageUrl ? imageUrl.trim() : undefined }

    const ok = productSchema.safeParse(payload)
    if (!ok.success) {
      const msg = ok.error.errors.map((x) => x.message).join(', ')
      setError(msg)
      toast.error(msg)
      return
    }

    try {
      setIsSubmitting(true)
      await createProduct(payload)
      setName('')
      setPrice('')
      setStock('')
      setImageUrl('')
      toast.success('Product created')
    } catch (e: any) {
      const msg = e?.message || 'Failed to create product'
      setError(msg)
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">Add product</h2>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <label className="block">
          <div className="text-sm font-medium">Name</div>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Product name"
            required
          />
        </label>

        <label className="block">
          <div className="text-sm font-medium">Price (USD)</div>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            placeholder="0.00"
            required
          />
        </label>

        <label className="block">
          <div className="text-sm font-medium">Stock quantity</div>
          <Input
            type="number"
            step="1"
            min="0"
            value={stock}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStock(e.target.value)}
            placeholder="0"
            required
          />
        </label>

        <label className="block">
          <div className="text-sm font-medium">Image URL (optional)</div>
          <Input
            type="url"
            value={imageUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>

        {imageUrl && (
          <div className="mt-2">
            <div className="text-xs text-muted-foreground">Preview</div>
            <img src={imageUrl} alt="preview" className="mt-1 h-32 w-full object-cover rounded" />
          </div>
        )}

        <div>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save product'}</Button>
        </div>

        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  )
}
