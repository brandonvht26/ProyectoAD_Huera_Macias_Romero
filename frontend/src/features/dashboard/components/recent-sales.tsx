import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>S1</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Sistemas Operativos</p>
            <p className='text-sm text-muted-foreground'>
              Proyecto Bimestral
            </p>
          </div>
          <div className='font-medium text-emerald-500'>9.8 / 10</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt='Avatar' />
          <AvatarFallback>S2</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Diseño de Interfaces</p>
            <p className='text-sm text-muted-foreground'>
              Práctica de Laboratorio 3
            </p>
          </div>
          <div className='font-medium text-emerald-500'>8.5 / 10</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt='Avatar' />
          <AvatarFallback>S3</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Desarrollo Web</p>
            <p className='text-sm text-muted-foreground'>
              Control de Lectura
            </p>
          </div>
          <div className='font-medium text-red-500'>5.0 / 10</div>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>S4</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Bases de Datos</p>
            <p className='text-sm text-muted-foreground'>Taller SQL</p>
          </div>
          <div className='font-medium text-emerald-500'>10 / 10</div>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt='Avatar' />
          <AvatarFallback>S5</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Inglés Técnico</p>
            <p className='text-sm text-muted-foreground'>
              Examen Oral
            </p>
          </div>
          <div className='font-medium text-emerald-500'>8.0 / 10</div>
        </div>
      </div>
    </div>
  )
}
