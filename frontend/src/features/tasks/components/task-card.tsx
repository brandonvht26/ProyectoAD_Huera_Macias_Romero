import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CheckCircle2, Clock, AlignLeft, GraduationCap } from 'lucide-react'
import { Task } from '../data/schema'
import { TaskSubmitDialog } from './task-submit-dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const isSubmitted = Boolean(task.mi_entrega)
  const deadline = new Date(task.fecha_limite)
  const isPast = new Date() > deadline

  return (
    <Card className='mb-6 overflow-hidden shadow-sm transition-shadow hover:shadow-md'>
      {/* Banner / Header */}
      <div className='flex items-center justify-between border-b border-border/50 bg-[#f5d6c6]/50 px-6 py-4 dark:bg-orange-950/40'>
        <h3 className='text-lg font-semibold text-orange-950 dark:text-orange-200'>
          {task.titulo}
        </h3>
        {isSubmitted && (
          <Badge
            variant='secondary'
            className='border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400'
          >
            <CheckCircle2 className='mr-1.5 h-3 w-3' />
            Entregada
          </Badge>
        )}
      </div>

      {/* Body */}
      <CardContent className='p-6'>
        <div className='grid grid-cols-[auto_1fr] gap-x-6 gap-y-4'>
          <div className='flex justify-center'>
            <Clock className='mt-0.5 h-5 w-5 text-muted-foreground' />
          </div>
          <div className='flex flex-col'>
            <span
              className={`font-medium capitalize ${isPast && !isSubmitted ? 'text-destructive' : 'text-foreground'}`}
            >
              {format(deadline, "EEEE, d 'de' MMMM, p", { locale: es })}
            </span>
            <span className='text-sm text-muted-foreground'>Evento de curso</span>
          </div>

          <div className='flex justify-center'>
            <AlignLeft className='mt-0.5 h-5 w-5 text-muted-foreground' />
          </div>
          <div className='whitespace-pre-wrap text-sm leading-relaxed text-foreground/90'>
            {task.descripcion}
          </div>

          <div className='flex justify-center'>
            <GraduationCap className='mt-0.5 h-5 w-5 text-muted-foreground' />
          </div>
          <div className='text-sm font-medium text-muted-foreground uppercase'>
            Aplicaciones Distribuidas (TDSD523) GR1_2026-1
          </div>
        </div>

        {/* Footer Actions */}
        <div className='mt-6 flex items-center justify-end border-t border-border/50 pt-4'>
          <TaskSubmitDialog task={task} />
        </div>
      </CardContent>
    </Card>
  )
}
