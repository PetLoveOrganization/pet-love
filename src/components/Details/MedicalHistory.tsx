import { CheckItem } from '@/components/CheckItem'
import { MedicalHistory as MedicalHistoryIcon } from '@/icons/MedicalHistory'
import type { Pet } from '@/types'

interface Props {
  pet: Pet
}

export const MedicalHistory = ({ pet }: Props) => {
  const { is_sterilized, is_vaccinated, vaccines, is_dewormed, dewormed_info } = pet

  return (
    <article>
      <header className='flex items-center gap-2'>
        <MedicalHistoryIcon className='size-5 text-green-pet'/>
        <h3 className='text-lg md:text-2xl  font-semibold'>Medical History</h3>
      </header>
      <div className='bg-white p-6 mt-4 rounded-xl shadow-md flex flex-col gap-4' >
        <CheckItem label="Sterilized" isCompleted={is_sterilized} date="January 15, 2023" />
        <CheckItem label="Vaccinated" isCompleted={is_vaccinated} date={vaccines ?? ''} />
        <CheckItem label="Dewormed" isCompleted={is_dewormed} date={dewormed_info ?? ''} />
      </div>
    </article>
  )
}
