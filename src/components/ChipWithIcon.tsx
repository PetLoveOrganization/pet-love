import type { ComponentType } from 'react'

interface Props {
  icon: ComponentType<{ className?: string }>
  label: string
  className?: string
  iconClassName?: string
}

export const ChipWithIcon = ({ icon: Icon, label, className, iconClassName }: Props) => {
  return (
    <div className={`flex gap-2 items-center bg-lime-500/10 rounded-full py-1.5 px-2.5 text-xs w-fit ${className}`}>
      <Icon className={`size-4 ${iconClassName ?? 'text-green-pet'}`} />
      <p className='font-semibold'>{label}</p>
    </div>
  )
}
