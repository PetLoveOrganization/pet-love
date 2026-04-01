import { apiFetch } from '@/api/client'
import { PetStates, type Filters, type Pet, type PetsResponse, type Requirement } from '@/types.d'
export const getAdoptionRequirements = (): Promise<Requirement[]> => {
  return apiFetch<Requirement[]>('/requirements')
}
export const getAllPets = ({ filters, actions, offset, limit }: { filters: Filters, actions: PetStates, offset: number, limit: number }): Promise<PetsResponse> => {
  const params = new URLSearchParams()
  if (filters.text) params.append('text', filters.text)
  if (filters.age) params.append('age', filters.age.toString())
  if (filters.gender) params.append('gender', filters.gender)
  if (filters.sortBy) params.append('sortBy', filters.sortBy)
  if (actions !== PetStates.ALL) params.append('states', actions)
  if (filters.health) params.append('health', filters.health)
  params.append('offset', offset.toString())
  params.append('limit', limit.toString())
  filters.species.forEach(species => params.append('species', species))
  return apiFetch<PetsResponse>(`/pets?${params.toString()}`)
}

export const getPetById = (id: string): Promise<Pet> => {
  return apiFetch<Pet>(`/pets/${id}`, {
    credentials: 'include',
  })
}

export const togglePetFavorite = (id: string): Promise<void> => {
  return apiFetch<void>(`/pets/${id}/favorite`, {
    method: 'POST',
    credentials: 'include',
  })
}

export const createPet = (data: FormData): Promise<Pet> => {
  return apiFetch<Pet>('/pets', {
    method: 'POST',
    body: data,
    credentials: 'include',
  })
}
