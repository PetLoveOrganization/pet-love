import { OptionButton } from '@/components/chips/OptionButton'
import { DashboardTitle } from '@/components/Dashboard/DashboardTitle'
import { FormField } from '@/components/FormField'
import { GreenButton } from '@/components/GreenButton'
import { InputText } from '@/components/InputText'
import { HOUSING_OPTIONS } from '@/constants'
import { housingInformationSchema, type HousingInformationFormData } from '@/schemas/adoptionSchema'
import { getAdopterProfile, updateAdopterProfile } from '@/services/users'
import { useAuthStore } from '@/store/auth'
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ProfilePage () {
  const user = useAuthStore((state) => state.user)
  const { name: userName, email } = user!

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<HousingInformationFormData>({
    resolver: zodResolver(housingInformationSchema),
    defaultValues: {
      housing: 'house',
    },
  })

  const onSubmit = async (data: HousingInformationFormData) => {
    try {
      await updateAdopterProfile(data)
      toast.success('Profile updated successfully')
    } catch {
      toast.error('Failed to update profile')
    }
  }

  useEffect(() => {
    getAdopterProfile().then((profile) => {
      reset(profile)
    })
  }, [])

  const { phone_number, address, other_pets } = errors
  const textButton = isSubmitting ? 'Saving...' : 'Save changes'
  return (
    <>
      <DashboardTitle title="Profile Settings" description="Manage your account information and preferences" />
      <section className='bg-white rounded-xl p-6 shadow-xs mt-6 flex flex-col gap-6'>
        <h2 className='text-xl font-semibold'>
          Personal Information
        </h2>
        <div className='flex flex-col md:flex-row gap-6'>
          <FormField  title='Full Name' id='name'>
            <InputText disabled placeholder='e.g. John Doe' defaultValue={userName} hasBorder={true}/>
          </FormField>
          <FormField title='Email' id='email'>
            <InputText disabled placeholder='e.g. [EMAIL_ADDRESS]' defaultValue={email} hasBorder={true}/>
          </FormField>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white rounded-xl p-6 shadow-xs mt-6 flex flex-col gap-6'>
        <h2 className='text-xl font-semibold'>
          Housing Information
        </h2>
        <div className='flex flex-col md:flex-row gap-6'>
          <FormField title='Phone' id='phone_number' error={phone_number?.message}>
            <InputText {...register('phone_number')} id='phone_number' placeholder='e.g. +123456789' hasBorder={true} className='placeholder:text-gray-500'/>
          </FormField>
          <FormField title='Address' id='address' error={address?.message}>
            <InputText {...register('address')} id='address' placeholder='e.g. 123 Main St' hasBorder={true} className='placeholder:text-gray-500'/>
          </FormField>

        </div>
        <FormField title="Type of housing" >
          <Controller
            name='housing'
            control={control}
            render={({ field }) => (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {Object.values(HOUSING_OPTIONS).map((option) => (
                  <OptionButton
                    key={option.value}
                    icon={option.icon}
                    label={option.label}
                    isSelected={field.value === option.value}
                    onClick={() => field.onChange(option.value)}
                  />
                ))}
              </div>
            )}
          />
        </FormField>
        <div className='flex flex-col gap-2'>
          <FormField title="Is there any other pets in your home?" id="other_pets" error={other_pets?.message}>
            <InputText {...register('other_pets')} id='other_pets' placeholder='e.g. Yes, I have a dog and a cat' hasBorder={true} className='placeholder:text-gray-500'/>
          </FormField>
          <p className='text-sm text-lime-700/70'>If you don't have another pets, you can leave this field empty</p>
        </div>
        <GreenButton type='submit' disabled={isSubmitting} className='md:self-end px-6'>{textButton}</GreenButton>
      </form>
    </>
  )
}
