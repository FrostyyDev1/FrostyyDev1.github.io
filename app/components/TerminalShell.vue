<script setup lang="ts">
import { complete, runCommand, commands, type TermBlock } from '~/lib/terminal'
import { prompt } from '~/data/site'

const props = defineProps<{
  notice?: string
}>()

type Entry = {
  id: number
  input?: string
  blocks: TermBlock[]
}

const input = ref('')
const entries = ref<Entry[]>([])
const history = ref<string[]>([])
const historyIndex = ref(-1)
const draft = ref('')
const fortuneIndex = ref(0)
const paletteOpen = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const scroller = ref<HTMLElement | null>(null)
let nextId = 1

const welcome: TermBlock[] = [
  { kind: 'text', text: 'Jacob Wiseman — Elkview, in the Charleston, West Virginia area.' },
  { kind: 'text', text: 'Type help, or press Ctrl K or Cmd K for the command list.' },
]

function scrollDown() {
  nextTick(() => {
    const el = scroller.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

function pushResult(raw: string, resultBlocks: TermBlock[], clear = false) {
  if (clear) {
    entries.value = []
    return
  }
  entries.value.push({ id: nextId++, input: raw, blocks: resultBlocks })
  scrollDown()
}

function run(raw: string) {
  const trimmed = raw.trim()
  if (!trimmed) {
    entries.value.push({ id: nextId++, input: '', blocks: [] })
    scrollDown()
    return
  }
  history.value.push(trimmed)
  historyIndex.value = -1
  const result = runCommand(trimmed, fortuneIndex.value)
  if (trimmed.toLowerCase() === 'fortune') fortuneIndex.value += 1
  if (result.clear) {
    entries.value = []
    return
  }
  pushResult(trimmed, result.blocks)
}

function onSubmit() {
  const value = input.value
  input.value = ''
  run(value)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Tab') {
    event.preventDefault()
    const next = complete(input.value)
    if (next) input.value = next
    return
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!history.value.length) return
    if (historyIndex.value === -1) {
      draft.value = input.value
      historyIndex.value = history.value.length - 1
    }
    else if (historyIndex.value > 0) {
      historyIndex.value -= 1
    }
    input.value = history.value[historyIndex.value] ?? ''
    return
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (historyIndex.value === -1) return
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value += 1
      input.value = history.value[historyIndex.value] ?? ''
    }
    else {
      historyIndex.value = -1
      input.value = draft.value
    }
  }
}

function focusInput() {
  inputRef.value?.focus()
}

function onPalette(name: string) {
  paletteOpen.value = false
  input.value = ''
  run(name)
  focusInput()
}

