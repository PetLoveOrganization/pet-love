import { useRef, useState, useEffect, type ChangeEvent } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

import { DashboardTitle } from '@/components/Dashboard/DashboardTitle'
import { FormField } from '@/components/FormField'
import { InputText } from '@/components/InputText'
import { InputTextArea } from '@/components/InputTextArea'
import { RadioButton } from '@/components/RadioButton'
import { CheckBox } from '@/components/CheckBox'
import { petFormSchema, INITIAL_FORM_STATE } from '@/schemas/petSchema'
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js'
import { Camera } from '@/icons/Camera'
import { UploadFile } from '@/icons/UploadFile'
import { Photo } from '@/icons/Photo'
import { XIcon } from '@/icons/X'
import { Level } from '@/types.d'
import { GreenButton } from '@/components/GreenButton'
import { getAdoptionRequirements, createPet } from '@/services/pets'
import type { Requirement } from '@/types.d'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_SECONDARY_IMAGES = 4
const MAX_IMAGES = MAX_SECONDARY_IMAGES + 1

const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.webp,.gif'
const MAX_FILE_SIZE_MB = 5

const SPECIES_OPTIONS = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'rabbit', label: 'Rabbit' },
  { value: 'bird', label: 'Bird' },
  { value: 'other', label: 'Other' },
] as const

const SIZE_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
] as const

// ─── Form schema ──────────────────────────────────────────────────────────────
// We use a separate "form schema" that accepts string inputs for numeric fields
// (react-hook-form reads values as strings from native inputs).
const formSchema = petFormSchema
type FormValues = z.input<typeof formSchema>

// ─── Image entry (kept in local state, outside RHF) ──────────────────────────

interface ImageEntry {
  file: File
  previewUrl: string
  isPrimary: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validateImageFile (file: File): string | null {
  if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
    return 'Invalid format. Only JPG, PNG, WEBP or GIF files are accepted.'
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `File exceeds the ${MAX_FILE_SIZE_MB} MB limit.`
  }
  return null
}

// ─── LevelSelector ────────────────────────────────────────────────────────────

