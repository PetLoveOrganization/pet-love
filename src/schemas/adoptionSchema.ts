import { z } from 'zod'

export const adoptionSchema = z.object({
  user_id: z.uuid().optional(),
  pet_id: z.uuid().optional(),
  phone_number: z.string().min(10, { message: 'Phone number must be at least 10 characters long' }).max(20, { message: 'Phone number must be at most 20 characters long' }),
  address: z.string().min(10, { message: 'Address must be at least 10 characters long' }).max(200, { message: 'Address must be at most 200 characters long' }),
  housing: z.enum(['house', 'apartment', 'patio']),
  other_pets: z.string().optional(),
  motivation: z.string().min(10, { message: 'Motivation must be at least 10 characters long' }).max(200, { message: 'Motivation must be at most 200 characters long' }),
})
export type AdoptionFormData = z.infer<typeof adoptionSchema>
