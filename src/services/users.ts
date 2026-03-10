import { apiFetch } from '@/api/client'
import type { LoginParams, AuthResponse, RegisterParams, User } from '@/types'

export const login = ({ email, password }: LoginParams): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
}

export const register = ({ name, email, password }: RegisterParams): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  })
}

export const logout = (): Promise<void> => {
  return apiFetch<void>('/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })

}

export const getUser = (): Promise<User> => {
  return apiFetch<User>('/account/me', {
    credentials: 'include',
  })
}

export const getFavoriteIds = (): Promise<{favoriteIds: string[]}> => {
  return apiFetch<{favoriteIds: string[]}>('/account/favorites/ids', {
    credentials: 'include',
  })
}
