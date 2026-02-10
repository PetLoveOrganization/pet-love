import { CalendarIcon } from '@/icons/CalendarIcon'
import { FemaleIcon } from '@/icons/Female'
import { LocationIcon } from '@/icons/LocationIcon'
import { MaleIcon } from '@/icons/MaleIcon'
import type { Pet } from '@/types'
import { BlackAButton } from './BlackAButton'
import { PetTag } from './PetTag'
import { FavoriteButton } from './Favorites/FavoriteButton'
import { useLocation } from 'react-router'

interface Props {
  pet: Pet,
  index: number
}

const RowItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
  return (
    <div className='flex items-center gap-1'>
      {icon}
      <span className='text-gray-500 text-base leading-none'>{text}</span>
    </div>
  )
}
export const PetItem = ({ pet: { id, name, age, age_unit, gender, breed, images,location: address, is_urgent, is_vaccinated }, index }: Props) => {
  const location = useLocation()
  return (
    <article className='flex flex-col rounded-xl gap-2 group shadow-xs bg-white shadow-[#e5f3e6]'>
      <picture className='overflow-hidden rounded-t-xl relative'>
        <img src={images[0]} alt={name}
          loading='lazy'
          className='w-full aspect-9/7 object-cover
          scale-110
          group-hover:scale-100 transition-all duration-300'
        />
        <PetTag isNew={index === 0} isUrgent={is_urgent} isVaccinated={is_vaccinated} className='absolute bottom-3 left-3'/>
        <FavoriteButton isFavorite={true} className='absolute top-3 right-3'/>
      </picture>
      <div className='px-5 py-4 flex flex-col items-stretch gap-3'>
        <h3 className='flex items-center justify-between font-bold text-2xl text-pretty leading-none'>{name}
          {gender === 'Male' && <MaleIcon className='text-blue-500 w-5 h-5' />}
          {gender === 'Female' && <FemaleIcon className='text-pink-500 w-5 h-5' />}
        </h3>
        <p className='text-green-700 text-lg font-semibold text-nowrap text-ellipsis overflow-hidden leading-none'>{breed}</p>
        <div className='flex flex-wrap gap-3 items-start mt-1 mb-3'>
          <RowItem icon={<CalendarIcon  className='text-gray-500 w-4 h-4' />} text={`${age} ${age_unit}`} />
          <RowItem icon={<LocationIcon className='text-gray-500 w-4 h-4' />} text={address} />
        </div>
        <BlackAButton to={`/adopt/${id}`} state={{ fromSearch: location.search }} className=''>
          Meet {name.split(' ')[0]}
        </BlackAButton>
      </div>
    </article>
  )
}
