import { ContentSection } from '../components/content-section'
import { DisplayForm } from './display-form'

export function SettingsDisplay() {
  return (
    <ContentSection
      title='Pantalla'
      desc='Activa o desactiva elementos para controlar lo que ves en el aula.'
    >
      <DisplayForm />
    </ContentSection>
  )
}