function onWindowKey(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    paletteOpen.value = !paletteOpen.value
  }
  else if (event.key === 'Escape') {
    paletteOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', onWindowKey)
  if (props.notice) {
    entries.value.push({
      id: nextId++,
      blocks: [{ kind: 'error', text: props.notice }],
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onWindowKey)
})

const eggs = [
  { label: 'coffee', command: 'coffee' },
  { label: 'fortune', command: 'fortune' },
  { label: 'neofetch', command: 'neofetch' },
  { label: 'sudo hire-jacob', command: 'sudo hire-jacob' },
]
</script>

<template>
  <div class="shell-tile" @click="focusInput">
    <div class="shell-bar">
      <span class="shell-dots" aria-hidden="true"><i /><i /><i /></span>
      <span class="shell-prompt-label">{{ prompt }}</span>
      <button
        type="button"
        class="shell-k"
        aria-label="Open commands"
        @click.stop="paletteOpen = true"
      >
        <kbd>Ctrl K</kbd>
      </button>
    </div>

    <div ref="scroller" class="shell-screen" data-lenis-prevent>
      <div v-for="block in welcome" :key="block.text" class="shell-line">
        {{ block.text }}
      </div>

      <div v-for="entry in entries" :key="entry.id" class="shell-entry">
        <p v-if="entry.input !== undefined" class="shell-in">
          <span class="shell-ps1">{{ prompt }}</span>
          <span>{{ entry.input }}</span>
        </p>
        <div v-for="(block, index) in entry.blocks" :key="index">
          <pre v-if="block.kind === 'pre'" class="shell-pre">{{ block.text }}</pre>
          <p v-else-if="block.kind === 'error'" class="shell-error">{{ block.text }}</p>
          <p v-else-if="block.kind === 'suggest'" class="shell-suggest">
            Did you mean
            <button type="button" @click.stop="run(block.guess)">{{ block.guess }}</button>?
          </p>
          <dl v-else-if="block.kind === 'kv'" class="shell-kv">
            <div v-for="row in block.rows" :key="row[0]">
              <dt>{{ row[0] }}</dt>
              <dd>{{ row[1] }}</dd>
            </div>
          </dl>
          <p v-else-if="block.kind === 'links'" class="shell-links">
            <a
              v-for="link in block.links"
              :key="link.href + link.label"
              :href="link.href"
              @click.stop
            >{{ link.label }}</a>
          </p>
          <p v-else class="shell-line">{{ block.text }}</p>
        </div>
      </div>

      <form class="shell-form" @submit.prevent="onSubmit">
        <label class="shell-ps1" for="shell-input">{{ prompt }}</label>
        <input
          id="shell-input"
          ref="inputRef"
          v-model="input"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          aria-label="Shell command"
          @keydown="onKeydown"
        >
      </form>
    </div>

    <div class="shell-eggs">
      <button
        v-for="egg in eggs"
        :key="egg.command"
        type="button"
        @click.stop="run(egg.command)"
      >
        {{ egg.label }}
      </button>
    </div>

    <div
      v-if="paletteOpen"
      class="shell-palette"
      role="dialog"
      aria-label="Commands"
      @click.stop
    >
      <p class="shell-palette-label">Commands</p>
      <button
        v-for="command in commands"
        :key="command.name"
        type="button"
        @click="onPalette(command.name)"
      >
        <span>{{ command.name }}</span>
        <span>{{ command.blurb }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.shell-tile {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 22px;
  background: #141310;
  color: #f3efe6;
  font-family: var(--font-mono), ui-monospace, monospace;
}

.shell-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgb(243 239 230 / 10%);
}

.shell-dots {
  display: inline-flex;
  gap: 0.35rem;
}

.shell-dots i {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: #3a3833;
}

.shell-dots i:first-child {
  background: #c4a574;
}

.shell-dots i:nth-child(2) {
  background: #b7c4a8;
}

.shell-prompt-label {
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: #b7c4a8;
}

.shell-k {
  margin-left: auto;
  cursor: pointer;
  border: 0;
  background: transparent;
  color: inherit;
}

.shell-k kbd {
  border: 1px solid rgb(243 239 230 / 18%);
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  font-size: 0.68rem;
  color: #d7e4cb;
}

.shell-screen {
  max-height: 28rem;
  overflow: auto;
  padding: 1rem 1.1rem 0.5rem;
  font-size: 0.82rem;
  line-height: 1.55;
}

.shell-line,
.shell-in,
.shell-error,
.shell-suggest {
  margin: 0.15rem 0;
  white-space: pre-wrap;
}

.shell-ps1 {
  margin-right: 0.5rem;
  color: #b7c4a8;
}

.shell-pre {
  margin: 0.35rem 0;
  white-space: pre-wrap;
  font: inherit;
  color: #f3efe6;
}

.shell-error {
  color: #e4bba8;
}

.shell-suggest button,
.shell-links a,
.shell-eggs button,
.shell-palette button {
  cursor: pointer;
  color: #d7e4cb;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.shell-kv {
  display: grid;
  gap: 0.2rem;
  margin: 0.35rem 0;
}

.shell-kv div {
  display: grid;
  grid-template-columns: 8.5rem 1fr;
  gap: 0.5rem;
}

.shell-kv dt {
  color: #a39e93;
}

.shell-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0.35rem 0 0.6rem;
}

.shell-form {
  display: flex;
  align-items: center;
  margin-top: 0.4rem;
}

.shell-form input {
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  color: #f3efe6;
  font: inherit;
  outline: none;
}

.shell-eggs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0.75rem 1rem 1rem;
}

.shell-eggs button {
  border: 1px solid rgb(183 196 168 / 35%);
  border-radius: 999px;
  background: rgb(183 196 168 / 8%);
  padding: 0.3rem 0.7rem;
  font: inherit;
  font-size: 0.72rem;
  text-decoration: none;
}

.shell-palette {
  position: absolute;
  inset: auto 1rem 4.5rem 1rem;
  z-index: 2;
  display: grid;
  gap: 0.15rem;
  border: 1px solid rgb(243 239 230 / 14%);
  border-radius: 14px;
  background: #1c1b18;
  padding: 0.55rem;
}

.shell-palette-label {
  margin: 0.15rem 0.4rem 0.35rem;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #a39e93;
}

.shell-palette button {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border: 0;
  border-radius: 8px;
  background: transparent;
  padding: 0.4rem 0.5rem;
  font: inherit;
  font-size: 0.78rem;
  text-align: left;
  text-decoration: none;
}

.shell-palette button:hover,
.shell-palette button:focus-visible {
  background: rgb(183 196 168 / 12%);
  outline: none;
}

@media (prefers-reduced-motion: reduce) {
  .shell-tile,
  .shell-palette button {
    transition: none;
  }
}
</style>
