import { apiFetch } from '@/api/client'
import type { LoginParams, LoginResponse, User } from '@/types'

export const login = ({ email, password }: LoginParams): Promise<LoginResponse> => {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
}

export const logout = (): Promise<void> => {
  return apiFetch<void>('/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })

}

export const getUser = (): Promise<User> => {
  return apiFetch<User>('/auth/me', {
    credentials: 'include',
  })
}

