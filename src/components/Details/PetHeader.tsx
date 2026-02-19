import { ChipWithIcon } from '@/components/ChipWithIcon'
import { Point as PointIcon } from '@/icons/point'
import { RosetteCheck as RosetteCheckIcon } from '@/icons/RosetteCheck'
import type { Pet } from '@/types'
import { Link, useLocation } from 'react-router'

interface Props {
  pet: Pet
}

export const PetHeader = ({ pet }: Props) => {
  const { name, breed, age, age_unit, location: direction } = pet
  const location = useLocation()
  const backUrl = location.state?.fromSearch
    ? `/adopt${location.state.fromSearch}`
    : '/adopt'

  return (
    <>
      <nav className='text-lime-600 text-normal font- flex gap-2'>
        <Link to="/">Home</Link> {'>'}
        <Link to={backUrl}>Adopt</Link> {'>'}
        <span className='text-black font-semibold '>{name}</span>
      </nav>
      <div className='flex flex-wrap justify-between items-center mt-8'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold '>{name}</h1>
        <ChipWithIcon icon={RosetteCheckIcon} label='AVAILABLE TO ADOPT' />
      </div>
      <p className='text-lime-600 mt-2 mb-8 flex flex-wrap items-center text-sx lg:text-lg'>{breed} <PointIcon className="size-4" /> {age} {age_unit}<PointIcon className="size-4" /> {direction}</p>
    </>
  )
}
