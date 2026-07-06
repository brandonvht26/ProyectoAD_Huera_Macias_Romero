import {
  Construction,
  LayoutDashboard,
  Monitor,
  Bug,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  MessagesSquare,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  BookMarked,
  CalendarDays,
  GraduationCap as GradesIcon,
  Library,
  Users,
  Briefcase
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Estudiante EPN',
    email: 'estudiante.ejemplo@epn.edu.ec',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Aula Virtual EPN',
      logo: GraduationCap,
      plan: 'Sistema Académico',
    },
    {
      name: 'Facultad Sistemas',
      logo: BookOpen,
      plan: 'Administración',
    },
    {
      name: 'Soporte Técnico',
      logo: ShieldCheck,
      plan: 'TI EPN',
    },
  ],
  navGroups: [
    {
      title: 'Académico',
      items: [
        {
          title: 'Panel Principal',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Mis Materias',
          url: '/apps',
          icon: BookMarked,
        },
        {
          title: 'Tareas y Entregas',
          url: '/tasks',
          icon: Briefcase,
        },
        {
          title: 'Foros y Mensajes',
          url: '/chats',
          badge: '3',
          icon: MessagesSquare,
        },
        {
          title: 'Directorio EPN',
          url: '/users',
          icon: Users,
        },
      ],
    },
    {
      title: 'Gestión y Trámites',
      items: [
        {
          title: 'Portal Estudiantil',
          icon: Library,
          items: [
            {
              title: 'Matriculación',
              url: '/sign-in', // Reutilizamos rutas para no romper la demo
            },
            {
              title: 'Kardex Académico',
              url: '/sign-in-2',
            },
            {
              title: 'Evaluación Docente',
              url: '/sign-up',
            },
            {
              title: 'Solicitudes y Certificados',
              url: '/forgot-password',
            },
          ],
        },
        {
          title: 'Sistema (Logs)',
          icon: Bug,
          items: [
            {
              title: 'No Autorizado',
              url: '/errors/unauthorized',
              icon: Lock,
            },
            {
              title: 'Acceso Denegado',
              url: '/errors/forbidden',
              icon: UserX,
            },
            {
              title: 'No Encontrado',
              url: '/errors/not-found',
              icon: FileX,
            },
            {
              title: 'Error de Servidor',
              url: '/errors/internal-server-error',
              icon: ServerOff,
            },
            {
              title: 'Mantenimiento',
              url: '/errors/maintenance-error',
              icon: Construction,
            },
          ],
        },
      ],
    },
    {
      title: 'Configuración',
      items: [
        {
          title: 'Preferencias',
          icon: Settings,
          items: [
            {
              title: 'Mi Perfil',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Cuenta Institucional',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Apariencia del Aula',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notificaciones',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Pantalla',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Mesa de Ayuda (DIEE)',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
