import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, type RenderResult } from 'vitest-browser-react'
import { type Locator, userEvent } from 'vitest/browser'
import { AxiosError } from 'axios'
import { UserAuthForm } from './user-auth-form'

const VALID_EMAIL = 'ariel.macias@epn.edu.ec'
const VALID_PASSWORD = 'epn-password-2026'

const { navigate, setUserMock, setAccessTokenMock, loginMock } = vi.hoisted(
  () => ({
    navigate: vi.fn(),
    setUserMock: vi.fn(),
    setAccessTokenMock: vi.fn(),
    loginMock: vi.fn(),
  })
)

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: () => ({
    auth: {
      setUser: setUserMock,
      setAccessToken: setAccessTokenMock,
    },
  }),
}))

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    useNavigate: () => navigate,
    Link: ({
      children,
      to,
      className,
      ...rest
    }: {
      children?: React.ReactNode
      to: string
      className?: string
    }) => (
      <a href={to} className={className} {...rest}>
        {children}
      </a>
    ),
  }
})

vi.mock('@/features/auth/api/auth-api', () => ({
  login: loginMock,
}))

describe('UserAuthForm', () => {
  describe('Rendering', () => {
    let screen: RenderResult
    let emailInput: Locator
    let passwordInput: Locator
    let signInButton: Locator

    beforeEach(async () => {
      vi.clearAllMocks()
      screen = await render(<UserAuthForm />)
      emailInput = screen.getByLabelText(/Correo Institucional/i)
      passwordInput = screen.getByLabelText(/Contraseña/i)
      signInButton = screen.getByRole('button', { name: /Iniciar sesión/i })
    })

    it('renders email, password and submit button', async () => {
      await expect.element(emailInput).toBeInTheDocument()
      await expect.element(passwordInput).toBeInTheDocument()
      await expect.element(signInButton).toBeInTheDocument()
    })

    it('rejects non-institutional emails via Zod', async () => {
      await userEvent.fill(emailInput, 'ariel@gmail.com')
      await userEvent.fill(passwordInput, VALID_PASSWORD)
      await userEvent.click(signInButton)

      await expect
        .element(screen.getByText(/correo institucional de la EPN/i))
        .toBeInTheDocument()
      expect(loginMock).not.toHaveBeenCalled()
    })

    it('rejects empty password', async () => {
      await userEvent.fill(emailInput, VALID_EMAIL)
      await userEvent.fill(passwordInput, '')
      await userEvent.click(signInButton)

      await expect
        .element(screen.getByText(/ingrese su contraseña/i))
        .toBeInTheDocument()
      expect(loginMock).not.toHaveBeenCalled()
    })
  })

  describe('Successful login', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      loginMock.mockResolvedValue({
        token: 'jwt-abc',
        user: {
          id_estudiante: 1,
          correo_institucional: VALID_EMAIL,
          nombre: 'Ariel Macías',
        },
      })
    })

    it('calls login, stores user/token and navigates to /tasks by default', async () => {
      const screen = await render(<UserAuthForm />)

      await userEvent.fill(
        screen.getByLabelText(/Correo Institucional/i),
        VALID_EMAIL
      )
      await userEvent.fill(screen.getByLabelText(/Contraseña/i), VALID_PASSWORD)
      await userEvent.click(
        screen.getByRole('button', { name: /Iniciar sesión/i })
      )

      await vi.waitFor(() => expect(loginMock).toHaveBeenCalledOnce())
      expect(loginMock).toHaveBeenCalledWith({
        correo_institucional: VALID_EMAIL,
        password: VALID_PASSWORD,
      })
      expect(setUserMock).toHaveBeenCalledWith({
        id_estudiante: 1,
        correo_institucional: VALID_EMAIL,
        nombre: 'Ariel Macías',
      })
      expect(setAccessTokenMock).toHaveBeenCalledWith('jwt-abc')

      await vi.waitFor(() =>
        expect(navigate).toHaveBeenCalledWith({ to: '/tasks', replace: true })
      )
    })

    it('navigates to redirectTo when provided', async () => {
      const screen = await render(<UserAuthForm redirectTo='/settings' />)

      await userEvent.fill(
        screen.getByLabelText(/Correo Institucional/i),
        VALID_EMAIL
      )
      await userEvent.fill(screen.getByLabelText(/Contraseña/i), VALID_PASSWORD)
      await userEvent.click(
        screen.getByRole('button', { name: /Iniciar sesión/i })
      )

      await vi.waitFor(() => expect(loginMock).toHaveBeenCalledOnce())
      await vi.waitFor(() =>
        expect(navigate).toHaveBeenCalledWith({
          to: '/settings',
          replace: true,
        })
      )
    })
  })

  describe('Failed login', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('does not navigate or set session when 401 is returned', async () => {
      loginMock.mockRejectedValue(
        new AxiosError('Unauthorized', '401', undefined, undefined, {
          status: 401,
          data: { message: 'Credenciales incorrectas' },
        } as never)
      )

      const screen = await render(<UserAuthForm />)

      await userEvent.fill(
        screen.getByLabelText(/Correo Institucional/i),
        VALID_EMAIL
      )
      await userEvent.fill(
        screen.getByLabelText(/Contraseña/i),
        'wrong-password'
      )
      await userEvent.click(
        screen.getByRole('button', { name: /Iniciar sesión/i })
      )

      await vi.waitFor(() => expect(loginMock).toHaveBeenCalledOnce())
      expect(setUserMock).not.toHaveBeenCalled()
      expect(setAccessTokenMock).not.toHaveBeenCalled()
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})
