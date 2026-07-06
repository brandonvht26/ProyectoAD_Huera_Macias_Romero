import { ContentSection } from '../components/content-section'
import { AccountForm } from './account-form'

export function SettingsAccount() {
  return (
    <ContentSection
      title='Cuenta Institucional'
      desc='Actualiza los datos de tu cuenta. Configura tu idioma y preferencias.'
    >
      <AccountForm />
    </ContentSection>
  )
}
