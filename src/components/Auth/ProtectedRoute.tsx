import { useAuthStore } from '@/store/auth'
import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router'

export function ProtectedRoute () {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const loading = useAuthStore(state => state.loading)
  const location = useLocation()
  const context = useOutletContext()
  if (loading) {
    return <div>Loading...</div>
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet context={context} />
}
