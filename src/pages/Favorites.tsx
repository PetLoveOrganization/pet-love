import { DashboardTitle } from '@/components/Dashboard/DashboardTitle'
import { useFavoriteStore } from '@/store/favorites'
import { useEffect, useState } from 'react'
import { type Pet } from '@/types.d'
import { getFavorites } from '@/services/users'
import { PetItem } from '@/components/PetItem'
import { Loading } from '@/components/Loading'

export function FavoritesPage () {
  const count = useFavoriteStore(state => state.favoriteIds.length)
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFavorites({ offset: 0, limit: 20 })
      .then((response) => {
        setPets(response.data)
        setLoading(false)
      })
  }, [])
  return (
    <>
      <DashboardTitle title='My Favorites' description={`You have ${count} pets in your wishlist awaiting a forever home.`} />
      {loading && <Loading />}
      {!loading && pets.length === 0 && <p className='text-gray-500 mt-1 font-light'>No favorites found</p>}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {pets.map((pet, index) => (
          <PetItem key={pet.id} pet={pet} index={index} />
        ))}
      </section>
    </>
  )
}
