export interface Entrega {
  respuesta_texto: string
  fecha_envio: string
}

export interface Tarea {
  codigo_tarea: string
  titulo: string
  descripcion: string
  fecha_limite: string
  mi_entrega?: Entrega
}

export interface CreateEntregaRequest {
  codigo_tarea: string
  respuesta_texto: string
}
