import { Message } from '@/icons/Message'
import type { Pet } from '../../types'
import { AnchorButton } from '../AnchorButton'

interface PetCardProps {
  pet: Pet

}

type Status = 'ACTIVE' | 'ADOPTED'

const StatusBadge = ({ status }: { status: Status }) => {
  const styles = {
    ACTIVE: 'bg-green-pet text-black',
    ADOPTED: 'bg-rose-200 text-rose-700',
    DRAFT: 'bg-gray-200 text-gray-600',
  }

  const labels = {
    ACTIVE: 'ACTIVE',
    ADOPTED: 'ADOPTED',
    DRAFT: 'DRAFT',
  }

  return (
    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export const MyPetCard = ({ pet }: PetCardProps) => {
  const { id, name, species, breed, images, adoption_requests_count: requests } = pet
  const image = images[0].image_url
  const status: Status = pet.is_adopted ? 'ADOPTED' : 'ACTIVE'
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex flex-col gap-4 relative group">
      <div className="relative h-48 w-full overflow-hidden rounded-xl">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <StatusBadge status={status} />
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{species} • {breed}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-sm">
        <Message />
        <span>{requests} requests</span>
      </div>

      <AnchorButton
        variant='secondary'
        hasShadow
        href={`/pets/${id}`}
      >
        View details
      </AnchorButton>
    </div>
  )
}
