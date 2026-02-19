import { Done as DoneIcon } from '@/icons/Done'
import { XIcon } from '@/icons/X'

interface Props {
  label: string
  isCompleted?: boolean
  date?: string | null
}

export const CheckItem = ({ label, isCompleted = true, date }: Props) => {
  return (
    <div className='flex items-start gap-2'>
      {isCompleted ? (
        <>
          <DoneIcon className='p-1 bg-lime-500/10 rounded-full size-4 md:size-5 text-green-pet'/>
          <div>
            <p className='mt-0.5 text-sm font-medium text-gray-900'>{label}</p>
            {date && <p className='text-gray-500 text-xs mt-0.5'>{date}</p>}
          </div>
        </>
      ) : (
        <>
          <XIcon className="p-1 bg-red-500/10 rounded-full size-4 md:size-5 text-red-500" />
          <div>
            <p className='mt-0.5 text-sm font-medium text-gray-500'>Not {label}</p>
          </div>
        </>
      )}
    </div>
  )
}
