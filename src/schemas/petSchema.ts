import { Level } from '@/types.d'
import { z } from 'zod'

// ─── Image schema (frontend only — files are not sent to this schema) ─────────

export const petImageSchema = z.object({
  image_url: z.string().url(),
  is_primary: z.boolean(),
})

const level = (label: string) => {
  return z.enum(['low', 'medium', 'high', 'very high'], {
    message: `${label} must be one of low, medium, high, very high`,
  })
}

// ─── Core pet schema (mirrors the backend petSchema) ─────────────────────────

export const petSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  name: z.string({
    message: 'Pet name is required',
  }).min(1, 'Pet name is required').max(50, 'Pet name must be at most 50 characters'),
  species: z.enum(['dog', 'cat', 'rabbit', 'bird', 'other'], {
    message: 'Species is required',
  }),
  breed: z.string({
    message: 'Breed is required',
  }).min(1, 'Breed is required').max(50, 'Breed must be at most 50 characters'),
  age: z.coerce.number().int().min(1).max(99),
  age_unit: z.enum(['years', 'months'], {
    message: 'Age unit is required',
  }),
  size: z.enum(['small', 'medium', 'large'], {
    message: 'Size is required',
  }),
  color: z.string({
    message: 'Color is required',
  }).min(1, 'Color is required').max(50, 'Color must be at most 50 characters'),
  gender: z.enum(['male', 'female'], {
    message: 'Gender is required',
  }),
  description: z.string({
    message: 'Description is required',
  }).min(1, 'Description is required').max(500, 'Description must be at most 500 characters'),
  location: z.string({
    message: 'Location is required',
  }).min(1, 'Location is required').max(50, 'Location must be at most 50 characters'),
  recovery_fee: z.coerce.number().min(0),

  // Health
  is_sterilized: z.coerce.boolean(),
  sterilization_date: z.string().optional().nullable(),
  is_vaccinated: z.coerce.boolean(),
  vaccines_updated_at: z.coerce.boolean().optional(),
  vaccines: z.string().nullable().optional(),
  is_dewormed: z.coerce.boolean().default(false),
  dewormed_info: z.string().default('monthly'),

  // States
  is_friendly: z.coerce.boolean(),
  is_trained: z.coerce.boolean(),
  is_urgent: z.coerce.boolean(),

  // Levels
  energy_level: level('Energy level'),
  affection_level: level('Affection level'),
  exercise_needs: level('Exercise needs'),

  created_at: z.date().optional(),
  deleted_at: z.date().optional(),
})

const validateVaccination = (data: { is_vaccinated?: boolean; vaccines?: string | null; vaccines_updated_at?: boolean }) => {
  if (data.is_vaccinated === undefined) return true

  if (data.is_vaccinated) {
    return !!data.vaccines && data.vaccines.trim().length > 0
  }
  return !data.vaccines_updated_at && typeof data.vaccines !== 'string'
}

const validateSterilization = (data: { is_sterilized?: boolean; sterilization_date?: string | null }) => {
  if (data.is_sterilized === undefined) return true

  if (data.is_sterilized) {
    return data.sterilization_date !== null && data.sterilization_date !== undefined && data.sterilization_date.trim().length > 0
  }
  return data.sterilization_date === null || data.sterilization_date === undefined || data.sterilization_date === ''
}

// ─── Input schema (what the form submits) ─────────────────────────────────────

export const petInputBase = petSchema.omit({
  id: true,
  created_at: true,
  deleted_at: true,
  user_id: true,
}).extend({
  images: z.array(petImageSchema).min(1, 'At least one image is required').max(5, 'At most 5 images are allowed'),
  requirement_ids: z.array(z.coerce.number()).min(1, 'At least 1 requirement is needed'),
})

export const petInputSchema = petInputBase
  .refine(validateVaccination, {
    message: 'Vaccination consistency error: if vaccinated, specify vaccines.',
    path: ['vaccines'],
  })
  .refine(validateSterilization, {
    message: 'If is_sterilized is true, sterilization_date is required',
    path: ['sterilization_date'],
  })

export const petFormBase = petInputBase.omit({ images: true })

export const petFormSchema = petFormBase
  .refine(validateVaccination, {
    message: 'Vaccination consistency error: if vaccinated, specify vaccines.',
    path: ['vaccines'],
  })
  .refine(validateSterilization, {
    message: 'If is_sterilized is true, sterilization_date is required',
    path: ['sterilization_date'],
  })

// ─── Inferred types ───────────────────────────────────────────────────────────

export type PetFormInput = z.infer<typeof petInputSchema>
export type PetImageInput = z.infer<typeof petImageSchema>

// ─── Partial form type used in the React state (pre-coerce, strings allowed) ──

export type PetFormState = {
  name: string
  species: 'dog' | 'cat' | 'rabbit' | 'bird' | 'other' | ''
  breed: string
  age: string
  age_unit: 'years' | 'months'
  size: 'small' | 'medium' | 'large' | ''
  color: string
  gender: 'male' | 'female' | ''
  description: string
  location: string
  recovery_fee: string
  is_sterilized: boolean
  sterilization_date: string
  is_vaccinated: boolean
  vaccines_updated_at: boolean
  vaccines: string
  is_dewormed: boolean
  dewormed_info: string
  is_friendly: boolean
  is_trained: boolean
  is_urgent: boolean
  energy_level: Level
  affection_level: Level
  exercise_needs: Level
  requirement_ids: number[]
}

export const INITIAL_FORM_STATE: PetFormState = {
  name: '',
  species: '',
  breed: '',
  age: '',
  age_unit: 'years',
  size: '',
  color: '',
  gender: '',
  description: '',
  location: '',
  recovery_fee: '0',
  is_sterilized: false,
  sterilization_date: '',
  is_vaccinated: false,
  vaccines_updated_at: false,
  vaccines: '',
  is_dewormed: false,
  dewormed_info: 'monthly',
  is_friendly: false,
  is_trained: false,
  is_urgent: false,
  energy_level: Level.Low,
  affection_level: Level.Low,
  exercise_needs: Level.Low,
  requirement_ids: [],
}
