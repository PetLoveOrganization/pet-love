import { Routes, Route } from 'react-router'
import './App.css'

import { Header } from '@/components/Header'
import { Footer } from '@/components/footer'

import HomePage from '@/pages/Home'
import AdoptPage from '@/pages/Adopt'
import NotFoundPage from '@/pages/404'
import LoginPage from '@/pages/Login'
import ProfilePage from '@/pages/Profile'
import DetailsPage from '@/pages/Details'

import { ProtectedRoute } from '@/components/Auth/ProtectedRoute'
import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'
import { RegisterPage } from './pages/Register'
function App () {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  return (
    <div className='text-[#0d1b0d] flex flex-col min-h-screen grow'>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="adopt"  >
          <Route index element={<AdoptPage />} />
          <Route path=":id" element={<DetailsPage />} />
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='profile' element={<ProfilePage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
      <Footer />
    </div >
  )
}

export default App
