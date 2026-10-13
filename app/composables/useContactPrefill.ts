/**
 * Shared state to pre-fill the contact form's "project type" select when a
 * visitor reaches the form via a specific services CTA (e.g. a "Site vitrine"
 * offer pre-selects the showcase type). Set by the Services section, consumed
 * by ContactForm.
 */
export type ContactProjectType = 'support' | 'technician' | 'desktop' | 'systems' | 'other'

export function useContactPrefill() {
  const projectType = useState<ContactProjectType | ''>('contact-prefill-type', () => '')

  function goToContact(type?: ContactProjectType) {
    if (type) projectType.value = type
    const { scrollTo } = useLenis()
    const el = document.getElementById('contact')
    if (el) scrollTo(el, { offset: 0 })
  }

  return { projectType, goToContact }
}
