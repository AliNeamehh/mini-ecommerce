import React from 'react'
import clsx from 'clsx'

export default function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button className={clsx('bg-black text-white rounded-xl px-5 py-2.5 disabled:opacity-50', className)} {...props}>
      {children}
    </button>
  )
}
