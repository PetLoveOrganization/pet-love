import { useAuthStore } from '@/store/auth'
import { useState, useRef, useEffect } from 'react'
import { User as UserIcon } from '@/icons/user'
import { SignOut } from '@/icons/SignOut'
import { Link, NavLink } from 'react-router'
import { PetLeg } from '@/icons/PetLeg'
import { ChevronDown } from '@/icons/ChevronDown'
import { HeartFilled as HeartIcon } from '@/icons/HeartFilled'
import { useFavoriteStore } from '@/store/favorites'

export function ProfileButton () {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const setFavorite = useFavoriteStore(state => state.setFavorite)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setFavorite([])
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
        type="button"
      > <NavLink to='/account'>
          <div className='flex flex-col text-right'>
            <p className='text-sm text-gray-500'>Hello, </p>
            <p className='text-md font-semibold'>{user?.name.split(' ')[0]}</p>
          </div>
        </NavLink>
        <ChevronDown className={`w-5 h-5 transition-all  duration-300 ${isOpen ? 'rotate-180 text-lime-400'  : 'text-gray-500'}`}/>
        {/* <img
          className="w-10 h-10 rounded-full border-2 border-transparent hover:border-brand-medium transition-all"
          src={'/dog.webp'}
          alt="User menu"
        /> */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 bg-white border border-lime-700/10  rounded-lg shadow-xl w-72 overflow-hidden">
          <div className="p-3">
            <div className="flex items-center p-2 space-x-3 text-md rounded-lg">
              {/* <img className="w-10 h-10 rounded-full" src={'/dog.webp'} alt="Profile"/> */}
              <div className="overflow-hidden">
                <div className="font-semibold text-gray-500 truncate">{user?.name || 'Usuario'}</div>
                <div className="text-gray-500 text-xs truncate">{user?.email || 'email@ejemplo.com'}</div>
              </div>
              {/* {user?.role === 'admin' && (
                <span className="bg-blue-900 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded ml-auto">PRO</span>
              )} */}
            </div>
          </div>

          <ul className="px-2 pb-2 text-md text-gray-500 font-medium">
            <li>
              <Link to="/account" className="flex items-center p-2 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                <UserIcon className="w-5 h-5 me-2" />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/account/requests" className="flex items-center p-2 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                <PetLeg className="w-5 h-5 me-2" />
                Adoptions
              </Link>
            </li>
            <li>
              <Link to="/account/favorites" className="flex items-center p-2 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                <HeartIcon className="w-5 h-5 me-2" />
                Favorites
              </Link>
            </li>

            <li className="border-t border-lime-700/10 mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-red-600 hover:bg-gray-700 rounded-md transition-colors"
              >
                <SignOut className="w-5 h-5 me-2" />
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
