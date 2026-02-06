import { Header } from '@/components/Header'
import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from '@/pages/Home'
import AdoptPage from '@/pages/Adopt'
import NotFoundPage from '@/pages/404'
import { Footer } from '@/components/footer'
import LoginPage from './pages/Login'
import ProfilePage from './pages/Profile'
import { ProtectedRoute } from './components/Auth/ProtectedRoute'
import { useAuthStore } from './store/auth'
import { useEffect } from 'react'
function App () {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  return (
    <div className='text-[#0d1b0d] flex flex-col min-h-screen'>
      <Header />
      <main className='grow'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adopt" element={<AdoptPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </main>
      <Footer />
    </div >
  )
}

export default App
