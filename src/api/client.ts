import { API_HOST } from '@/config'
import { useAuthStore } from '@/store/auth'
import { parseError } from '@/utils/errors'

const refreshToken = (): Promise<void> => {
  return fetch(`${API_HOST}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })
    .then(async response => {
      const data = await response.json()
      if (!response.ok) {
        throw data
      }
      return data
    })
    .catch(error => {
      console.error('Error refreshing token:', error)
      throw error
    })
}
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const apiFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const url = `${API_HOST}${endpoint}`

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const config: FetchOptions = {
    ...options,
    credentials: 'include',
    headers: defaultHeaders,
  }

  let response = await fetch(url, config)

  if (response.status === 401 && endpoint !== '/auth/login') {
    if (endpoint === '/auth/refresh') {
      useAuthStore.getState().logout()
      throw new Error('Session expired')
    }

    try {
      await refreshToken()
      response = await fetch(url, config)
    } catch (error) {
      useAuthStore.getState().logout()
      throw error
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(parseError(errorData))
  }
  return response.json() as Promise<T>
}
