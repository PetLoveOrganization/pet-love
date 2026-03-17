import type { AdoptionRequest } from '@/types.d'
import { AdoptionRequestCard } from '../AdoptionRequestCard'
import { AdoptionStepper } from './TrackingStepper'
import { Link } from 'react-router'

interface Props {
  requests: AdoptionRequest[],

}
export const AdoptionStatusList = ({ requests }: Props) => {
  const seeAll = requests.length > 2
  const canShow = requests.length > 0
  if (!canShow) return null
  return (
    <div className="flex flex-col gap-4">
      <section className="">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Adoption Status</h2>
          {seeAll && <Link to='/account/adoption-requests' className="text-green-pet font-semibold hover:text-green-pet/80">See all</Link>}
        </div>

        <div className="bg-white rounded-xl shadow-xs overflow-hidden">
          {requests.map((request) => (
            <AdoptionRequestCard
              key={request.pet.id}
              adoptionRequest={request}
            />
          ))}
        </div>
      </section>
      <AdoptionStepper currentStatus={requests[0].status} petName={requests[0].pet.name} />
    </div>
  )
}
