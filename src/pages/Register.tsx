import { FormField } from '@/components/FormField'
import { InputText } from '@/components/InputText'
import { PrincipalButton } from '@/components/PrincipalButton'
import { AlertCircle } from '@/icons/AlertCircle'
import { Done } from '@/icons/Done'
import { Lock } from '@/icons/Lock'
import { Mail } from '@/icons/Mail'
import { User } from '@/icons/user'
import { registerSchema } from '@/schemas/registerSchema'
import { register } from '@/services/users'
import { useAuthStore } from '@/store/auth'
import { parseError } from '@/utils/errors'
import { cn } from '@/utils/utils'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import z from 'zod'

function RegisterImage () {
  return (
    <div className="hidden md:block md:w-1/2 relative">
      <img
        src="/dogs.webp"
        alt="Adopción"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-8 text-white text-pretty">
        <h2 className='text-xl font-bold'>Look for your new friend today</h2>
        <p className='text-sm'>Join thousands of people who have changed the life of a rescued pet.</p>
      </div>
    </div>
  )
}

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}
export function RegisterPage () {
  const [formData, setFormData] = useState<RegisterFormData>({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    e.target.setCustomValidity('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement
    const confirmInput = form.querySelector('input[name="confirmPassword"]') as HTMLInputElement

    const result = registerSchema.safeParse(formData)
    if (!result.success) {
      const { properties } = z.treeifyError(result.error)
      if (properties?.password?.errors[0]) {
        passwordInput.setCustomValidity(properties?.password?.errors[0])
        form.reportValidity()
      }
      if (properties?.confirmPassword?.errors[0]) {
        confirmInput.setCustomValidity(properties?.confirmPassword?.errors[0])
        form.reportValidity()
      }
      return
    }
    if (form.checkValidity()) {
      setLoading(true)
      try {
        const response = await register(formData)
        const { user } = response
        login(user)
        navigate('/')
      } catch (error) {
        const errorMessage = parseError(error)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
  }

  const textButton = loading ? 'Creating account...' : 'Create account'
  return (
    <div className="grow pt-16 md:pt-14 w-full flex justify-center items-center p-4 ">
      <div className=" flex w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-xl min-h-[700px] self-center">
        <RegisterImage />
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-500 mb-8 text-sm text-pretty">Begin your journey to save a life</p>
          <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
            <FormField id="name" title="Full name" >
              <InputText
                type="text"
                required
                name='name'
                variant='secondary'
                placeholder="E.g. John Doe"
                iconPosition='left'
                hasBorder={true}
                icon={<User className='size-4 text-lime-700' />}
                onChange={handleChange}
              />
            </FormField>
            <FormField id="email" title="Email" >
              <InputText
                type="email"
                required
                name='email'
                variant='secondary'
                placeholder="example@gmail.com"
                iconPosition='left'
                hasBorder={true}
                icon={<Mail className='size-4 text-lime-700' />}
                onChange={handleChange}
              />
            </FormField>
            <FormField id="password" title="Password" >
              <InputText
                type="password"
                required
                name='password'
                variant='secondary'
                placeholder="Insert your password"
                iconPosition='left'
                hasBorder={true}
                icon={<Lock className='size-4 text-lime-700' />}
                onChange={handleChange}
              />
            </FormField>
            <FormField id="confirmPassword" title="Confirm Password" >
              <InputText
                type="password"
                required
                name='confirmPassword'
                variant='secondary'
                placeholder="Confirm your password"
                iconPosition='left'
                hasBorder={true}
                icon={<Lock className='size-4 text-lime-700' />}
                onChange={handleChange}
              />
            </FormField>
            <div className="grid grid-cols-2 gap-2 mt-1 mb-4">
              <Requirement label="6+ Chars" met={formData.password.length >= 6} />
              <Requirement label="Uppercase" met={/[A-Z]/.test(formData.password)} />
              <Requirement label="Number" met={/[0-9]/.test(formData.password)} />
              <Requirement label="Special" met={/[!@#$%^&.*]/.test(formData.password)} />
            </div>
            <PrincipalButton type='submit' className='w-full text-center py-3.5' disabled={loading}>{textButton}</PrincipalButton>
            <div className='min-h-[20px]'>
              {error && <p className='text-center text-xs text-red-500 mt-2'>{error}</p>}
            </div>
            <p className='text-center text-xs text-gray-500 mt-2'>Already have an account? <Link to='/login' className='text-green-pet font-semibold'>Sign In</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

const Requirement = ({ label, met }: { label: string; met: boolean }) => (
  <div className={cn('flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider transition-colors', met ? 'text-lime-700' : 'text-gray-400')}>
    {met ? <Done className='size-3'/> : <AlertCircle className='size-3'/>}
    {label}
  </div>
)
