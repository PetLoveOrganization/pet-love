import { InputText } from '@/components/InputText'
import { LocationIcon } from '@/icons/LocationIcon'
import { PetLeg } from '@/icons/PetLeg'
import { SearchIcon } from '@/icons/SearchIcon'
import { PrincipalButton } from '../PrincipalButton'
import { useRouter } from '@/hooks/useRouter'
export const SearchFormSection = () => {
  const navigateTo = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const text = form.get('text') as string
    const location = form.get('location') as string
    const url = `/pets?${text ? `text=${encodeURIComponent(text)}` : ''}${location ? `&location=${encodeURIComponent(location)}` : ''}`
    navigateTo.navigateTo(url)
  }

  return (
    <form onSubmit={handleSubmit} className=' max-w-3xl mx-auto flex gap-3 w-full bg-white p-3 rounded-lg border border-lime-400/20 shadow-lg '>
      <InputText
        name='text'
        placeholder='Search by name, race.'
        icon={<SearchIcon className='size-5 text-lime-700'/>}
        iconPosition='left'
        hasBorder={false}
        variant='primary'
      />
      <InputText
        placeholder='Location (city)' name='location'
        icon={<LocationIcon className='size-5 text-lime-700' />}
        iconPosition='left'
        hasBorder={false}
        variant='primary'
      />
      <PrincipalButton type='submit' className='py-3 gap-1'>
        <PetLeg className='size-5'/>
              Search
      </PrincipalButton>
    </form>
  )
}
