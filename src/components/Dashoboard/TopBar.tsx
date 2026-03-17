import { SearchIcon } from '@/icons/SearchIcon'
import { InputText } from '../InputText'
import { AnchorButton } from '../AnchorButton'
import { useState, useEffect } from 'react'
import { useRouter } from '@/hooks/useRouter'
import { useDebounce } from '@/hooks/useDebounce'
export function TopBar () {
  const { navigateTo } = useRouter()
  const [text, setText] = useState('')
  const debouncedValue = useDebounce(text, 2000)

  useEffect(() => {
    if(debouncedValue) {
      navigateTo(`/pets?text=${debouncedValue}`)
    }
  }, [debouncedValue])
  return (
    <div className="flex justify-between items-center p-3 bg-white border-b border-gray-200 gap-8">
      <InputText
        type='search'
        placeholder='Look for a pet'
        variant='secondary'
        className='placeholder:text-gray-400 max-w-md h-8'
        icon={<SearchIcon className='size-4' />}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <AnchorButton href="/pets" >
        Explore Pets
      </AnchorButton>
    </div>
  )
}
