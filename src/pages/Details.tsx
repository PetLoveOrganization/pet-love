import { Breadcrumb } from '@/components/Details/Breadcrumb'
import { Loading } from '@/components/Loading'
import { PetNotFound } from '@/components/PetNotFound'
import { getPetById } from '@/services/pets'
import type { Pet } from '@/types'
import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router'

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
    <div className="mt-8 grow">
      {pet && (
        <div className='p-4 pt-10 md:pt-16 max-w-7xl mx-auto'>
          <Breadcrumb name={pet.name} id={pet.id} />
          <Outlet context={{ pet }} />
        </div>
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

