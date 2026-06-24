import { z } from 'zod'

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be under 100 characters'),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be under 500 characters'),

  status: z.enum(['todo', 'in-progress', 'done'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),

  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a valid priority' }),
  }),
})

// TypeScript-style type inference from schema
// If you migrate to TS later: type TaskFormData = z.infer<typeof taskSchema>
export const taskDefaults = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
}