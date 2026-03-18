import { useEffect, useState } from 'react'
import { getAdoptionRequests } from '@/services/users'
import { type AdoptionRequest } from '@/types.d'
import { AdoptionProcessCard } from '@/components/Dashoboard/AdoptionProcessCard'

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
      <header>
        <h1 className='text-3xl font-bold'>My Applications</h1>
        <p className='text-gray-500 mt-1 font-light'>Manage and track the status of your current pet adoption request.</p>
      </header>

      <section className='flex flex-col gap-4 mt-6'>
        {adoptionRequests.map((adoptionRequest) => (
          <AdoptionProcessCard key={adoptionRequest.id} adoptionRequest={adoptionRequest} />
        ))}
      </section>
    </>
  )
}
