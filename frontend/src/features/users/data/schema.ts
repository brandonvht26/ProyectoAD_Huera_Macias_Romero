import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('Matriculado'),
  z.literal('Inactivo'),
  z.literal('Egresado'),
  z.literal('Suspendido'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('Estudiante'),
  z.literal('Docente'),
  z.literal('Administrativo'),
  z.literal('Ayudante'),
])

const _userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof _userSchema>
