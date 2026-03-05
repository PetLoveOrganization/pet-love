import { apiFetch } from '@/api/client'
import type { AdoptionFormData } from '@/schemas/adoptionSchema'

export const createAdoptionRequest = async ({ data, pet_id }: { data: AdoptionFormData, pet_id: string }) => {
  const response = await apiFetch<void>('/adoptions', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ ...data, pet_id }),
  })
  return response
}
