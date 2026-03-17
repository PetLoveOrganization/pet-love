import { SearchIcon } from '@/icons/SearchIcon'
import { InputText } from '../InputText'
import { AnchorButton } from '../AnchorButton'
import { useState, useEffect } from 'react'
import { useRouter } from '@/hooks/useRouter'
import { useDebounce } from '@/hooks/useDebounce'
import { Menu } from '@/icons/Menu'

interface Props {
  toggleMenu: () => void
}
export function TopBar ({ toggleMenu }: Props) {
  const { navigateTo } = useRouter()
  const [text, setText] = useState('')
  const debouncedValue = useDebounce(text, 2000)

  useEffect(() => {
    if(debouncedValue) {
      navigateTo(`/pets?text=${debouncedValue}`)
    }
  }, [debouncedValue])
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 gap-2">
      <div className='flex items-center justify-between md:hidden'>
        <button onClick={toggleMenu} className="p-2 text-gray-600">
          <Menu className='size-6'/>
        </button>
        <h2 className='text-xl font-bold'>PetLove</h2>
      </div>
      <div className='hidden md:block max-w-md w-full'>
        <InputText
          type='search'
          placeholder='Look for a pet'
          variant='secondary'
          className='placeholder:text-gray-400 h-8'
          icon={<SearchIcon className='size-4' />}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <AnchorButton href="/pets" >
        Explore Pets
      </AnchorButton>
    </div>
  )
}
