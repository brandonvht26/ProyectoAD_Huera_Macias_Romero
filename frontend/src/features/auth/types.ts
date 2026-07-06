export interface Estudiante {
  id_estudiante: number
  correo_institucional: string
  nombre: string
}

export interface LoginRequest {
  correo_institucional: string
  password: string
}

export interface LoginResponse {
  token: string
  user: Estudiante
}

export interface ApiError {
  message: string
  code?: string
}
