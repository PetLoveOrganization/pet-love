import { FormField } from '@/components/FormField'
import { GreenButton } from '@/components/GreenButton'
import { InputText } from '@/components/InputText'
import { InputTextArea } from '@/components/InputTextArea'
import { Building } from '@/icons/Building'
import { CircleCheck } from '@/icons/CircleCheck'
import { Home } from '@/icons/Home'
import { Plant } from '@/icons/Plant'
import { Point } from '@/icons/point'
import { Send } from '@/icons/Send'
import { User } from '@/icons/user'
import { adoptionSchema, type AdoptionFormData } from '@/schemas/adoptionSchema'
import type { Pet } from '@/types'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useOutletContext } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/store/auth'
import { createAdoptionRequest } from '@/services/adoptation'
import { toast } from 'sonner'

const housingOptions = {
  house: { value: 'house', label: 'House' , icon: Home },
  apartment: { value: 'apartment', label: 'Apartment' , icon: Building },
  patio: { value: 'patio', label: 'House with patio' , icon: Plant },
}

export default function AdoptForm () {
  const { pet } = useOutletContext<{ pet: Pet }>()
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: { housing: 'house' },
  })

  const onSubmit = async (data: AdoptionFormData) => {
    const { id } = pet
    try {
      await createAdoptionRequest({ data, pet_id: id })
      toast.success('Adoption request created')
      navigate(`/pets/${id}`, { replace: true })
    } catch {
      toast.error('Something went wrong, please try again later')
    }
  }

  const { phone_number, address, other_pets, motivation } = errors
  const { name: userName, email } = user!
  const { images, name, age, age_unit, species,is_sterilized, is_vaccinated , is_dewormed } = pet
  const ageText = `${age} ${age_unit}`
  const image = images.find((img) => img.is_primary)?.image_url || images[0].image_url
  const checks = {
    sterilized: {
      value: is_sterilized,
      label: 'Sterilized',
    },
    vaccinated: {
      value: is_vaccinated,
      label: 'Vaccinated',
    },
    dewormed: {
      value: is_dewormed,
      label: 'Dewormed',
    },
  }

  const textButton = isSubmitting ? 'Requesting...' : 'Request Adoption'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className='mt-4 md:mt-8 max-w-7xl mx-auto flex gap-8 flex-col lg:flex-row  items-center lg:items-start '>
        <div className='w-full lg:w-5/7 flex flex-col gap-4'>
          <article className='bg-white border-gray-100  rounded-xl shadow-sm'>
            <header className='flex items-center gap-2 p-3 md:p-6 border-b border-gray-100'>
              <div className='p-2 bg-green-pet/15 rounded-full '>
                <User className="size-6 text-green-pet "/>
              </div>
              <div>
                <h1 className='text-xl font-bold'>Personal Information</h1>
                <p className='text-sm text-lime-700/70'>Essential contact information</p>
              </div>
            </header>
            <div className='p-3 md:p-6 space-y-4'>
              <FormField title='Full Name' id='name'>
                <InputText disabled name='name' id='name' placeholder='e.g. John Doe' variant='tertiary' defaultValue={userName} hasBorder={true} className='placeholder:text-gray-500'/>
              </FormField>
              <div className='flex flex-col md:flex-row gap-4'>
                <FormField title='Email' id='email'>
                  <InputText disabled name='email' id='email' placeholder='e.g. john.doe@gmail.com' variant='tertiary' defaultValue={email} hasBorder={true} className='placeholder:text-gray-500'/>
                </FormField>
                <FormField title='Phone' id='phone_number' error={phone_number?.message}>
                  <InputText {...register('phone_number')} id='phone_number' placeholder='e.g. +123456789' variant='tertiary' hasBorder={true} className='placeholder:text-gray-500'/>
                </FormField>
              </div>
            </div>
          </article>
          <article className='bg-white border-gray-100  rounded-xl shadow-sm'>
            <header className='flex items-center gap-2 p-3 md:p-6 border-b border-gray-100'>
              <div className='p-3 bg-green-pet/15 rounded-full '>
                <Home className="size-4 text-green-pet "/>
              </div>
              <div>
                <h1 className='text-xl font-bold'>Your Home</h1>
                <p className='text-sm text-lime-700/70'>About the space for your new pet</p>
              </div>
            </header>
            <div className='p-3 md:p-6 space-y-4'>
              <FormField title='Address' id='address' error={address?.message}>
                <InputText {...register('address')} id='address' placeholder='e.g. 123 Main St' variant='tertiary' hasBorder={true} className='placeholder:text-gray-500'/>
              </FormField>
              <FormField title="Type of housing" >
                <Controller
                  name='housing'
                  control={control}
                  render={({ field }) => (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      {Object.values(housingOptions).map((option) => (
                        <button type='button' onClick={() => field.onChange(option.value)} key={option.value} className={`flex flex-col items-center gap-2 cursor-pointer border-2 border-gray-100 rounded-xl p-4 hover:border-green-pet transition-colors ${field.value === option.value ? 'border-green-pet bg-green-pet/5' : ''}`}>
                          <option.icon className='size-4 text-lime-700'/>
                          <span className='text-sm font-semibold text-gray-700'>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                />
              </FormField>
              <FormField title="Is there any other pets in your home?" id="other_pets" error={other_pets?.message}>
                <InputText {...register('other_pets')} id='other_pets' placeholder='e.g. Yes, I have a dog and a cat' variant='tertiary' hasBorder={true} className='placeholder:text-gray-500'/>
              </FormField>
              <p className='text-sm text-lime-700/70'>If you don't have another pets, you can leave this field empty</p>
            </div>
          </article>
        </div>
        <div className='min-w-full md:min-w-lg lg:min-w-auto space-y-4'>
          <article className='bg-white border-gray-100  rounded-xl shadow-sm'>
            <header className='relative'>
              <picture>
                <img className='w-full h-60 object-cover object-center rounded-t-xl' src={image} alt={name} />
              </picture>
              <div className='absolute inset-0 bg-black/5 px-4 py-2 text-white flex flex-col justify-end '>
                <h1 className='text-2xl font-bold'>{name}</h1>
                <p className='text-sm flex items-center gap-2'> {species} <Point className="size-4" /> {ageText}</p>
              </div>
            </header>
            <footer className='flex flex-wrap justify-center gap-3 p-3 md:p-4'>
              {
                Object.values(checks).map((check) => (
                  <div key={check.label} className='flex items-center gap-2 p-2 rounded-2xl bg-green-pet/5'>
                    <CircleCheck className='size-6 text-green-pet '/>
                    <p className='text-sm text-lime-6'>{check.label}</p>
                  </div>
                ))
              }
            </footer>
          </article>

          <article className='bg-white border-gray-100  rounded-xl shadow-sm p-3 md:p-6 space-y-4'>
            <header>
              <FormField title="Why do you want to adopt?" id="motivation" error={motivation?.message}>
                <InputTextArea {...register('motivation')} id='motivation' placeholder='Tell us why you want to adopt...' variant='tertiary' hasBorder={true} className='placeholder:text-gray-500'/>
              </FormField>
            </header>
            <footer className='flex justify-end'>
              <GreenButton
                type='submit'
                disabled={isSubmitting}
                className="w-full py-3 md:py-4 text-base lg:text-lg flex justify-center gap-2 group rounded-2xl"
              >
                <Send className="size-6 group-hover:translate-x-1 transition-transform" />
                {textButton}
              </GreenButton>
            </footer>
          </article>

        </div>
      </main>
    </form>
  )
}
