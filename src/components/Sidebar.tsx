import { FolderOpen } from '@/icons/FolderOpen'
import { HeartFilled } from '@/icons/HeartFilled'
import { LayoutDashboard } from '@/icons/LayoutDashboard'
import { User } from '@/icons/user'
import { useFavoriteStore } from '@/store/favorites'
import { PetLogo } from './PetLogo'
import { NavLink } from 'react-router'
import { useAuthStore } from '@/store/auth'
import { SignOut } from '@/icons/SignOut'
import { XIcon } from '@/icons/X'

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  path: string
  showBadge?: boolean
}
const MENU_ITEMS: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Home',
    path: '/profile',
  },
  {
    icon: FolderOpen,
    label: 'My Applications',
    path: '/profile/requests',
  },
  {
    icon: HeartFilled,
    label: 'Favorites',
    path: '/profile/favorites',
    showBadge: true,
  },
  {
    icon: User,
    label: 'Account',
    path: '/profile/account',
  },
]

interface SidebarProps {
  isOpen: boolean
  toggleMenu: () => void
}
export function Sidebar ({ isOpen, toggleMenu }: SidebarProps) {
  const logout = useAuthStore((state) => state.logout)
  const setFavorite = useFavoriteStore(state => state.setFavorite)
  const favCount = useFavoriteStore(state => state.favoriteIds.length)
  const { name, email } = useAuthStore(state => state.user!)
  const handleLogout = () => {
    logout()
    setFavorite([])
  }
  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}
      <aside className={ `w-64 bg-white border-r border-gray-200 flex flex-col px-3 space-y-3 pt-6 fixed inset-y-0 left-0 z-50 p-6 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10">
          <PetLogo />
          <button className="md:hidden p-2 text-gray-400" onClick={toggleMenu}>
            <XIcon className='size-6'/>
          </button>
        </div>

        <div className='bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-1'>
          <h3 className='font-semibold'>{name}</h3>
          <p className='text-gray-600 text-sm'>{email}</p>
        </div>
        <nav className='flex-1 space-y-1'>
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/profile'}
              className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-lg transition-colors
              ${isActive
              ? 'bg-green-pet font-medium'
              : 'text-gray-600 hover:bg-gray-50'}
            `}
            >
              <div className="flex items-center gap-3">
                <item.icon className='size-4'/>
                <span className="font-">{item.label}</span>
              </div>

              {item.showBadge && favCount > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  'bg-green-pet/20 font-medium'
                }`}>
                  {favCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="py-2 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
          >
            <SignOut className="w-5 h-5 me-2" />
                        Sign out
          </button>
        </div>

      </aside>
    </div>
  )
}
