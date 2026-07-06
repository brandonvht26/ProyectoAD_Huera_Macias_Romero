import { z } from 'zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn, Mail, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { login } from '../../api/auth-api'

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Por favor, ingrese su correo institucional.')
    .email('Debe ser un correo válido.')
    .endsWith(
      '@epn.edu.ec',
      'Debe ser un correo institucional de la EPN (@epn.edu.ec).'
    ),
  password: z.string().min(1, 'Por favor, ingrese su contraseña.'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await login({
        correo_institucional: data.email,
        password: data.password,
      })

      auth.setUser(response.user)
      auth.setAccessToken(response.token)

      const targetPath = redirectTo || '/tasks'
      navigate({ to: targetPath, replace: true })

      toast.success(`¡Bienvenido al Aula Virtual, ${response.user.nombre}!`)
    } catch (error) {
      let message = 'No se pudo iniciar sesión. Intenta de nuevo.'

      if (error instanceof AxiosError) {
        const data = error.response?.data as { message?: string } | undefined
        if (data?.message) {
          message = data.message
        } else if (error.response?.status === 401) {
          message = 'Correo o contraseña incorrectos.'
        } else if (
          error.response?.status &&
          error.response.status >= 500
        ) {
          message =
            'El servidor no pudo procesar la solicitud. Intenta más tarde.'
        }
      }

      toast.error(message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Correo Institucional'
                  autoComplete='username'
                  disabled={isSubmitting}
                  className='h-14 rounded-xl bg-transparent border border-input/60 px-4 shadow-none hover:border-foreground/50 focus-visible:border-foreground focus-visible:ring-0 transition-colors text-base placeholder:text-muted-foreground'
                  {...field}
                />
              </FormControl>
              <FormMessage className='ml-1' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder='Contraseña'
                  autoComplete='current-password'
                  disabled={isSubmitting}
                  className='h-14 rounded-xl bg-transparent border border-input/60 px-4 shadow-none hover:border-foreground/50 focus-visible:border-foreground focus-visible:ring-0 transition-colors text-base placeholder:text-muted-foreground'
                  {...field}
                />
              </FormControl>
              <div className='mt-4'>
                <p className='text-[13px] text-muted-foreground/80 leading-relaxed'>
                  Utiliza tus credenciales oficiales para iniciar sesión en los servicios académicos de la Escuela Politécnica Nacional.
                </p>
              </div>
              <FormMessage className='ml-1' />
            </FormItem>
          )}
        />
        <div className='pt-4'>
          <Button 
            className='w-full h-12 rounded-xl font-medium text-base bg-[#001F3E] text-white hover:bg-[#001F3E]/90 transition-colors shadow-none' 
            disabled={isSubmitting} 
            type='submit'
          >
            {isSubmitting ? <Loader2 className='animate-spin mr-2' /> : null}
            Iniciar Sesión
          </Button>
          
          <div className='mt-6 flex justify-center text-[13px] text-muted-foreground'>
            <p>
              ¿Olvidaste tu correo o contraseña?{' '}
              <Link to='/forgot-password' className='text-foreground font-medium hover:underline'>
                Recupérala ahora
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  )
}
