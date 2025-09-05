import '../globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { ToasterProvider } from '../components/Toaster'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToasterProvider>
      <Navbar />
      <div className="container py-6">
        <Component {...pageProps} />
      </div>
    </ToasterProvider>
  )
}
