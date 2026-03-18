import { useEffect, useState } from 'react'
import { getAdoptionRequests } from '@/services/users'
import { type AdoptionRequest } from '@/types.d'
import { AdoptionProcessCard } from '@/components/Dashboard/AdoptionProcessCard'
import { DashboardTitle } from '@/components/Dashboard/DashboardTitle'

export default function MyApplicationsPage () {
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([])
  useEffect(() => {
    getAdoptionRequests({ offset: 0, limit: 20 })
      .then((response) => {
        setAdoptionRequests(response.data)
      })
  }, [])
  return (
    <>
      <DashboardTitle title='My Applications' description='Manage and track the status of your current pet adoption request.' />

      <section className='flex flex-col gap-4 mt-6'>
        {adoptionRequests.length === 0 ? (
          <p className='text-gray-500 mt-1 font-light'>No applications found</p>
        ) : (
          adoptionRequests.map((adoptionRequest) => (
            <AdoptionProcessCard key={adoptionRequest.id} adoptionRequest={adoptionRequest} />
          ))
        )}
      </section>
    </>
  )
}
