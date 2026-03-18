import { AdoptionStatusList } from '@/components/Dashboard/Home/AdoptionStatusList'
import { RecentFavoritesSection } from '@/components/Dashboard/Home/RecentFavoritesSection'
import { DashboardStats } from '@/components/Dashboard/Home/Stats'
import { Loading } from '@/components/Loading'
import { getAdoptionRequests, getFavorites } from '@/services/users'
import { useAuthStore } from '@/store/auth'
import { AdoptionRequestStatus, initPetsResponse, type AdoptionRequest, type AdoptionRequestsResponse, type PetsResponse } from '@/types.d'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ProfilePage () {
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequestsResponse>(initPetsResponse<AdoptionRequest>)
  const [favorites, setFavorites] = useState<PetsResponse>(initPetsResponse)
  const [loading, setLoading] = useState(true)

  const { data: adoptionRequestsData, total } = adoptionRequests

  useEffect(() => {
    const loadData = async () => {
      try {
        const [adoptionRequests, favorites] = await Promise.all([
          getAdoptionRequests({ status: AdoptionRequestStatus.PENDING, limit: 2, offset: 0 }),
          getFavorites({ limit: 2, offset: 0 }),
        ])
        setAdoptionRequests(adoptionRequests)
        setFavorites(favorites)
      } catch {
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const { name } = useAuthStore(state => state.user)!
  const firstName = name.split(' ')[0]

  return (
    <main className="flex flex-col gap-10">
      <section>
        <h1 className="text-4xl font-bold">Hi, {firstName} 👋</h1>
        <p className="text-gray-500 mt-2 font-light">Here you can manage your profile and your pets.</p>
      </section>
      <DashboardStats totalAdoptionRequests={total}/>
      {loading && <Loading />}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdoptionStatusList requests={adoptionRequestsData}/>
        </div>
        <div className="lg:col-span-1">
          <RecentFavoritesSection pets={favorites.data} />
        </div>
      </div>
    </main>
  )
}
