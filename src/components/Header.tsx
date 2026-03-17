import { useAuthStore } from '@/store/auth'
import { AnchorButton } from './AnchorButton'
import { NavLink } from 'react-router'
import { ProfileButton } from './Header/ProfileButton'
import { PetLogo } from './PetLogo'
const navItems = [
  {
    label: 'home',
    title: 'Home',
    href: '/',
  },
  {
    label: 'adopt',
    title: 'Adopt',
    href: '/pets',
  },
  {
    label: 'donate',
    title: 'Donate',
    href: '/donate',
  },
]
export const Header = () => {
  const isAuthenticated = useAuthStore(store => store.isAuthenticated)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-2 bg-white shadow-sm shadow-green-200/20 px-3">
      <div className='flex-1'>
        <PetLogo />
      </div>
      <nav className="flex gap-3">
        {navItems.map((item) => (
          <NavLink key={item.label} aria-label={item.label} to={item.href} className={({ isActive }) => `text-normal py-2 px-2 rounded-lg hover:scale-110 hover:bg-green-pet/10 transition-all ${isActive ? ' text-green-pet font-semibold' : ''}`}>
            {item.title}
          </NavLink>
        ))}
      </nav>
      <div className="flex-1 flex justify-end" >
        {isAuthenticated ? (
          <ProfileButton />
        ) : (
          <AnchorButton href="/login" >
            Sign In
          </AnchorButton>
        )}
      </div>
    </header>
  )
}
