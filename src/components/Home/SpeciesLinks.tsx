import { Bird } from '@/icons/Bird'
import { Cat } from '@/icons/Cat'
import { Dog } from '@/icons/Dog'
import { MoreOptions } from '@/icons/MoreOptions'
import { Rabbit } from '@/icons/Rabbit'
import { NavLink } from 'react-router'

const species = [
  {
    label: 'dog',
    title: 'Dogs',
    icon: Dog,
  },
  {
    label: 'cat',
    title: 'Cats',
    icon: Cat,
  },
  {
    label: 'rabbit',
    title: 'Rabbits',
    icon: Rabbit,
  },
  {
    label: 'bird',
    title: 'Birds',
    icon: Bird,
  },
  {
    label: 'other',
    title: 'Others',
    icon: MoreOptions,
  },
]
export const SpeciesLinks = () => {
  return (
    <div className='flex mt-12 justify-center gap-2 items-stretch'>
      {species.map((item) => {
        return (

          <NavLink to={`/pets?species=${item.label}`} key={item.label} aria-label={item.label} className="text-normal rounded-lg hover:scale-110 hover:bg-green-pet/10 transition-all flex flex-col items-center gap-4 p-5 border border-lime-700/10 bg-white w-24">
            <item.icon className='size-7 text-lime-700'/>
            <p className='font-semibold text-sm'>{item.title}</p>
          </NavLink>

        )})}
    </div>
  )
}
