import { useRef } from 'react'
import  type { Filters as FiltersType, PetHealth } from '../types.d'

interface UseSearchFormProps {
  onChange: (filters: FiltersType) => void
  filters: FiltersType
}

export const useSearchForm = ({ onChange, filters }: UseSearchFormProps) => {
  const timeoutIdRef = useRef<number | null>(null)
  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement
    if(target.name === 'text') {
      if(timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
      const formData = new FormData(event.currentTarget)
      timeoutIdRef.current = setTimeout(() => {
        const text = formData.get('text')
        onChange({
          ...filters,
          text: text ? text as string : '',
        })
      }, 500)
      return
    }
    const formData = new FormData(event.currentTarget)
    const species = formData.getAll('species')
    const age = formData.get('age')
    const gender = formData.get('gender')
    const health = formData.get('health')
    const sortBy = formData.get('sort')
    onChange({
      ...filters,
      sortBy: sortBy as string,
      species: species as string[],
      age: age ? Number(age) : undefined,
      gender: gender as string,
      health: health as PetHealth,
    })
  }
  return {
    handleChange,
  }
}
