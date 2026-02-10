import PetGallery from '@/components/PetGalery'
import { getPetById } from '@/services/pets'
import type { Pet } from '@/types'
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'

function PetDetails ({ pet }: { pet: Pet }) {
  const location = useLocation()
  const backUrl = location.state?.fromSearch
    ? `/adopt${location.state.fromSearch}`
    : '/adopt'
  const { images } = pet
  return (
    <main className='p-8 max-w-7xl mx-auto bg-white'>
      <nav className='text-lime-700 text-lg font-semibold flex gap-2'>
        <Link to="/">Inicio</Link> {'>'}
        <Link to={backUrl}>Mascotas</Link> {'>'}
        <span className='text-black font-normal'>{pet.name}</span>
      </nav>
      <div>
        <PetGallery images={images} />
        <h1>{pet.name}</h1>
        <p>{pet.description}</p>
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
    <div className="mt-15 grow bg-white">
      {pet && (
        <PetDetails pet={pet} />
      )}
      {loading && (
        <h1 className="text-2xl font-bold">Loading...</h1>
      )}
      {error && (
        <h1 className="text-2xl font-bold">Error: {error}</h1>
      )}
    </div>
  )
}

