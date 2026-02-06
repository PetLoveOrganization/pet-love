import { create } from 'zustand'
import type { User } from '@/types.d'
import { getUser, logout } from '@/services/users'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (userData: User) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}
export const useAuthStore = create<AuthState>((set, get) => ({
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  isAuthenticated: typeof window !== 'undefined'
    ? !!localStorage.getItem('user')
    : false,
  loading: true,
  login: async (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData))
    set({ user: userData, isAuthenticated: true })
  },
  checkAuth: async () => {
    const { user } = get()
    if (!user) {
      set({ loading: false, isAuthenticated: false })
      return
    }
    try {
      set({ loading: true })
      const user = await getUser()
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, isAuthenticated: true, loading: false })
    } catch (error) {
      console.error('Error checking authentication:', error)
      localStorage.removeItem('user')
      set({ user: null, isAuthenticated: false, loading: false })
    }
  },
  logout: async () => {
    try {
      await logout()
    } finally {
      localStorage.removeItem('user')
      set({ user: null, isAuthenticated: false })
    }
  },
}))
