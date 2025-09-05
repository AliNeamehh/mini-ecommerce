import './globals.css'
import React from 'react'
import { Metadata } from 'next'
import Navbar from '../components/Navbar'
import { ToasterProvider } from '../components/Toaster'

export const metadata: Metadata = {
  title: 'Mini E-commerce',
  description: 'Next.js frontend for mini ecommerce',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <ToasterProvider>
          <Navbar />
          <main className="container py-6">{children}</main>
        </ToasterProvider>
      </body>
    </html>
  )
}
