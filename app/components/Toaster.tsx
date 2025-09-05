"use client"
import React, { createContext, useContext, useState, useCallback } from 'react'
import * as RadixToast from '@radix-ui/react-toast'

type ToastType = { id: string; type: 'success' | 'error'; message: string }

const ToastContext = createContext<{ success: (m: string) => void; error: (m: string) => void } | null>(null)

export const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const push = useCallback((t: ToastType) => setToasts((s) => [...s, t]), [])
  const remove = useCallback((id: string) => setToasts((s) => s.filter((t) => t.id !== id)), [])

  const api = {
    success: (m: string) => push({ id: String(Date.now()) + Math.random(), type: 'success', message: m }),
    error: (m: string) => push({ id: String(Date.now()) + Math.random(), type: 'error', message: m }),
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      <RadixToast.Provider>
        <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
          {toasts.map((t) => (
            <RadixToast.Root key={t.id} duration={4000} onOpenChange={(open) => !open && remove(t.id)}>
              <RadixToast.Title className={`px-4 py-2 rounded shadow ${t.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                {t.message}
              </RadixToast.Title>
            </RadixToast.Root>
          ))}
          <RadixToast.Viewport />
        </div>
      </RadixToast.Provider>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToasterProvider')
  return ctx
}

export default function Toaster() {
  return null
}
