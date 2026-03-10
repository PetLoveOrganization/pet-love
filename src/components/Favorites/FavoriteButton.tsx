import { Heart as HeartIcon } from '@/icons/Heart'
import { HeartFilled as HeartFilledIcon } from '@/icons/HeartFilled'
import { togglePetFavorite } from '@/services/pets'
import { useAuthStore } from '@/store/auth'
import { useFavoriteStore } from '@/store/favorites'
import { cn } from '@/utils/utils'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  petId: string
  className?: string
}

export const FavoriteButton = ({ petId, className }: Props) => {
  const isFavorite = useFavoriteStore((state) => state.isFavorite(petId))
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      toast.info('Please login to add to favorites')
      return
    }
    if(isLoading) return

    toggleFavorite(petId)
    setIsLoading(true)
    try {
      await togglePetFavorite(petId)
    } catch (error) {
      toggleFavorite(petId)
      console.error('Error toggle favorite', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <button
      type='button'
      onClick={handleToggle}
      className={cn('p-2 py-3 rounded-full hover:bg-amber-100 transition-colors duration-300 cursor-pointer bg-gray-50', className)}>
      {isFavorite ? <HeartFilledIcon className='size-4 text-black' /> : <HeartIcon className='size-4' />}
    </button>
  )
}
