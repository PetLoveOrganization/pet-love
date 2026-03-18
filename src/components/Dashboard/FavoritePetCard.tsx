import type { Pet } from '@/types.d'
import { FavoriteButton } from '../Favorites/FavoriteButton'

interface FavoritePetCardProps {
  pet: Pet;
}

export const FavoritePetCard = ({ pet }: FavoritePetCardProps) => {
  const { id, name, images, age, age_unit } = pet
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-50 group transition-all hover:shadow-md">
      <picture className="relative aspect-square w-full overflow-hidden">
        <img
          src={images[0]?.image_url}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <FavoriteButton petId={id} className='absolute top-3 right-3'/>
      </picture>
      <div className="p-2 md:p-4 flex flex-col gap-0.5">
        <h3 className="text-base md:text-xl font-bold text-gray-800 tracking-tight">{name}</h3>
        <p className="text-gray-400 text-xs md:text-sm">
          {age} {age_unit }
        </p>
      </div>
    </div>
  )
}
