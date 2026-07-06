import { http, HttpResponse } from 'msw'
import {
  authenticate,
  createEntregaForStudent,
  listTareasForStudent,
} from './db'

function unauthorized(message: string) {
  return HttpResponse.json({ message }, { status: 401 })
}

function getAuthUserId(request: Request): number | null {
  const auth = request.headers.get('Authorization')
  if (!auth?.startsWith('Bearer ')) return null
  const token = auth.slice('Bearer '.length)
  // Token format: mock-jwt-<idEstudiante>
  const match = token.match(/^mock-jwt-(\d+)$/)
  return match ? Number(match[1]) : null
}

function requireUser(request: Request) {
  const userId = getAuthUserId(request)
  if (userId === null) {
    return { error: HttpResponse.json({ message: 'No autenticado.' }, { status: 401 }) }
  }
  return { userId }
}

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as {
      correo_institucional?: string
      password?: string
    }

    if (!body.correo_institucional || !body.password) {
      return HttpResponse.json(
        { message: 'Correo y contraseña son obligatorios.' },
        { status: 400 }
      )
    }

    const user = authenticate({
      correo_institucional: body.correo_institucional,
      password: body.password,
    })
    if (!user) {
      return unauthorized('Credenciales incorrectas.')
    }

    return HttpResponse.json({
      token: `mock-jwt-${user.id_estudiante}`,
      user,
    })
  }),

  http.get('/api/tareas', ({ request }) => {
    const { userId, error } = requireUser(request)
    if (error) return error
    return HttpResponse.json(listTareasForStudent(userId))
  }),

  http.post('/api/entregas', async ({ request }) => {
    const { userId, error } = requireUser(request)
    if (error) return error

    const body = (await request.json()) as {
      codigo_tarea?: string
      respuesta_texto?: string
    }

    if (!body.codigo_tarea || !body.respuesta_texto) {
      return HttpResponse.json(
        { message: 'Faltan datos obligatorios.' },
        { status: 400 }
      )
    }

    const result = createEntregaForStudent(userId, {
      codigo_tarea: body.codigo_tarea,
      respuesta_texto: body.respuesta_texto,
    })

    if (!result.ok) {
      return HttpResponse.json({ message: result.message }, { status: result.status })
    }

    return new HttpResponse(null, { status: 204 })
  }),
]
