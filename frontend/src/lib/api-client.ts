import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth-store'
import { useNodeStore } from '@/stores/node-store'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().auth.accessToken
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    const servedBy = response.headers['x-served-by']
    if (servedBy) {
      useNodeStore.getState().setServedBy(servedBy)
    }
    return response
  },
  (error) => {
    if (
      error instanceof axios.AxiosError &&
      error.response?.status === 401
    ) {
      const { auth } = useAuthStore.getState()
      if (auth.accessToken) {
        auth.reset()
        if (
          typeof window !== 'undefined' &&
          !window.location.pathname.startsWith('/sign-in')
        ) {
          const redirect = window.location.pathname + window.location.search
          window.location.href = `/sign-in?redirect=${encodeURIComponent(redirect)}`
        }
      }
    }
    return Promise.reject(error)
  }
)
