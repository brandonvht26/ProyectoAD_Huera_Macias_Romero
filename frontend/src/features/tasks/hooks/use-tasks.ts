import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createEntrega, fetchTareas } from '../api/tasks-api'
import type { CreateEntregaRequest, Tarea } from '../types'

export const tasksQueryKey = ['tareas'] as const

export function useTasks() {
  return useQuery<Tarea[]>({
    queryKey: tasksQueryKey,
    queryFn: fetchTareas,
  })
}

export function useSubmitTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEntregaRequest) => createEntrega(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey })
    },
  })
}

export function isPastDeadline(deadline: string | Date): boolean {
  return new Date() > new Date(deadline)
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Ocurrió un error inesperado.'
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
    if (error.response?.status === 401) {
      return 'Tu sesión ha expirado. Inicia sesión nuevamente.'
    }
    if (error.response?.status === 403) {
      return 'No tiene permisos para realizar esta acción.'
    }
    if (error.response?.status === 404) {
      return 'Recurso no encontrado.'
    }
    if (error.response?.status && error.response.status >= 500) {
      return 'El servidor no pudo procesar la solicitud. Intenta más tarde.'
    }
  }
  return fallback
}
