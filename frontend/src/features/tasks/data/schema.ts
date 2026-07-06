import { z } from 'zod'

export const entregaSchema = z.object({
  respuesta_texto: z.string(),
  fecha_envio: z.string(),
})

export const taskSchema = z.object({
  codigo_tarea: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  fecha_limite: z.string(),
  mi_entrega: entregaSchema.optional(),
})

export type Task = z.infer<typeof taskSchema>
export type Entrega = z.infer<typeof entregaSchema>
