import type { ComponentType } from 'react'

interface Props {
  icon: ComponentType<{ className?: string }>
  label: string
  isValid?: boolean
}

export const RequirementItem = ({ icon: Icon, label, isValid = true }: Props) => {
  return (
    <div className='flex items-center gap-3'>
      {
        isValid
          ? <Icon className='size-4 md:size-5 text-green-pet' />
          : <Icon className='size-4 md:size-5 text-gray-400' />
      }

      <p className={`text-sm ${!isValid && 'text-gray-400'}`}>
        {label}
      </p>
    </div>
  )
}
