const isDark = ref(true)
const userChose = ref(false)

export function useTheme() {
  function apply() {
    if (import.meta.server) return
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggle() {
    isDark.value = !isDark.value
    userChose.value = true
    apply()

    // Persist choice in cookie (1 year)
    const value = isDark.value ? 'dark' : 'light'
    document.cookie = `theme=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
  }

  function init() {
    if (import.meta.server) return

    // Check cookie first
    const match = document.cookie.match(/(?:^|;\s*)theme=(dark|light)/)
    if (match) {
      isDark.value = match[1] === 'dark'
      userChose.value = true
      apply()
      return
    }

    isDark.value = true
    apply()
  }

  return { isDark: readonly(isDark), toggle, init }
}
