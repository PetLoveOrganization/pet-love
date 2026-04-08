import { useEffect, useState } from 'react'
import type { Pet } from '../types'
import { getMyPets } from '../services/pets'
import { MyPetCard } from '@/components/Dashboard/MyPetCard'
import { Loading } from '@/components/Loading'
import { DashboardTitle } from '@/components/Dashboard/DashboardTitle'

export default function MyPetsPage () {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getMyPets()
        setPets(response)
      } catch (error) {
        console.error('Error fetching pets:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPets()
  }, [])

  if (loading) {
    return <Loading />
  }

  const activePets = pets.filter((pet) => !pet.is_adopted)

  const description = activePets.length === 0 ? 'You don\'t have any active pets yet. Add one to get started.' : `You have ${activePets.length} active pets looking  for their forever homes today. Manage their status and view pending requests below.`

  return (
    <div>
      <DashboardTitle title='My Pets' description={description} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {pets.map((pet) => (
          <MyPetCard
            key={pet.id}
            pet={pet}
          />
        ))}
      </div>
    </div>
  )
}
