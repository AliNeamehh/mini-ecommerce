import { z } from 'zod'

export const loginSchema = z.object({ username: z.string().min(1), password: z.string().min(1) })
export const registerSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
	confirm: z.string().min(6),
})
export const productSchema = z.object({ name: z.string().min(1), price: z.number().positive(), stockQuantity: z.number().int().nonnegative(), imageUrl: z.string().url().optional() })
