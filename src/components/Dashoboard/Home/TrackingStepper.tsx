import { AdoptionRequestStatus } from '@/types.d'
import { Eye } from '@/icons/eye'
import { Done } from '@/icons/Done'
import { Point } from '@/icons/point'
import { XIcon } from '@/icons/X'

export type ApplicationStatus = AdoptionRequestStatus | 'sended';

interface StepperProps {
  currentStatus?: AdoptionRequestStatus;
  petName: string;
}

export const AdoptionStepper = ({ currentStatus = AdoptionRequestStatus.PENDING, petName }: StepperProps) => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-xs">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Follow-up: Request for {petName}</h2>

      <div className="relative flex justify-between items-center">
        <div className="absolute top-8.5 left-0 w-full h-1 bg-gray-100 z-0 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${currentStatus === AdoptionRequestStatus.REJECTED ? 'bg-red-500' : 'bg-green-pet'}`}
            style={{
              width: currentStatus === AdoptionRequestStatus.PENDING ? '75%' : '100%',
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="size-10 rounded-full bg-green-pet text-white flex items-center justify-center shadow-lg shadow-black/15">
            <Point className='size-4 text-black' />
          </div>
          <span >Sended</span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className={`size-10 rounded-full flex items-center justify-center transition-all duration-300 text-black shadow-lg   ${
            currentStatus === AdoptionRequestStatus.PENDING
              ? 'bg-green-pet text-black shadow-black/15'
              : 'bg-green-pet text-black'
          }`}>
            <Eye className='size-4' />
          </div>
          <span className="">Review</span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className={`size-10 rounded-full flex items-center justify-center  transition-all duration-300 shadow-lg ${
            currentStatus === AdoptionRequestStatus.PENDING
              ? 'bg-white text-green-pet border-green-pet border-2 '
              : currentStatus === AdoptionRequestStatus.APPROVED
                ? 'bg-green-pet text-black shadow-black/15'
                : 'bg-red-500 text-black shadow-black/15'
          }`}>
            {currentStatus === AdoptionRequestStatus.PENDING && <span className="text-lg">3</span>}
            {currentStatus === AdoptionRequestStatus.APPROVED && <Done className='size-4' />}
            {currentStatus === AdoptionRequestStatus.REJECTED && <XIcon className='size-4' />}
          </div>
          <span className={`${
            currentStatus === AdoptionRequestStatus.PENDING ? 'text-gray-300' :
              currentStatus === AdoptionRequestStatus.REJECTED ? 'text-red-500' : 'text-black'
          }`}>
            {currentStatus === AdoptionRequestStatus.PENDING ? 'Decision' : currentStatus === AdoptionRequestStatus.REJECTED ? 'Rejected' : 'Approved'}
          </span>
        </div>
      </div>
    </section>
  )
}
