import { projects } from '~/data/projects'

const PROJECT_PATH_RE = /^\/(?:en\/)?projets?\/([^/?#]+)/

function projectSlugFromPath(path: string): string | null {
  const m = path.match(PROJECT_PATH_RE)
  return m ? m[1] ?? null : null
}

function isProjectPath(path: string): boolean {
  return PROJECT_PATH_RE.test(path)
}

export default defineNuxtPlugin((nuxtApp) => {
  const router = nuxtApp.$router as ReturnType<typeof useRouter>
  const { enter, exit } = usePageTransition()
  const { reset: resetCursor } = useCustomCursor()

  router.beforeResolve(async (to, from) => {
    if (to.path === from.path) return
    if (!isProjectPath(to.path) && !isProjectPath(from.path)) return

    // Reset the custom cursor: the previously-hovered element is about to be unmounted,
    // its mouseout will never fire, so the hover-project class would otherwise stick.
    resetCursor()

    // Color: prefer the project being entered. On exit (project → other), reuse the source's accent.
    const targetSlug = projectSlugFromPath(to.path) ?? projectSlugFromPath(from.path)
    const project = targetSlug ? projects.find(p => p.slug === targetSlug) : null
    const color = project?.accentColor ?? 'var(--color-primary)'

    await enter(color)
  })

  router.afterEach((to, from) => {
    if (to.path === from.path) return
    if (!isProjectPath(to.path) && !isProjectPath(from.path)) return

    // Let the new page paint AND let the hero image finish loading before sliding off.
    // 350ms is enough for an eager+fetchpriority="high" hero to be painted.
    nextTick(() => {
      requestAnimationFrame(() => {
        setTimeout(() => exit(), 350)
      })
    })
  })
})
