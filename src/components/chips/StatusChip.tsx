import { STATUS_CONFIG } from '@/utils/utils'
import type { AdoptionRequestStatus } from '@/types.d'

interface StatusChipProps {
  status: AdoptionRequestStatus
  withDot?: boolean
  size?: 'sm' | 'xs'
  className?: string
}

export const StatusChip = ({ status, withDot = true, size = 'sm', className = '' }: StatusChipProps) => {
  const { color, dot } = STATUS_CONFIG[status]
  const label = status.charAt(0).toUpperCase() + status.slice(1)

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold w-fit ${size === 'xs' ? 'text-xs' : 'text-sm'} ${color} ${className}`}>
      {withDot && <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />}
      {label}
    </div>
  )
}
