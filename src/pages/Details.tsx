import { AboutMe } from '@/components/Details/AboutMe'
import { AdoptionRequirements } from '@/components/Details/AdoptionRequirements'
import { Characteristics } from '@/components/Details/Characteristics'
import { MedicalHistory } from '@/components/Details/MedicalHistory'
import { OwnerDetails } from '@/components/Details/OwnerDetails'
import { PetAdoptionCard } from '@/components/Details/PetAdoptionCard'
import { PetHeader } from '@/components/Details/PetHeader'
import { Loading } from '@/components/Loading'
import PetGallery from '@/components/PetGalery'
import { PetNotFound } from '@/components/PetNotFound'
import { getPetById } from '@/services/pets'
import type { Pet } from '@/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function PetDetails ({ pet }: { pet: Pet }) {
  const { id,images, description, owner, requirements,recovery_fee,energy_level,affection_level,exercise_needs } = pet

  return (
    <main className='p-4 md:p-8 max-w-7xl mx-auto flex gap-8 flex-col lg:flex-row items-center '>
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
      <div className='lg:w-2/7 '>
        <PetAdoptionCard
          adoptionFee={recovery_fee}
          energyLevel={energy_level}
          affectionLevel={affection_level}
          exerciseNeeds={exercise_needs}
          adoptionLink={`/adopt/${id}/request`}
        />
      </div>
    </main>
  )
}

export default function DetailsPage () {
  const { id } = useParams()
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      getPetById(id)
        .then((pet) => {
          setPet(pet)
        })
        .catch(() => {
          setError('Pet not found')
        }).finally(() => {
          setLoading(false)
        })
    }
  }, [id])
  return (
    <div className="mt-15 grow">
      {pet && (
        <PetDetails pet={pet} />
      )}
      {loading && (
        <Loading />
      )}
      {error && (
        <PetNotFound />
      )}
    </div>
  )
}

