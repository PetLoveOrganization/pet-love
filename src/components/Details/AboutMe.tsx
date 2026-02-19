import { Description as DescriptionIcon } from '@/icons/Description'

interface Props {
  description: string
}

export const AboutMe = ({ description }: Props) => {
  return (
    <>
      <div className='flex items-center gap-2 mt-8'>
        <DescriptionIcon className='size-6 text-green-pet'/>
        <h2 className='text-lg md:text-2xl font-semibold'>About me</h2>
      </div>
      <p className='mt-2 border-b pb-8 border-gray-200 '>{description}</p>
    </>
  )
}
