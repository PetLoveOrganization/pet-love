import { PetLeg } from '@/icons/PetLeg'

export function PetLogo () {
  return (
    <div className="flex items-center gap-2">
      <div className='p-2 bg-green-pet/20 rounded-full'>
        <PetLeg className="size-5 text-green-pet"/>
      </div>
      <h2 className='text-xl font-bold'>PetLove</h2>
    </div>
  )
}
