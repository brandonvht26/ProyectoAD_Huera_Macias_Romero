import { GraduationCap, Shield, Users, BookOpen } from 'lucide-react'
import { type UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['Matriculado', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['Inactivo', 'bg-neutral-300/40 border-neutral-300'],
  ['Egresado', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'Suspendido',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const roles = [
  {
    label: 'Docente',
    value: 'Docente',
    icon: Shield,
  },
  {
    label: 'Estudiante',
    value: 'Estudiante',
    icon: GraduationCap,
  },
  {
    label: 'Ayudante',
    value: 'Ayudante',
    icon: Users,
  },
  {
    label: 'Administrativo',
    value: 'Administrativo',
    icon: BookOpen,
  },
] as const
