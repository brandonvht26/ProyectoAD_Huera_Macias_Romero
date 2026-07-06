import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AlertCircle, RefreshCcw, Plus, Calendar as CalendarIcon, Filter, Layers, EyeOff } from 'lucide-react'
import { TaskList } from './components/task-list'
import { TaskListSkeleton } from './components/task-list-skeleton'
import { getApiErrorMessage, useTasks } from './hooks/use-tasks'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function Tasks() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    dataUpdatedAt,
    isFetching,
  } = useTasks()

  return (
    <>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-6 lg:flex-row'>
        {/* Left Column: Tasks */}
        <div className='flex flex-1 flex-col gap-6'>
          {/* Header */}
          <div className='flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4'>
            <div className='flex items-center gap-4'>
              <h2 className='text-2xl font-bold tracking-tight text-foreground'>
                Eventos Próximos
              </h2>
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='outline' className='hidden sm:flex'>
                <Filter className='mr-2 size-4' />
                Todos los cursos
              </Button>
              <Button className='bg-[#001F3E] text-white hover:bg-[#001F3E]/90'>
                <Plus className='mr-2 size-4' />
                Nuevo evento
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => refetch()}
                    disabled={isRefetching}
                    aria-label='Actualizar'
                  >
                    <RefreshCcw
                      className={isRefetching ? 'animate-spin' : undefined}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Volver a consultar el servidor</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {isLoading ? (
            <TaskListSkeleton />
          ) : isError ? (
            <div className='flex flex-1 flex-col items-center justify-center gap-3 rounded-md border border-dashed p-6 text-center text-sm'>
              <div className='flex size-10 items-center justify-center rounded-full bg-destructive/10'>
                <AlertCircle className='size-5 text-destructive' />
              </div>
              <p className='font-medium text-destructive'>
                No se pudieron cargar las tareas.
              </p>
              <p className='text-muted-foreground'>
                {getApiErrorMessage(error)}
              </p>
              <Button
                variant='outline'
                size='sm'
                onClick={() => refetch()}
                disabled={isRefetching}
              >
                <RefreshCcw
                  className={isRefetching ? 'animate-spin' : undefined}
                />
                Reintentar
              </Button>
            </div>
          ) : (
            <TaskList tasks={data ?? []} />
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className='flex w-full flex-col gap-6 lg:w-[320px] shrink-0'>
          <Card className='shadow-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-lg font-medium'>
                <Layers className='size-5 text-muted-foreground' />
                Claves de eventos
              </CardTitle>
            </CardHeader>
            <CardContent className='grid gap-3 text-sm'>
              {[
                { label: 'Ocultar eventos del sitio', color: 'bg-green-500' },
                { label: 'Ocultar eventos de categoría', color: 'bg-purple-500' },
                { label: 'Ocultar eventos de curso', color: 'bg-orange-500' },
                { label: 'Ocultar eventos de grupo', color: 'bg-yellow-500' },
                { label: 'Ocultar eventos de usuario', color: 'bg-blue-500' },
              ].map((item, idx) => (
                <div key={idx} className='flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-1.5 -mx-1.5 rounded-md transition-colors'>
                  <div className={`flex size-6 shrink-0 items-center justify-center rounded ${item.color}/10`}>
                    <EyeOff className={`size-3.5 ${item.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className='text-foreground/80'>{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className='shadow-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-lg font-medium'>
                <CalendarIcon className='size-5 text-muted-foreground' />
                Vista mensual
              </CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center'>
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md border shadow-sm w-full bg-card"
              />
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