function LevelSelector ({
  label,
  value,
  onChange,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <FormField title={label} error={error}>
      <div className='flex gap-2 items-center'>
        {
          Object.entries(Level).map(([key, val],index) => (
            <button
              key={key}
              type='button'
              onClick={() => onChange(val)}
              title={key}
              className={`w-8 h-8 rounded-full border text-sm font-semibold transition-all duration-200 ${
                val === value
                  ? 'bg-lime-600 border-lime-600 text-white scale-110 shadow-md'
                  : 'border-gray-300 text-gray-500 hover:border-lime-400 hover:text-lime-600'
              }`}
            >
              {index}
            </button>
          ))
        }
        {value && (
          <span className='text-sm text-gray-500 ml-1 uppercase'>{value}</span>
        )}
      </div>
    </FormField>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PostForAdoptionPage () {
  const navigate = useNavigate()
  const [requirements, setRequirements] = useState<Requirement[]>([])

  useEffect(() => {
    getAdoptionRequirements().then(setRequirements).catch(console.error)
  }, [])

  // ── Image state (files live outside RHF) ────────────────────────────────
  const [images, setImages] = useState<ImageEntry[]>([])
  const [imageError, setImageError] = useState('')
  const primaryInputRef = useRef<HTMLInputElement>(null)
  const secondaryInputRef = useRef<HTMLInputElement>(null)

  // ── React Hook Form ──────────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    control,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues, unknown, z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: INITIAL_FORM_STATE as FormValues,
  })

  // ── Derived image values ─────────────────────────────────────────────────
  const primaryImage = images.find((img) => img.isPrimary)
  const secondaryImages = images.filter((img) => !img.isPrimary)
  const canAddSecondary = secondaryImages.length < MAX_SECONDARY_IMAGES

  // ── Watch description for character counter ──────────────────────────────
  const description = watch('description') ?? ''
  const is_vaccinated = Boolean(watch('is_vaccinated'))
  const is_sterilized = Boolean(watch('is_sterilized'))
  const is_dewormed = Boolean(watch('is_dewormed'))

  // ── Image handlers ───────────────────────────────────────────────────────

  function handlePrimaryImageChange (e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const err = validateImageFile(file)
    if (err) { setImageError(err); return }
    setImageError('')

    const previewUrl = URL.createObjectURL(file)
    setImages((prev) => {
      const withoutPrimary = prev.filter((img) => !img.isPrimary)
      return [{ file, previewUrl, isPrimary: true }, ...withoutPrimary]
    })
    clearErrors('images' as never)
    e.target.value = ''
  }

  function handleSecondaryImageChange (e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    const available = MAX_SECONDARY_IMAGES - secondaryImages.length
    const toAdd = files.slice(0, available)

    const newEntries: ImageEntry[] = []
    for (const file of toAdd) {
      const err = validateImageFile(file)
      if (err) { setImageError(err); return }
      newEntries.push({ file, previewUrl: URL.createObjectURL(file), isPrimary: false })
    }

    setImages((prev) => {
      if (prev.length + newEntries.length > MAX_IMAGES) {
        setImageError(`Maximum ${MAX_IMAGES} photos allowed.`)
        return prev
      }
      return [...prev, ...newEntries]
    })
    setImageError('')
    e.target.value = ''
  }

  function removeImage (index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImageError('')
  }

  // ── Submit ───────────────────────────────────────────────────────────────

  const onSubmit = handleSubmit(async (data) => {
    if (images.length === 0) {
      setImageError('At least one image is required.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('species', data.species)
      formData.append('breed', data.breed)
      formData.append('age', data.age.toString())
      formData.append('age_unit', data.age_unit)
      formData.append('size', data.size)
      formData.append('color', data.color)
      formData.append('gender', data.gender)
      formData.append('description', data.description)
      formData.append('location', data.location)
      formData.append('recovery_fee', data.recovery_fee.toString())

      formData.append('is_sterilized', data.is_sterilized.toString())
      if (data.sterilization_date) formData.append('sterilization_date', data.sterilization_date)

      formData.append('is_vaccinated', data.is_vaccinated.toString())
      if (data.vaccines_updated_at !== undefined) formData.append('vaccines_updated_at', data.vaccines_updated_at.toString())
      if (data.vaccines) formData.append('vaccines', data.vaccines)

      formData.append('is_dewormed', data.is_dewormed.toString())
      if (data.dewormed_info) formData.append('dewormed_info', data.dewormed_info)

      formData.append('is_friendly', data.is_friendly.toString())
      formData.append('is_trained', data.is_trained.toString())
      formData.append('is_urgent', data.is_urgent.toString())

      formData.append('energy_level', data.energy_level)
      formData.append('affection_level', data.affection_level)
      formData.append('exercise_needs', data.exercise_needs)

      data.requirement_ids.forEach((id) => formData.append('requirement_ids', id.toString()))

      // Handle images
      let primaryIndex = 0
      images.forEach((img, i) => {
        if (img.file) formData.append('images', img.file)
        if (img.isPrimary) primaryIndex = i
      })
      formData.append('primary_index', primaryIndex.toString())
      await createPet(formData)
      navigate('/dashboard/pets')
      toast.success('Pet created successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to post pet.')
    }
  })

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <form onSubmit={onSubmit} noValidate>

      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div className='flex flex-col md:flex-row items-start justify-between gap-4 mb-6'>
        <DashboardTitle
          title='Post a Pet for Adoption'
          description='Help us find the perfect home for a special companion.'
        />
        <GreenButton
          type='submit'
          disabled={isSubmitting}
          className='py-2 disabled:opacity-60 disabled:cursor-not-allowed'
        >
            Publish Pet
        </GreenButton>

      </div>

      {/* ── Two-column grid ───────────────────────────────────────────── */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>

        {/* ═══ LEFT COLUMN ════════════════════════════════════════════════ */}
        <div className='flex flex-col gap-6 items-stretch'>

          {/* Photo Gallery */}
          <section className='bg-white rounded-xl p-6 shadow-xs border border-gray-100'>
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
              <h2 className='text-lg font-bold flex items-center gap-2'>
                <span className='text-lime-600'>
                  <Photo className='size-5' />
                </span>
                Photo Gallery
              </h2>
              <span className='text-xs font-semibold text-gray-400 tracking-widest'>
                MAX. {MAX_IMAGES} PHOTOS
              </span>
            </div>

            {/* Primary photo + secondary add button */}
            <div className='flex flex-col sm:flex-row gap-3 items-stretch'>

              {/* Primary photo slot */}
              <div
                className={`relative flex-1 min-h-[200px] rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-200 ${
                  primaryImage
                    ? 'border-lime-400'
                    : 'border-gray-300 hover:border-lime-500 bg-gray-50'
                }`}
                onClick={() => primaryInputRef.current?.click()}
              >
                {primaryImage ? (
                  <>
                    <img
                      src={primaryImage.previewUrl}
                      alt='Primary photo'
                      className='w-full h-full object-cover rounded-xl'
                    />
                    <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-xl gap-1'>
                      <UploadFile className='size-7' />
                      <span className='text-white text-xs font-medium'>Change photo</span>
                    </div>
                    <span className='absolute bottom-2 left-1/2 -translate-x-1/2 bg-lime-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full'>
                      PRIMARY
                    </span>
                  </>
                ) : (
                  <div className='flex flex-col items-center gap-2 text-gray-400 select-none'>
                    <Camera className='size-10' />
                    <span className='text-sm'>Main Photo</span>
                  </div>
                )}
                <input
                  ref={primaryInputRef}
                  type='file'
                  accept={ACCEPTED_EXTENSIONS}
                  className='hidden'
                  onChange={handlePrimaryImageChange}
                />
              </div>

              {/* Single secondary add button */}
              <button
                type='button'
                disabled={!primaryImage || !canAddSecondary}
                onClick={() => secondaryInputRef.current?.click()}
                title={
                  !primaryImage
                    ? 'Upload the main photo first'
                    : !canAddSecondary
                      ? `Maximum ${MAX_SECONDARY_IMAGES} secondary photos`
                      : 'Add secondary photo'
                }
                className={`w-20 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all duration-200 shrink-0 ${
                  !primaryImage || !canAddSecondary
                    ? 'border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed'
                    : 'border-gray-300 bg-gray-50 hover:border-lime-500 hover:bg-lime-50 cursor-pointer'
                }`}
              >
                <span className='text-2xl leading-none text-gray-400'>+</span>
                <span className='text-[10px] text-gray-400 font-medium'>
                  {secondaryImages.length}/{MAX_SECONDARY_IMAGES}
                </span>
              </button>

              <input
                ref={secondaryInputRef}
                type='file'
                accept={ACCEPTED_EXTENSIONS}
                multiple
                className='hidden'
                onChange={handleSecondaryImageChange}
              />
            </div>

            {/* Secondary thumbnails strip */}
            {secondaryImages.length > 0 && (
              <div className='flex gap-2 mt-3 flex-wrap'>
                {secondaryImages.map((img, i) => {
                  const realIndex = images.indexOf(img)
                  return (
                    <div
                      key={i}
                      className='relative w-16 h-16 rounded-lg overflow-hidden border-2 border-lime-300 group'
                    >
                      <img
                        src={img.previewUrl}
                        alt={`Secondary photo ${i + 1}`}
                        className='w-full h-full object-cover'
                      />
                      <button
                        type='button'
                        onClick={() => removeImage(realIndex)}
                        className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md'
                        title='Remove'
                      >
                        <XIcon className='w-4 h-4 text-white' />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {(imageError) && (
              <p className='text-xs text-red-500 mt-2'>{imageError}</p>
            )}
            <p className='text-xs text-gray-400 mt-2'>
              Formats: JPG, PNG, WEBP, GIF · Max. {MAX_FILE_SIZE_MB} MB per image
            </p>
          </section>

          {/* Basic Information */}
          <section className='bg-white rounded-xl p-5 shadow-xs border border-gray-100'>
            <h2 className='text-lg font-bold flex items-center gap-2 mb-4'>
              <span className='text-lime-600'>
                <svg width='20' height='20' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <circle cx='12' cy='12' r='10'/>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4m0 4h.01'/>
                </svg>
              </span>
              Basic Information
            </h2>

            <div className='flex flex-col gap-4'>

              <FormField title='PET NAME' id='name' error={errors.name?.message}>
                <InputText
                  id='name'
                  variant='secondary'
                  hasBorder
                  placeholder='e.g. Luna'
                  maxLength={50}
                  {...register('name')}
                />
              </FormField>

              <div className='flex flex-col sm:flex-row gap-4'>
                <FormField title='SPECIES' id='species' error={errors.species ? 'Please select species' : ''}>
                  <div className='relative'>
                    <select
                      id='species'
                      {...register('species')}
                      className='w-full appearance-none bg-gray-50 border border-lime-600/30 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all cursor-pointer'
                    >
                      <option value=''>Select</option>
                      {SPECIES_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <svg
                      className='absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500'
                      width='14' height='14' fill='none' viewBox='0 0 24 24'
                      stroke='currentColor' strokeWidth={2.5}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7'/>
                    </svg>
                  </div>
                </FormField>

                <FormField title='GENDER' error={errors.gender ? 'Please select gender' : '' }>
                  <Controller
                    name='gender'
                    control={control}
                    render={({ field }) => (
                      <div className='flex gap-2 mt-1'>
                        {(['male', 'female'] as const).map((g) => (
                          <label
                            key={g}
                            className={`flex-1 text-center py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all ${
                              field.value === g
                                ? 'border-lime-600 bg-lime-50 text-lime-800'
                                : 'border-gray-200 text-gray-600 hover:border-lime-300'
                            }`}
                          >
                            <input
                              type='radio'
                              className='sr-only'
                              value={g}
                              checked={field.value === g}
                              onChange={() => field.onChange(g)}
                            />
                            {g === 'male' ? 'Male' : 'Female'}
                          </label>
                        ))}
                      </div>
                    )}
                  />
                </FormField>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>

                <FormField title='BREED' id='breed' error={errors.breed?.message}>
                  <InputText
                    id='breed'
                    variant='secondary'
                    hasBorder
                    placeholder='e.g. Golden Retriever'
                    maxLength={50}
                    {...register('breed')}
                  />
                </FormField>

                <div className='flex gap-2 w-full md:w-1/2'>
                  <FormField title='AGE' id='age' error={errors.age?.message}>
                    <div className='flex gap-2'>
                      <InputText
                        id='age'
                        variant='secondary'
                        hasBorder
                        placeholder='e.g. 2'
                        type='number'
                        min={1}
                        max={99}
                        {...register('age')}
                      />
                      <Controller
                        name='age_unit'
                        control={control}
                        render={({ field }) => (
                          <div className='flex gap-2'>
                            <RadioButton
                              id='age_unit_years'
                              name='age_unit'
                              text='Years'
                              textSize='sm'
                              checked={field.value === 'years'}
                              onChange={() => field.onChange('years')}
                            />
                            <RadioButton
                              id='age_unit_months'
                              name='age_unit'
                              text='Months'
                              textSize='sm'
                              checked={field.value === 'months'}
                              onChange={() => field.onChange('months')}
                            />
                          </div>
                        )}
                      />
                    </div>
                  </FormField>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>

                <FormField title='COLOR' id='color' error={errors.color?.message}>
                  <InputText
                    id='color'
                    variant='secondary'
                    hasBorder
                    placeholder='e.g. Golden'
                    maxLength={50}
                    {...register('color')}
                  />
                </FormField>

                <FormField title='LOCATION' id='location' error={errors.location?.message}>
                  <InputText
                    id='location'
                    variant='secondary'
                    hasBorder
                    placeholder='e.g. New York'
                    maxLength={50}
                    {...register('location')}
                  />
                </FormField>

              </div>

              <FormField title='RECOVERY FEE (optional)' id='recovery_fee' error={errors.recovery_fee?.message}>
                <InputText
                  id='recovery_fee'
                  variant='secondary'
                  hasBorder
                  type='number'
                  min={0}
                  placeholder='0'
                  {...register('recovery_fee')}
                />
              </FormField>

            </div>
          </section>
          <section className='bg-white rounded-xl p-5 shadow-xs border border-gray-100'>
            <h2 className='text-lg font-bold flex items-center gap-2 mb-4'>
              <span className='text-lime-600'>
                <svg width='20' height='20' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z'/>
                </svg>
              </span>
              History &amp; Personality
            </h2>

            <FormField
              title='PET DESCRIPTION'
              error={errors.description?.message}
              details={`${description.length}/500`}
            >
              <InputTextArea
                variant='secondary'
                hasBorder
                placeholder='Tell us about their character, what they enjoy, how they behave with other animals...'
                maxLength={500}
                rows={5}
                {...register('description')}
              />
            </FormField>

            {/* Behavioral booleans */}
            <div className='mt-4 flex gap-3 flex-wrap'>
              <p className='text-sm mb-1 font-medium text-gray-700 uppercase tracking-wide w-full'>
                Personality Traits
              </p>
              <Controller
                name='is_friendly'
                control={control}
                render={({ field }) => (
                  <CheckBox
                    id='is_friendly'
                    label='Friendly'
                    checked={Boolean(field.value)}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name='is_trained'
                control={control}
                render={({ field }) => (
                  <CheckBox
                    id='is_trained'
                    label='Trained'
                    checked={Boolean(field.value)}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name='is_urgent'
                control={control}
                render={({ field }) => (
                  <CheckBox
                    id='is_urgent'
                    label='Urgent'
                    checked={Boolean(field.value)}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </section>

        </div>

        {/* ═══ RIGHT COLUMN ═══════════════════════════════════════════════ */}
        <div className='flex flex-col gap-6'>
          {/* History & Personality */}

          {/* Health & Care */}
          <section className='bg-white rounded-xl p-5 shadow-xs border border-gray-100'>
            <h2 className='text-lg font-bold flex items-center gap-2 mb-4'>
              <span className='text-lime-600'>
                <svg width='20' height='20' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'/>
                </svg>
              </span>
              Health &amp; Care
            </h2>

            <div className='flex flex-col gap-3 mb-5'>
              <Controller
                name='is_vaccinated'
                control={control}
                render={({ field }) => (
                  <CheckBox id='is_vaccinated' label='Vaccinated' checked={Boolean(field.value)} onChange={field.onChange} />
                )}
              />
              {is_vaccinated && (
                <div className='ml-7 mb-2 flex flex-col gap-2'>
                  <FormField id='vaccines' error={errors.vaccines?.message as string}>
                    <InputText
                      id='vaccines'
                      variant='secondary'
                      hasBorder
                      placeholder='List vaccines (e.g. Rabies, Parvovirus)'
                      {...register('vaccines')}
                    />
                  </FormField>
                  <Controller
                    name='vaccines_updated_at'
                    control={control}
                    render={({ field }) => (
                      <CheckBox id='vaccines_updated_at' label='Vaccines up to date' checked={Boolean(field.value)} onChange={field.onChange} />
                    )}
                  />
                </div>
              )}

              <Controller
                name='is_dewormed'
                control={control}
                render={({ field }) => (
                  <CheckBox id='is_dewormed' label='Dewormed' checked={Boolean(field.value)} onChange={field.onChange} />
                )}
              />
              {is_dewormed && (
                <div className='ml-7 mb-2'>
                  <FormField id='dewormed_info' error={errors.dewormed_info?.message as string}>
                    <InputText
                      id='dewormed_info'
                      variant='secondary'
                      hasBorder
                      placeholder='Deworming details (e.g. Monthly, Last month)'
                      {...register('dewormed_info')}
                    />
                  </FormField>
                </div>
              )}

              <Controller
                name='is_sterilized'
                control={control}
                render={({ field }) => (
                  <CheckBox id='is_sterilized' label='Sterilized / Neutered' checked={Boolean(field.value)} onChange={field.onChange} />
                )}
              />
              {is_sterilized && (
                <div className='ml-7 mb-2'>
                  <FormField id='sterilization_date' error={errors.sterilization_date?.message as string}>
                    <InputText
                      id='sterilization_date'
                      type='date'
                      variant='secondary'
                      hasBorder
                      {...register('sterilization_date')}
                    />
                  </FormField>
                </div>
              )}
            </div>

            <Controller
              name='size'
              control={control}
              render={({ field }) => (
                <FormField title='SIZE' error={errors.size ? 'Please select size' : ''}>
                  <div className='flex gap-2'>
                    {SIZE_OPTIONS.map(({ value, label }) => (
                      <button
                        key={value}
                        type='button'
                        onClick={() => field.onChange(value)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          field.value === value
                            ? 'border-lime-600 bg-white text-lime-700 ring-2 ring-lime-500/20 font-bold'
                            : 'border-gray-200 text-gray-600 hover:border-lime-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </FormField>
              )}
            />
          </section>

          {/* Levels & Activity */}
          <section className='bg-white rounded-xl p-5 shadow-xs border border-gray-100'>
            <h2 className='text-lg font-bold flex items-center gap-2 mb-4'>
              <span className='text-lime-600'>
                <svg width='20' height='20' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'/>
                </svg>
              </span>
              Levels &amp; Activity
            </h2>

            <div className='flex flex-col gap-4'>
              <Controller
                name='energy_level'
                control={control}
                render={({ field }) => (
                  <LevelSelector
                    label='ENERGY LEVEL'
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.energy_level?.message}
                  />
                )}
              />
              <Controller
                name='affection_level'
                control={control}
                render={({ field }) => (
                  <LevelSelector
                    label='AFFECTION LEVEL'
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.affection_level?.message}
                  />
                )}
              />
              <Controller
                name='exercise_needs'
                control={control}
                render={({ field }) => (
                  <LevelSelector
                    label='EXERCISE NEEDS'
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.exercise_needs?.message}
                  />
                )}
              />
            </div>
          </section>

          {/* Adoption Requirements */}
          <section className='bg-white rounded-xl p-5 shadow-xs border border-gray-100'>
            <h2 className='text-lg font-bold flex items-center gap-2 mb-4'>
              <span className='text-lime-600'>
                <svg width='20' height='20' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'/>
                </svg>
              </span>
              Adoption Requirements
            </h2>

            <div className='flex flex-col gap-3'>
              {requirements.length === 0 ? (
                <p className='text-sm text-gray-500'>Loading requirements...</p>
              ) : (
                <Controller
                  name='requirement_ids'
                  control={control}
                  render={({ field }) => (
                    <>
                      {requirements.map((req) => (
                        <CheckBox
                          key={req.id}
                          id={`req-${req.id}`}
                          label={req.description}
                          checked={field.value.includes(req.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, req.id])
                            } else {
                              field.onChange((field.value as number[]).filter((id) => String(id) !== String(req.id)))
                            }
                          }}
                        />
                      ))}
                      {errors.requirement_ids && (
                        <p className='text-xs text-red-500 mt-1'>{errors.requirement_ids.message}</p>
                      )}
                    </>
                  )}
                />
              )}
            </div>
          </section>

        </div>
      </div>

      {/* ── Bottom submit row ──────────────────────────────────────────── */}
      <div className='mt-8 flex md:justify-end gap-3'>
        <GreenButton
          type='submit'
          disabled={isSubmitting}
          className='w-full md:w-auto py-2 disabled:opacity-60 disabled:cursor-not-allowed'
        >
            Publish Pet
        </GreenButton>
      </div>

    </form>
  )
}
