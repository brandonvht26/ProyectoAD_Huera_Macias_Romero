import { apiClient } from '@/lib/api-client'
import type { CreateEntregaRequest, Tarea } from '../types'

export async function fetchTareas(): Promise<Tarea[]> {
  const { data } = await apiClient.get<Tarea[]>('/tareas')
  return data
}

export async function createEntrega(
  payload: CreateEntregaRequest
): Promise<void> {
  await apiClient.post('/entregas', payload)
}
