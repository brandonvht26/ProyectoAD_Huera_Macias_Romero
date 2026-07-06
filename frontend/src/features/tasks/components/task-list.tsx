import { Inbox } from 'lucide-react'
import { Task } from '../data/schema'
import { TaskCard } from './task-card'

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className='flex flex-col items-center justify-center gap-2 py-12 text-center'>
        <div className='flex size-12 items-center justify-center rounded-full bg-muted'>
          <Inbox className='size-6 text-muted-foreground' />
        </div>
        <p className='text-lg font-medium'>Aún no tienes tareas asignadas.</p>
        <p className='text-sm text-muted-foreground'>
          Cuando tu docente publique una tarea, aparecerá aquí.
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      {tasks.map((task) => (
        <TaskCard key={task.codigo_tarea} task={task} />
      ))}
    </div>
  )
}
