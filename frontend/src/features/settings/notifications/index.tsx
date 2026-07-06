import { ContentSection } from '../components/content-section'
import { NotificationsForm } from './notifications-form'

export function SettingsNotifications() {
  return (
    <ContentSection
      title='Notificaciones'
      desc='Configura cómo y cuándo recibes notificaciones del aula.'
    >
      <NotificationsForm />
    </ContentSection>
  )
}
