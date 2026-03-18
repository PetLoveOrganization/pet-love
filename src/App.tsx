import { Routes, Route } from 'react-router'
import './App.css'

import HomePage from '@/pages/Home'
import PetsPage from '@/pages/Pets'
import NotFoundPage from '@/pages/404'
import LoginPage from '@/pages/Login'
import ProfilePage from '@/pages/Profile'
import DetailsPage from '@/pages/Details'

import { ProtectedRoute } from '@/components/Auth/ProtectedRoute'
import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'
import { RegisterPage } from './pages/Register'
import AdoptForm from './pages/Adopt'
import PetDetails from './pages/PetDetails'
import { useFavoriteStore } from './store/favorites'
import { getFavoriteIds } from './services/users'
import { AdoptLayout } from './components/Layouts/AdoptLayout'
import { DashboardLayout } from './components/Layouts/DashboardLayout'
import MyApplicationsPage from './pages/MyApplicationsPage'
import { FavoritesPage } from './pages/Favorites'
function App () {
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const user = useAuthStore((state) => state.user)
  const setFavorite = useFavoriteStore( state => state.setFavorite)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if(user) {
      getFavoriteIds()
        .then((data) => {
          const { favoriteIds } = data
          setFavorite(favoriteIds)
        })
    }
  }, [user, setFavorite])
  return (
    <div className='text-[#0d1b0d] flex flex-col min-h-screen grow'>
      <Routes>
        <Route element={<AdoptLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="pets"  >
            <Route index element={<PetsPage />} />
            <Route path=":id" element={<DetailsPage />} >
              <Route index element={<PetDetails />} />
              <Route element={<ProtectedRoute />}>
                <Route path="adopt" element={<AdoptForm />} />
              </Route>
            </Route>
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path='profile' >
              <Route index element={<ProfilePage />} />
              <Route path='requests' element={<MyApplicationsPage />} />
              <Route path='favorites' element={<FavoritesPage />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </div >
  )
}

export default App
