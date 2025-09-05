import React from 'react'
import clsx from 'clsx'

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return <input className={clsx('w-full border p-2 rounded', props.className)} {...props} />
}
