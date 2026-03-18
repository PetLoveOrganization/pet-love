import { Eye } from '@/icons/eye'
import type { AdoptionRequest } from '@/types.d'
import { formatDate } from '@/utils/utils'
import { StatusChip } from '@/components/chips/StatusChip'
import { AnchorButton } from '../AnchorButton'

interface Props {
  adoptionRequest: AdoptionRequest
}

export const AdoptionProcessCard = ({ adoptionRequest }: Props) => {
  const { pet, status, created_at } = adoptionRequest
  const hasBorder = status === 'approved' || status === 'rejected'
  const isApproved = status === 'approved'

  const formattedDate = formatDate(created_at)

  const currentStep = status === 'pending' ? 'In Review' : status.charAt(0).toUpperCase() + status.slice(1)
  const progressPercentage = status === 'pending' ? 50 : 100
  return (
    <div className={`bg-white p-4 lg:p-6 rounded-xl shadow-xs border ${
      hasBorder ? `border-l-4 border-l-${isApproved ? 'green-pet' : 'red-400'} border-gray-100` : 'border-gray-100'
    } hover:shadow-md transition-all`}>
      <div className="flex flex-col md:flex-row gap-4 lg:gap-6 md:items-stretch">
        <img
          src={pet.images[0]?.image_url}
          alt={pet.name}
          className="md:size-48 aspect-square rounded-xl object-cover shadow-inner shrink-0"
        />
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-2 lg:gap-4">
            <div className="flex flex-col gap-2 items-stretch">
              <div className='flex flex-row-reverse lg:flex-col justify-between items-start gap-2'>
                <StatusChip status={status} size='xs' withDot={false} />
                <h3 className="text-lg lg:text-2xl font-bold text-gray-800 tracking-tight">{pet.name}</h3>
              </div>
              <p className="text-gray-500 text-xs lg:text-sm font-semibold">
                {pet.breed} • {pet.gender} • {pet.age} {pet.age_unit === 'years' ? 'years' : 'months'}
              </p>
            </div>
            <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2">
              <span className="text-gray-400 text-xs">Applied on</span>
              <span className="text-gray-900 font-semibold text-sm">{formattedDate}</span>
            </div>
          </div>
          <div className=" space-y-2 ">
            <div className="flex justify-between items-center text-xs gap-2">
              <p className=" font-bold text-gray-700 uppercase tracking-wide">
                Current Step: {currentStep}
              </p>
              <p className={`font-semibold ${status === 'rejected' ? 'text-red-400' : 'text-green-pet'} text-xs`}>
                {progressPercentage}% Complete
              </p>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out rounded-full ${
                  status === 'rejected' ? 'bg-red-400' : 'bg-green-pet'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <div className="md:flex md:justify-end mt-auto">
            <AnchorButton
              href={`/pets/${pet.id}`}
              className='flex gap-2'
              variant='black'
              hasShadow={false}
            >
              <Eye className='size-6 text-white'/>
              View Details
            </AnchorButton>
          </div>
        </div>
      </div>
    </div>
  )
}
