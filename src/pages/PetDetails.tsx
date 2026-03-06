import { AboutMe } from '@/components/Details/AboutMe'
import { AdoptionRequirements } from '@/components/Details/AdoptionRequirements'
import { Characteristics } from '@/components/Details/Characteristics'
import { MedicalHistory } from '@/components/Details/MedicalHistory'
import { OwnerDetails } from '@/components/Details/OwnerDetails'
import { PetAdoptionCard } from '@/components/Details/PetAdoptionCard'
import { PetHeader } from '@/components/Details/PetHeader'
import PetGallery from '@/components/PetGalery'
import type { Pet } from '@/types'
import { useOutletContext } from 'react-router'

export default function PetDetails () {
  const { pet } = useOutletContext<{ pet: Pet }>()
  const { id,images, description, owner, requirements } = pet

  return (
    <>
      <main className='mt-8 max-w-7xl mx-auto flex gap-8 flex-col lg:flex-row  items-center lg:items-start '>
        <div className=' lg:w-5/7'>
          <PetHeader pet={pet} />

          <PetGallery images={images} />

          <Characteristics pet={pet} />

          <AboutMe description={description} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
            <MedicalHistory pet={pet} />
            <AdoptionRequirements requirements={requirements} />
          </div>

          {owner && <OwnerDetails owner={owner} />}
        </div>
        <div className='min-w-full md:min-w-lg lg:min-w-auto'>
          <PetAdoptionCard
            pet={pet}
            adoptionLink={`/pets/${id}/adopt`}
          />
        </div>
      </main>
    </>
  )
}
