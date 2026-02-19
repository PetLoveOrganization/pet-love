import { ChipWithIcon } from '@/components/ChipWithIcon'
import { Energy as EnergyIcon } from '@/icons/Energy'
import { Friendly as FriendlyIcon } from '@/icons/friendly'
import { GraduationHat as GraduationHatIcon } from '@/icons/GraduationHat'
import { Neutered as NeuteredIcon } from '@/icons/Neutered'
import { Vaccine as VaccineIcon } from '@/icons/Vaccine'
import { Urgent as UrgentIcon } from '@/icons/Urgent'
import type { Pet } from '@/types'
import { capitalize } from '@/utils/strings'

interface Props {
  pet: Pet
}

export const Characteristics = ({ pet }: Props) => {
  const { is_urgent, is_friendly, is_trained, is_vaccinated, is_sterilized, energy_level } = pet

  return (
    <div className='mt-8 flex flex-wrap gap-4'>
      {is_urgent && <ChipWithIcon icon={UrgentIcon} label='Urgent' className='bg-red-500/10 rounded-lg' iconClassName='text-red-500' />}
      {is_friendly && <ChipWithIcon icon={FriendlyIcon} label='Friendly' className='rounded-lg' />}
      {is_trained && <ChipWithIcon icon={GraduationHatIcon} label='Trained' className='rounded-lg' />}
      {is_vaccinated && <ChipWithIcon icon={VaccineIcon} label='Vaccinated' className='rounded-lg' />}
      {is_sterilized && <ChipWithIcon icon={NeuteredIcon} label='Sterilized' className='rounded-lg' />}
      {energy_level && <ChipWithIcon icon={EnergyIcon} label={`${capitalize(energy_level)} Energy`} className='rounded-lg' />}

    </div>
  )
}
