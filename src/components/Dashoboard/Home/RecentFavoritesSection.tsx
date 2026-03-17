import { ArrowRight } from '@/icons/ArrowRight'
import type { Pet } from '@/types.d'
import { FavoritePetCard } from '../FavoritePetCard'
import { Link } from 'react-router'
import { AnchorButton } from '@/components/AnchorButton'

interface RecentFavoritesSectionProps {
  pets: Pet[]
}

export const RecentFavoritesSection = ({ pets }: RecentFavoritesSectionProps) => {
  const canShow = pets.length > 0
  if (!canShow) return null
  return (
    <section className="flex flex-col gap-4 ">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold">Recent Favorites</h2>
        <Link to='/account/favorites' className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowRight className='size-6 text-gray-500 ' />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {pets.map((pet) => (
          <FavoritePetCard key={pet.id} pet={pet} />
        ))}
      </div>
      <AnchorButton
        href='/account/favorites'
        variant='outline'
      >
        See all favorites
      </AnchorButton>
    </section>
  )
}
