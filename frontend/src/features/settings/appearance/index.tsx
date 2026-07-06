import { ContentSection } from '../components/content-section'
import { AppearanceForm } from './appearance-form'

export function SettingsAppearance() {
  return (
    <ContentSection
      title='Apariencia'
      desc='Personaliza la apariencia del aula virtual. Cambia entre tema claro y oscuro.'
    >
      <AppearanceForm />
    </ContentSection>
  )
}
