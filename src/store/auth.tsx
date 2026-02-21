import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: true,
      login: async (userData: User) => {
        set({ user: userData, isAuthenticated: true, loading: false })
      },
      checkAuth: async () => {
        const currentUser = get().user
        if (!currentUser) {
          set({ loading: false, isAuthenticated: false })
          return
        }
        try {
          const user = await getUser()
          set({ user, isAuthenticated: true, loading: false })
        } catch (error: unknown) {
          if (error instanceof Error && 'status' in error) {
            const status = (error as { status: number }).status
            if (status === 401) {
              set({ user: null, isAuthenticated: false })
            }
          }
          set({ loading: false })
        }
      },

      logout: async () => {
        try {
          await logout()
        } finally {
          set({ user: null, isAuthenticated: false, loading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
