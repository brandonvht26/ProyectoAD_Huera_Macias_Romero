import { GravityStarsBackground } from '@/components/backgrounds/gravity-stars-background'
import logoEpn from '@/assets/eLearn.png'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='relative grid h-svh w-full items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <GravityStarsBackground starsCount={250} />
      </div>
      <div className='relative z-10 mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6 p-4 sm:p-8'>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <img 
            src={logoEpn} 
            alt='eLearn Logo' 
            className='h-16 w-auto object-contain drop-shadow-md' 
          />
          <div className='text-center'>
            <h1 className='text-2xl font-bold tracking-tight text-foreground'>Aula Virtual</h1>
            <p className='text-sm text-muted-foreground font-medium'>Escuela Politécnica Nacional</p>
          </div>
        </div>
        <div className='w-full'>
          {children}
        </div>
      </div>
    </div>
  )
}
