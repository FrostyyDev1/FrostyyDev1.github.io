<script setup lang="ts">
import { gsap } from 'gsap'

const { t } = useI18n()
const { applyMagnetic } = useMagnetic()

const formRef = ref<HTMLFormElement | null>(null)
const successRef = ref<HTMLElement | null>(null)
const checkPathRef = ref<SVGPathElement | null>(null)
const submitRef = ref<HTMLButtonElement | null>(null)

let cleanupMagnetic: (() => void) | undefined

onMounted(() => {
  if (submitRef.value) cleanupMagnetic = applyMagnetic(submitRef.value, 0.2)
})

onUnmounted(() => {
  cleanupMagnetic?.()
})

type ProjectType = 'support' | 'technician' | 'desktop' | 'systems' | 'other'
type FormState = 'idle' | 'submitting' | 'success'
type ErrorKey =
  | 'nameRequired' | 'emailRequired' | 'emailInvalid'
  | 'typeRequired' | 'messageRequired' | 'messageMin'
  | 'network' | 'rateLimit'

interface FieldErrors {
  name?: ErrorKey
  email?: ErrorKey
  type?: ErrorKey
  message?: ErrorKey
}

const TYPE_OPTIONS: ProjectType[] = ['support', 'technician', 'desktop', 'systems', 'other']

const name = ref('')
const email = ref('')
const type = ref<ProjectType | ''>('')
const message = ref('')
const website = ref('') // honeypot — never user-visible

const state = ref<FormState>('idle')
const fieldErrors = ref<FieldErrors>({})
const submitError = ref<ErrorKey | null>(null)
const submittedName = ref('')

// Pre-fill the project type when arriving from a Services CTA.
const { projectType } = useContactPrefill()
watch(projectType, (val) => {
  if (val && !type.value) type.value = val
}, { immediate: true })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isFormFilled = computed(() =>
  name.value.trim().length > 0
  && email.value.trim().length > 0
  && type.value !== ''
  && message.value.trim().length > 0,
)

const FIELD_FOCUS_ORDER: Array<keyof FieldErrors> = ['name', 'email', 'type', 'message']
const FIELD_TO_ID: Record<keyof FieldErrors, string> = {
  name: 'contact-name',
  email: 'contact-email',
  type: 'contact-type',
  message: 'contact-message',
}

function validate(): boolean {
  const errs: FieldErrors = {}
  if (name.value.trim().length < 2) errs.name = 'nameRequired'
  if (!email.value.trim()) errs.email = 'emailRequired'
  else if (!EMAIL_RE.test(email.value.trim())) errs.email = 'emailInvalid'
  if (!type.value) errs.type = 'typeRequired'
  if (!message.value.trim()) errs.message = 'messageRequired'
  else if (message.value.trim().length < 20) errs.message = 'messageMin'
  fieldErrors.value = errs

  const isValid = Object.keys(errs).length === 0
  if (!isValid) {
    const firstField = FIELD_FOCUS_ORDER.find(k => errs[k])
    if (firstField) {
      nextTick(() => {
        document.getElementById(FIELD_TO_ID[firstField])?.focus()
      })
    }
  }
  return isValid
}

