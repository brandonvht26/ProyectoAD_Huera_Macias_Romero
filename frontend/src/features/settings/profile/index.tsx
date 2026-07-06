import { ContentSection } from '../components/content-section'
import { ProfileForm } from './profile-form'

export function SettingsProfile() {
  return (
    <ContentSection
      title='Mi Perfil'
      desc='Así es como te verán otros miembros de la comunidad politécnica.'
    >
      <ProfileForm />
    </ContentSection>
  )
}
