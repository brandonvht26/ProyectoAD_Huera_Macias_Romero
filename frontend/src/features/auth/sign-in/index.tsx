import { useSearch } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { UserAuthForm } from './components/user-auth-form'
import { MathWavesBackground } from '@/components/backgrounds/math-waves-background'
import { BubbleBackground } from '@/components/backgrounds/bubble-background'
import logoEpn1 from '@/assets/LOGO_EPN1.svg'
import { cn } from '@/lib/utils'

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })

  return (
    <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative lg:p-8 h-full flex flex-col justify-center bg-background overflow-hidden'>
        
        <div className='relative z-10 mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[450px]'>
          
          <div className='flex flex-col space-y-10 bg-transparent p-4 sm:p-8'>
            
            <div className='flex flex-col space-y-4 text-left mb-4'>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className='mb-4 relative flex items-center'
              >
                {/* Aura sutil detrás del logo */}
                <div className="absolute -left-4 w-32 h-32 bg-[#001F3E]/5 blur-3xl rounded-full" />
                
                <div className="flex items-center space-x-5 sm:space-x-6 relative z-10">
                  <img src={logoEpn1} alt='Logo EPN' className='h-24 sm:h-28 w-auto drop-shadow-md' />
                  
                  {/* Texto acompañante elegante */}
                  <div className="flex flex-col border-l-2 border-border/60 pl-5 sm:pl-6 py-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#001F3E]/60 font-bold mb-1">
                      Portal Oficial
                    </span>
                    <span className="text-sm font-medium text-foreground/90 leading-tight">
                      Sistema<br/>Académico EPN
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-3xl font-semibold tracking-tight text-foreground'
              >
                Iniciar Sesión
              </motion.h1>
            </div>
            
            <UserAuthForm redirectTo={redirect} />
          </div>

        </div>
      </div>

      <div
        className={cn(
          'relative h-full overflow-hidden border-l bg-muted max-lg:hidden flex flex-col items-center justify-center'
        )}
      >
        <BubbleBackground 
          interactive={true} 
          className="absolute inset-0 bg-transparent"
          colors={{
            first: '235, 240, 255',
            second: '245, 235, 255',
            third: '230, 245, 255',
            fourth: '250, 245, 255',
            fifth: '255, 255, 255',
            sixth: '240, 250, 255',
          }}
        >
          <div className="absolute inset-0 z-10 pointer-events-none">
            <MathWavesBackground />
          </div>
          
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none z-20" />
        </BubbleBackground>
      </div>
    </div>
  )
}
