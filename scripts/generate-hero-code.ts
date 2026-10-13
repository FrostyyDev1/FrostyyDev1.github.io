/**
 * Reads real source files from the project, extracts <script> blocks from .vue files,
 * minifies everything, and writes the result to app/data/heroCode.ts
 *
 * Usage: npx tsx scripts/generate-hero-code.ts
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'

const ROOT = resolve(import.meta.dirname!, '..')

// Collect source files (skip heroCode.ts itself and this script)
const SKIP = ['heroCode.ts', 'generate-hero-code.ts']

function collectFiles(dir: string, exts: string[]): string[] {
  const results: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (SKIP.includes(entry)) continue
    const stat = statSync(full)
    if (stat.isDirectory()) {
      results.push(...collectFiles(full, exts))
    } else if (exts.includes(extname(entry))) {
      results.push(full)
    }
  }
  return results
}

const dirs = [
  join(ROOT, 'app/components'),
  join(ROOT, 'app/composables'),
  join(ROOT, 'app/data'),
  join(ROOT, 'app/layouts'),
  join(ROOT, 'app/pages'),
  join(ROOT, 'app/lib'),
  join(ROOT, 'app/types'),
]

const files = dirs.flatMap(d => collectFiles(d, ['.vue', '.ts']))
files.push(join(ROOT, 'nuxt.config.ts'))

// Extract both script AND template content from .vue files, or full content for .ts
function extractCode(filePath: string): string {
  const src = readFileSync(filePath, 'utf-8')
  if (filePath.endsWith('.vue')) {
    const parts: string[] = []
    const script = src.match(/<script[^>]*>([\s\S]*?)<\/script>/)
    if (script) parts.push(script[1]!)
    const tmpl = src.match(/<template>([\s\S]*?)<\/template>/)
    if (tmpl) parts.push(tmpl[1]!)
    return parts.join(';') || src
  }
  return src
}

// Minify: collapse whitespace, remove comments, trim
function minify(code: string): string {
  return code
    // Remove single-line comments (but not URLs with //)
    .replace(/(?<![:'"])\/\/.*$/gm, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Collapse newlines and multiple spaces
    .replace(/\s*\n\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

const chunks = files
  .map(f => minify(extractCode(f)))
  .filter(c => c.length > 20) // skip trivially small files

const combined = chunks.join(';')

// Escape for JSON string
const escaped = JSON.stringify(combined)

const output = `// Auto-generated from real project source — run: npx tsx scripts/generate-hero-code.ts
export const heroCodeString = ${escaped}
`

writeFileSync(join(ROOT, 'app/data/heroCode.ts'), output)
console.log(`Generated heroCode.ts (${(combined.length / 1024).toFixed(1)} KB from ${files.length} files)`)