async function playSuccessTransition() {
  const form = formRef.value
  if (!form) {
    state.value = 'success'
    return
  }
  const fields = form.querySelectorAll<HTMLElement>('[data-field]')
  await gsap.to(fields, {
    opacity: 0,
    y: -8,
    duration: 0.3,
    stagger: 0.05,
    ease: 'power2.in',
  }).then()

  state.value = 'success'

  await nextTick()
  const successEl = successRef.value
  const checkPath = checkPathRef.value
  if (!successEl) return

  // Move focus to success block so screen readers announce the change.
  successEl.focus()

  if (checkPath) {
    const length = checkPath.getTotalLength()
    gsap.set(checkPath, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(checkPath, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' })
  }
  gsap.from(successEl.querySelectorAll('[data-success-line]'), {
    opacity: 0,
    y: 8,
    duration: 0.4,
    delay: 0.2,
    stagger: 0.08,
    ease: 'power2.out',
  })
}

async function onSubmit() {
  submitError.value = null
  if (!validate()) return
  state.value = 'submitting'

  try {
    const subject = encodeURIComponent(`Note from ${name.value.trim()}`)
    const body = encodeURIComponent(`${message.value.trim()}\n\nFrom: ${name.value.trim()} <${email.value.trim()}>\nAbout: ${type.value}`)
    window.location.href = `mailto:jacob.wiseman345@gmail.com?subject=${subject}&body=${body}`
    submittedName.value = name.value.trim().split(' ')[0] || name.value.trim()
    await playSuccessTransition()
  }
  catch (err) {
    console.error('[ContactForm] submit failed', err)
    submitError.value = 'network'
    state.value = 'idle'
  }
}

function reset() {
  name.value = ''
  email.value = ''
  type.value = ''
  message.value = ''
  website.value = ''
  fieldErrors.value = {}
  submitError.value = null
  submittedName.value = ''
  state.value = 'idle'
}
</script>

<template>
  <div class="contact-form-card w-full max-w-lg rounded-2xl bg-white p-6 dark:bg-background md:p-8">
    <form
      v-if="state !== 'success'"
      ref="formRef"
      class="space-y-6"
      novalidate
      @submit.prevent="onSubmit"
    >
      <!-- Honeypot — invisible to humans, attractive to bots -->
      <div aria-hidden="true" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden">
        <label for="contact-website">Website</label>
        <input
          id="contact-website"
          v-model="website"
          type="text"
          tabindex="-1"
          autocomplete="off"
        >
      </div>

      <!-- Name -->
      <div data-field>
        <label for="contact-name" class="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
          {{ t('contact.form.name') }}
        </label>
        <input
          id="contact-name"
          v-model="name"
          type="text"
          :placeholder="t('contact.form.namePlaceholder')"
          :disabled="state === 'submitting'"
          :aria-invalid="!!fieldErrors.name"
          :aria-describedby="fieldErrors.name ? 'contact-name-error' : undefined"
          class="w-full bg-transparent dark:bg-foreground/[0.06] border border-border dark:border-foreground/15 rounded-lg px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
        >
        <p
          v-if="fieldErrors.name"
          id="contact-name-error"
          role="alert"
          class="mt-1 text-xs text-red-500"
        >
          {{ t(`contact.form.errors.${fieldErrors.name}`) }}
        </p>
      </div>

      <!-- Email -->
      <div data-field>
        <label for="contact-email" class="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
          {{ t('contact.form.email') }}
        </label>
        <input
          id="contact-email"
          v-model="email"
          type="email"
          :placeholder="t('contact.form.emailPlaceholder')"
          :disabled="state === 'submitting'"
          :aria-invalid="!!fieldErrors.email"
          :aria-describedby="fieldErrors.email ? 'contact-email-error' : undefined"
          class="w-full bg-transparent dark:bg-foreground/[0.06] border border-border dark:border-foreground/15 rounded-lg px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
        >
        <p
          v-if="fieldErrors.email"
          id="contact-email-error"
          role="alert"
          class="mt-1 text-xs text-red-500"
        >
          {{ t(`contact.form.errors.${fieldErrors.email}`) }}
        </p>
      </div>

      <!-- Type -->
      <div data-field>
        <label for="contact-type" class="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
          {{ t('contact.form.type') }}
        </label>
        <div class="relative">
          <select
            id="contact-type"
            v-model="type"
            :disabled="state === 'submitting'"
            :aria-invalid="!!fieldErrors.type"
            :aria-describedby="fieldErrors.type ? 'contact-type-error' : undefined"
            class="peer w-full appearance-none rounded-lg border border-border bg-transparent px-4 py-3 pr-10 text-base text-foreground transition-colors focus:border-foreground focus:outline-none dark:border-foreground/15 dark:bg-foreground/[0.06]"
          >
            <option value="" disabled>
              {{ t('contact.form.typePlaceholder') }}
            </option>
            <option v-for="opt in TYPE_OPTIONS" :key="opt" :value="opt">
              {{ t(`contact.form.typeOptions.${opt}`) }}
            </option>
          </select>
          <IconsChevronDown
            class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform duration-200 peer-focus:-rotate-180 peer-focus:text-foreground"
          />
        </div>
        <p
          v-if="fieldErrors.type"
          id="contact-type-error"
          role="alert"
          class="mt-1 text-xs text-red-500"
        >
          {{ t(`contact.form.errors.${fieldErrors.type}`) }}
        </p>
      </div>

      <!-- Message -->
      <div data-field>
        <label for="contact-message" class="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
          {{ t('contact.form.message') }}
        </label>
        <textarea
          id="contact-message"
          v-model="message"
          rows="4"
          :placeholder="t('contact.form.messagePlaceholder')"
          :disabled="state === 'submitting'"
          :aria-invalid="!!fieldErrors.message"
          :aria-describedby="fieldErrors.message ? 'contact-message-error' : undefined"
          class="w-full bg-transparent dark:bg-foreground/[0.06] border border-border dark:border-foreground/15 rounded-lg px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors resize-none"
        />
        <p
          v-if="fieldErrors.message"
          id="contact-message-error"
          role="alert"
          class="mt-1 text-xs text-red-500"
        >
          {{ t(`contact.form.errors.${fieldErrors.message}`) }}
        </p>
      </div>

      <!-- Submit -->
      <div data-field>
        <button
          ref="submitRef"
          type="submit"
          :disabled="state === 'submitting' || !isFormFilled"
          :aria-busy="state === 'submitting'"
          class="contact-submit nav-cta relative inline-flex cursor-pointer items-center pl-6 pr-7 py-2.5 text-xs font-semibold tracking-wider uppercase text-foreground transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {{ state === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit') }}
          <IconsArrowTopRight class="ml-2 h-3.5 w-3.5 shrink-0" />
        </button>
        <p
          v-if="submitError"
          role="alert"
          class="mt-3 text-xs text-red-500"
        >
          {{ t(`contact.form.errors.${submitError}`) }}
        </p>
      </div>
    </form>

    <div v-else ref="successRef" tabindex="-1" class="space-y-4 text-foreground focus:outline-none">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path ref="checkPathRef" d="M6 16 l7 7 l13 -14" />
      </svg>
      <p data-success-line class="text-base">
        {{ t('contact.form.success.title', { name: submittedName }) }}
      </p>
      <button
        type="button"
        data-success-line
        class="text-sm text-muted-foreground underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground transition-colors"
        @click="reset"
      >
        {{ t('contact.form.success.again') }} →
      </button>
    </div>
  </div>
</template>
