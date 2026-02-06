import { apiFetch } from '@/api/client'
import { QuickActions, type Filters, type PetsResponse } from '@/types.d'
export const getAllPets = ({ filters, actions, offset, limit }: { filters: Filters, actions: QuickActions, offset: number, limit: number }): Promise<PetsResponse> => {
  const params = new URLSearchParams()
  if (filters.text) params.append('text', filters.text)
  if (filters.age) params.append('age', filters.age.toString())
  if (filters.gender) params.append('gender', filters.gender)
  if (filters.sortBy) params.append('sortBy', filters.sortBy)
  if (actions !== QuickActions.ALL) params.append('actions', actions)
  params.append('offset', offset.toString())
  params.append('limit', limit.toString())
  filters.species.forEach(species => params.append('species', species))
  return apiFetch<PetsResponse>(`/pets?${params.toString()}`)
}
