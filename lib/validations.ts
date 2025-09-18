import { z } from 'zod'

export const createUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  revenue: z.string().optional(),
  burnRate: z.string().optional(),
  runway: z.string().optional(),
  growth: z.string().optional(),
  highlights: z.string().optional(),
  challenges: z.string().optional(),
  asks: z.string().optional(),
})

export const updateUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
  revenue: z.string().optional(),
  burnRate: z.string().optional(),
  runway: z.string().optional(),
  growth: z.string().optional(),
  highlights: z.string().optional(),
  challenges: z.string().optional(),
  asks: z.string().optional(),
  status: z.enum(['DRAFT', 'SENT', 'ARCHIVED']).optional(),
})

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type CreateUpdateInput = z.infer<typeof createUpdateSchema>
export type UpdateUpdateInput = z.infer<typeof updateUpdateSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
