import { PetLeg } from '@/icons/PetLeg'
import type { User } from '@/types'
import { AnchorButton } from '../AnchorButton'

export function OwnerDetails ({ owner }: { owner: User }) {
  return (
    <div className='mt-8 flex flex-col md:flex-row r md:justify-between items-center p-8 bg-lime-500/10 rounded-lg gap-4'>
      <div className='flex gap-4 flex-col items-center  md:flex-row'>
        {owner?.avatar ? <img src={owner?.avatar} alt={owner?.name} className='size-12 lg:size-16 rounded-full' /> : <div className='size-12 lg:size-16 rounded-full bg-[#f4e7d7] ring-3 ring-white'>
          <PetLeg className='size-12 lg:size-16 text-green-800 p-4'/></div>}
        <div className='flex flex-col justify-center items-center md:items-start'>
          <h3 className='text-base md:text-xl font-semibold'>{owner?.name}</h3>
          <p className='text-gray-500 text-xs md:text-sm'>{owner?.email}</p>
        </div>
      </div>
      <AnchorButton href="#how-it-works" className='bg-white border py-3 border-gray-400/20 text-sm' isHasLink={true}>
              See more pets
      </AnchorButton>
    </div>
  )
}
