import { UrgentIcon } from '@/icons/UrgentIcon'
import { RoundedButton } from '../RoundedButton'
import { PetStates as PetStatesType, SortBy, type Filters as FiltersType } from '@/types.d'
interface Props {
  petStates: PetStatesType,
  initialFilters: FiltersType,
  onQuickActionsChange: (petStates: PetStatesType) => void
  }
export const QuickActions = ({ petStates, initialFilters, onQuickActionsChange }: Props) => {
  const handleChange = (petStates: PetStatesType) => {
    onQuickActionsChange(petStates)
  }
  return (
    <header className='flex  mb-4 items-center'>
      <div className='flex-1 flex flex-wrap gap-2 items-start'>
        <RoundedButton text='All' isActive={petStates === PetStatesType.ALL} onClick={() => handleChange(PetStatesType.ALL)}/>
        <RoundedButton text='Urgent' isActive={petStates === PetStatesType.URGENT} onClick={() => handleChange(PetStatesType.URGENT)}>
          <UrgentIcon className='w-5 h-5' />
        </RoundedButton>
        <RoundedButton text='Friendly' isActive={petStates === PetStatesType.FRIENDLY} onClick={() => handleChange(PetStatesType.FRIENDLY)}/>
        <RoundedButton text='Trained' isActive={petStates === PetStatesType.TRAINED} onClick={() => handleChange(PetStatesType.TRAINED)}/>
      </div>
      <p className='flex items-center gap-2 text-nowrap self-start py-1.5'>Sort by <span>
        <select name="sort" id="sort" className='font-bold focus-visible:outline-none'
          onChange={() =>{}}
          value={initialFilters.sortBy}>
          {
            Object.values(SortBy).map((sortBy) => (
              <option key={sortBy} value={sortBy} >{sortBy}</option>
            ))
          }
        </select>
      </span></p>
    </header>
  )
}
