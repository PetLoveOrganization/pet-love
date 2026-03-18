import { type AdoptionRequest } from '@/types.d'
import { formatDate } from '@/utils/utils'
import { Link } from 'react-router'
import { StatusChip } from '@/components/chips/StatusChip'

interface AdoptionRequestProps {
  adoptionRequest: AdoptionRequest
}

export const AdoptionRequestCard = ({
  adoptionRequest: { pet, status, created_at },
}: AdoptionRequestProps) => {
  const { name, images, breed, id } = pet
  const date = formatDate(created_at)
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors gap-4">
      <div className="flex-1 flex gap-4 items-center">
        <img
          src={images[0].image_url}
          alt={name}
          className="w-20 h-20 rounded-xl object-cover shadow-sm"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800 leading-tight">{name}</h3>
          <p className="text-gray-500">
            {breed}
          </p>
          <p className='text-gray-500 text-xs'>Solicited on {date}</p>
        </div>
      </div>
      <div className="flex flex-row md:flex-col gap-3 items-center justify-between">
        <StatusChip status={status} />

        <Link
          to={`/pets/${id}`}
          className="text-gray-600 font-semibold hover:underline transition-all"
        >
          See details
        </Link>
      </div>
    </div>
  )
}
