import { InputText } from '@/components/InputText'
import { useState } from 'react'
import { Eye as EyeIcon } from '@/icons/eye'
import { PrincipalButton } from '@/components/PrincipalButton'
import { Link, useNavigate } from 'react-router'
import { login as loginFetch } from '@/services/users'
import { parseError } from '@/utils/errors'
import { useAuthStore } from '@/store/auth'
function LoginImage () {
  return (
    <div className="hidden md:block md:w-1/2 relative">
      <img
        src="/login.webp"
        alt="Adopción"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute bottom-10 left-10 right-10 bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30 text-white">
        <p  style={{ fontStyle: 'italic' }} className="text-pretty text-sm">"Adopting changed my life and Bruno's forever. Thank you, Pet Love."</p>
        <p className="mt-2 text-xs font-semibold text-pretty">— Elena, Bruno's Owner</p>
      </div>
    </div>
  )
}
export default function LoginPage () {
  const [seePassword, setSeePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string
    const password = form.get('password') as string
    setLoading(true)
    try {
      const response = await loginFetch({ email, password })
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

  const textButton = loading ? 'Signing in...' : 'Sign In'
  return (
    <main className="grow mt-14 w-full flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="flex w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-xl min-h-[600px] self-center">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-500 mb-8 text-sm text-pretty">Sign in to continue with your adoption journey</p>
          <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 '>
              <label htmlFor='email'>Email</label>
              <InputText
                type='email'
                required
                name='email'
                variant='secondary'
                id='email' placeholder='example@gmail.com' className='pl-2 font-light'  />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='password'>Password</label>

              <InputText
                type={seePassword ? 'text' : 'password'}
                required
                iconPosition='right'
                icon = {
                  <button type='button' onClick={() => setSeePassword(!seePassword)} className='cursor-pointer hover:bg-gray-200 p-2 -mr-1.5 rounded-full transition-colors shrink-0 absolute right-2 top-1/2 -translate-y-1/2'>
                    {seePassword ? <EyeIcon className='size-4 text-lime-600'/> : <EyeIcon className='size-4 text-gray-500'/>}
                  </button>
                }
                name='password'
                variant='secondary'
                id='password' placeholder='Insert your password' className='pl-2 font-light relative' />

            </div>
            <p className='text-end font-semibold text-sm text-green-pet'>Did you forget your password?</p>
            <PrincipalButton type='submit' className='w-full text-center py-3.5' disabled={loading}>{textButton}</PrincipalButton>
            {error && <p className='text-center text-xs text-red-500 mt-2'>{error}</p>}
            <p className='text-center text-xs text-gray-500 mt-2'>Don't have an account? <Link to='/register' className='text-green-pet font-semibold'>Sign Up</Link></p>
          </form>
        </div>
        <LoginImage />
      </div>
    </main>

  )
}
