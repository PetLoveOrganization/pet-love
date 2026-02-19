import { RequirementItem } from '@/components/RequirementItem'
import { FileCheck as FileCheckIcon } from '@/icons/FileCheck'
import { House as HouseIcon } from '@/icons/House'
import { Runner as RunnerIcon } from '@/icons/Runner'
import { Clock as ClockIcon } from '@/icons/Clock'
import { FilePencil as  FilePencilIcon } from '@/icons/FilePencil'
import { AlertCircle as AlertCircleIcon } from '@/icons/AlertCircle'
import { ClipboardCheck as ClipboardCheckIcon } from '@/icons/ClipboardCheck'
import type { Requirement } from '@/types'
import type { ComponentType } from 'react'
import { MoreOptions } from '@/icons/MoreOptions'

const Requirements: Record<string, ComponentType<{ className?: string }>> = {
  'home': HouseIcon,
  'run': RunnerIcon,
  'clock': ClockIcon,
  'experience': FilePencilIcon,
  'alert': AlertCircleIcon,
  'clipboard': ClipboardCheckIcon,
}
interface Props {
  requirements: Requirement[]
}
export const AdoptionRequirements = ({ requirements }: Props) => {
  return (
    <article>
      <header className='flex items-center gap-2'>
        <FileCheckIcon className='size-5 text-green-pet'/>
        <h3 className='text-lg md:text-2xl  font-semibold'>Adoption Requirements</h3>
      </header>
      <div className='bg-white p-6 mt-4 rounded-xl shadow-md flex flex-col gap-4' >
        {requirements.map((req, index) => (
          <RequirementItem key={index} icon={Requirements[req.icon_name] ?? MoreOptions} label={req.description} />
        ))}
      </div>
    </article>
  )
}
