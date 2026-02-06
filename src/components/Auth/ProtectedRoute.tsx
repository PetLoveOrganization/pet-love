import { useAuthStore } from '@/store/auth'
import { Navigate, Outlet } from 'react-router'

export function ProtectedRoute () {
  const { isAuthenticated, loading } = useAuthStore()
  if (loading) {
    return <div>Loading...</div>
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
