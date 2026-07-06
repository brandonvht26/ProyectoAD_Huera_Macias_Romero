import { useState } from 'react'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import type { Task } from '../data/schema'
import { getApiErrorMessage, isPastDeadline, useSubmitTask } from '../hooks/use-tasks'

const MIN_RESPONSE_LENGTH = 1
const MAX_RESPONSE_LENGTH = 4000

interface TaskSubmitDialogProps {
  task: Task
}

export function TaskSubmitDialog({ task }: TaskSubmitDialogProps) {
  const [open, setOpen] = useState(false)
  const [response, setResponse] = useState('')

  const submittedResponse = task.mi_entrega?.respuesta_texto
  const isSubmitted = Boolean(submittedResponse)
  const isPastDue = isPastDeadline(task.fecha_limite)
  const canEdit = !isSubmitted && !isPastDue

  const submitMutation = useSubmitTask()

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setResponse('')
    }
    setOpen(next)
  }

  const handleSubmit = () => {
    const trimmed = response.trim()
    if (trimmed.length < MIN_RESPONSE_LENGTH) {
      toast.error('La respuesta no puede estar vacía.')
      return
    }
    if (trimmed.length > MAX_RESPONSE_LENGTH) {
      toast.error(
        `La respuesta no puede superar los ${MAX_RESPONSE_LENGTH} caracteres.`
      )
      return
    }

    submitMutation.mutate(
      { codigo_tarea: task.codigo_tarea, respuesta_texto: trimmed },
      {
        onSuccess: () => {
          toast.success('Tarea entregada correctamente.', {
            description: `Tu respuesta de "${task.titulo}" fue registrada.`,
          })
          setOpen(false)
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              toast.error('Tu sesión expiró. Vuelve a iniciar sesión.')
              return
            }
            if (error.response?.status === 409) {
              toast.error('Ya has entregado esta tarea anteriormente.')
              return
            }
            if (error.response?.status === 400) {
              toast.error('El plazo para entregar esta tarea ha finalizado.')
              return
            }
          }
          toast.error(
            getApiErrorMessage(error, 'No se pudo registrar la entrega.')
          )
        },
      }
    )
  }

  const triggerButton = (
    <Button
      variant={isSubmitted ? 'secondary' : 'default'}
      size='sm'
      disabled={isPastDue && !isSubmitted}
    >
      {isSubmitted
        ? 'Ver Entrega'
        : isPastDue
          ? 'Plazo Vencido'
          : 'Entregar Tarea'}
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {isPastDue && !isSubmitted ? (
        <Tooltip>
          <TooltipTrigger asChild>{triggerButton}</TooltipTrigger>
          <TooltipContent>
            <p>El plazo de entrega ha finalizado</p>
          </TooltipContent>
        </Tooltip>
      ) : isSubmitted ? (
        <Tooltip>
          <TooltipTrigger asChild>{triggerButton}</TooltipTrigger>
          <TooltipContent>
            <p>Ya entregada · click para ver tu respuesta</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      )}

      <DialogContent className='sm:max-w-[520px]'>
        <DialogHeader>
          <DialogTitle>{task.titulo}</DialogTitle>
          <DialogDescription>
            <span className='font-medium'>{task.codigo_tarea}</span>
            {' · '}
            Fecha límite:{' '}
            {format(new Date(task.fecha_limite), "PPP 'a las' p", {
              locale: es,
            })}
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-4 py-2'>
          <div>
            <h4 className='mb-1 text-sm font-medium leading-none'>
              Descripción
            </h4>
            <p className='text-sm text-muted-foreground'>{task.descripcion}</p>
          </div>

          {isSubmitted ? (
            <Alert className='border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400'>
              <CheckCircle2 className='h-4 w-4' />
              <AlertTitle>Ya has entregado esta tarea.</AlertTitle>
              <AlertDescription>
                <div className='mt-2 rounded-md border border-green-500/20 bg-background/60 p-3 text-sm text-foreground'>
                  {submittedResponse}
                </div>
              </AlertDescription>
            </Alert>
          ) : isPastDue ? (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Plazo finalizado</AlertTitle>
              <AlertDescription>
                El plazo para entregar esta tarea ha vencido. No se permiten
                más entregas.
              </AlertDescription>
            </Alert>
          ) : (
            <div className='grid gap-2'>
              <label htmlFor='response' className='text-sm font-medium'>
                Tu Respuesta
              </label>
              <Textarea
                id='response'
                placeholder='Escribe aquí tu respuesta a la tarea...'
                rows={5}
                value={response}
                maxLength={MAX_RESPONSE_LENGTH}
                onChange={(e) => setResponse(e.target.value)}
                disabled={submitMutation.isPending}
              />
              <p className='text-right text-xs text-muted-foreground'>
                {response.length}/{MAX_RESPONSE_LENGTH}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => handleOpenChange(false)}
            disabled={submitMutation.isPending}
          >
            {isSubmitted ? 'Cerrar' : 'Cancelar'}
          </Button>
          {canEdit && (
            <Button
              onClick={handleSubmit}
              disabled={submitMutation.isPending || !response.trim()}
            >
              {submitMutation.isPending ? (
                <Loader2 className='animate-spin' />
              ) : (
                <Send />
              )}
              Enviar Respuesta
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
