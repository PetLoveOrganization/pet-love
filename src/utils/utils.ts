import { AdoptionRequestStatus } from '@/types.d'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const STATUS_CONFIG = {
  [AdoptionRequestStatus.PENDING]: { color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  [AdoptionRequestStatus.APPROVED]: { color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  [AdoptionRequestStatus.REJECTED]: { color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}
