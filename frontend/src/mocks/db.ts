import type { Estudiante, LoginRequest } from '@/features/auth/types'
import type { CreateEntregaRequest, Entrega, Tarea } from '@/features/tasks/types'

const STUDENTS_KEY = 'aula-virtual-mock:estudiantes'
const TASKS_KEY = 'aula-virtual-mock:tareas'
const SUBMISSIONS_KEY = 'aula-virtual-mock:entregas'

interface SubmissionRecord {
  id_estudiante: number
  codigo_tarea: string
  respuesta_texto: string
  fecha_envio: string
}

const initialStudents: Estudiante[] = [
  {
    id_estudiante: 1,
    correo_institucional: 'ariel.macias@epn.edu.ec',
    nombre: 'Ariel Macías',
  },
  {
    id_estudiante: 2,
    correo_institucional: 'ardanny.romero@epn.edu.ec',
    nombre: 'Ardanny Romero',
  },
  {
    id_estudiante: 3,
    correo_institucional: 'brandon.huera@epn.edu.ec',
    nombre: 'Brandon Huera',
  },
]

const initialTasks: Tarea[] = [
  {
    codigo_tarea: 'AD-001',
    titulo: 'Ensayo sobre Docker',
    descripcion:
      'Redactar un resumen ejecutivo (mín. 800 palabras) sobre la arquitectura de contenedores Docker, incluyendo imágenes, volúmenes, redes y diferencias con máquinas virtuales.',
    fecha_limite: '2026-07-20T23:59:00.000Z',
  },
  {
    codigo_tarea: 'AD-002',
    titulo: 'Script de Replicación Master-Slave',
    descripcion:
      'Subir los comandos SQL y de configuración utilizados para levantar el contenedor Maestro y configurar la réplica en MySQL 8 con GTID.',
    fecha_limite: '2026-07-15T18:00:00.000Z',
  },
  {
    codigo_tarea: 'AD-003',
    titulo: 'Tarea Vencida - Demo Bloqueo',
    descripcion:
      'Esta tarea sirve para demostrar el bloqueo por plazo vencido. No se puede entregar.',
    fecha_limite: '2026-06-01T10:00:00.000Z',
  },
  {
    codigo_tarea: 'AD-004',
    titulo: 'Diagrama de Arquitectura del Sistema',
    descripcion:
      'Adjuntar el diagrama de componentes (NGINX, 3 nodos web, MySQL Master y Slave) en formato PDF o PNG, junto con la descripción de cada flecha.',
    fecha_limite: '2026-07-25T23:59:00.000Z',
  },
  {
    codigo_tarea: 'AD-005',
    titulo: 'Informe de Pruebas de Carga con Locust',
    descripcion:
      'Documentar los resultados de las pruebas de carga (usuarios concurrentes, latencia p95, throughput) y comparar contra los pesos definidos en NGINX.',
    fecha_limite: '2026-07-30T18:00:00.000Z',
  },
  {
    codigo_tarea: 'AD-006',
    titulo: 'Demo NGINX con Pesos (Vencida)',
    descripcion:
      'Levantar el entorno con `docker compose up --scale web=3` y demostrar la distribución de tráfico capturando los access.log de cada réplica.',
    fecha_limite: '2026-06-15T23:59:00.000Z',
  },
]

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function save<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota errors
  }
}

const students = load<Estudiante[]>(STUDENTS_KEY, initialStudents)
save(STUDENTS_KEY, students)

const tasks = load<Tarea[]>(TASKS_KEY, initialTasks)
save(TASKS_KEY, tasks)

const submissions = load<SubmissionRecord[]>(SUBMISSIONS_KEY, [])
save(SUBMISSIONS_KEY, submissions)

function persistTasks() {
  save(TASKS_KEY, tasks)
}

function persistSubmissions() {
  save(SUBMISSIONS_KEY, submissions)
}

export function getStudents(): Estudiante[] {
  return students
}

export function authenticate(req: LoginRequest): Estudiante | null {
  const student = students.find(
    (s) => s.correo_institucional.toLowerCase() === req.correo_institucional.toLowerCase()
  )
  if (!student) return null
  if (req.password !== 'epn2026') return null
  return student
}

export function listTareasForStudent(idEstudiante: number): Tarea[] {
  return tasks.map((task) => {
    const submission = submissions.find(
      (s) =>
        s.id_estudiante === idEstudiante && s.codigo_tarea === task.codigo_tarea
    )
    if (!submission) return task
    const entrega: Entrega = {
      respuesta_texto: submission.respuesta_texto,
      fecha_envio: submission.fecha_envio,
    }
    return { ...task, mi_entrega: entrega }
  })
}

export function createEntregaForStudent(
  idEstudiante: number,
  payload: CreateEntregaRequest
): { ok: true } | { ok: false; status: number; message: string } {
  const task = tasks.find((t) => t.codigo_tarea === payload.codigo_tarea)
  if (!task) {
    return { ok: false, status: 404, message: 'La tarea no existe.' }
  }

  if (new Date() > new Date(task.fecha_limite)) {
    return {
      ok: false,
      status: 400,
      message: 'El plazo para entregar esta tarea ha finalizado.',
    }
  }

  const alreadySubmitted = submissions.some(
    (s) => s.id_estudiante === idEstudiante && s.codigo_tarea === payload.codigo_tarea
  )
  if (alreadySubmitted) {
    return {
      ok: false,
      status: 409,
      message: 'Ya has entregado esta tarea anteriormente.',
    }
  }

  submissions.push({
    id_estudiante: idEstudiante,
    codigo_tarea: payload.codigo_tarea,
    respuesta_texto: payload.respuesta_texto,
    fecha_envio: new Date().toISOString(),
  })
  persistSubmissions()
  persistTasks()
  return { ok: true }
}
