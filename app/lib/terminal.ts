import {
  certifications,
  contactEmail,
  contactEmailHref,
  education,
  person,
  roles,
} from '~/data/site'

export type TermBlock =
  | { kind: 'text', text: string }
  | { kind: 'error', text: string }
  | { kind: 'pre', text: string }
  | { kind: 'kv', rows: [string, string][] }
  | { kind: 'links', links: { href: string, label: string }[] }
  | { kind: 'suggest', guess: string }

export type TermResult = {
  blocks: TermBlock[]
  clear?: boolean
}

export const commands = [
  { name: 'help', blurb: 'List commands' },
  { name: 'about', blurb: 'Who Jacob is' },
  { name: 'certs', blurb: 'Credentials on file' },
  { name: 'contact', blurb: 'Email and links' },
  { name: 'sudo hire-jacob', blurb: 'Hiring note' },
  { name: 'neofetch', blurb: 'A small snapshot' },
  { name: 'coffee', blurb: 'Brew status' },
  { name: 'fortune', blurb: 'One short note' },
  { name: 'clear', blurb: 'Clear the screen' },
] as const

const fortunes = [
  'The second question is usually better than the first guess.',
  'If it only works while you are watching, it is not fixed.',
  'Write the symptom the way the person said it, then translate.',
  'A calm explanation is part of the repair.',
  'September 2027 is circled. The work before then still counts.',
  'Elkview mornings and Charleston afternoons, same careful troubleshooting.',
]

function normalize(input: string) {
  return input.trim().replace(/\s+/g, ' ').toLowerCase()
}

function levenshtein(a: string, b: string) {
  const rows = a.length + 1
  const cols = b.length + 1
  const dp: number[][] = Array.from({ length: rows }, () =>
    Array<number>(cols).fill(0),
  )

  for (let i = 0; i < rows; i += 1) dp[i]![0] = i
  for (let j = 0; j < cols; j += 1) dp[0]![j] = j

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i]![j] = Math.min(
        dp[i - 1]![j]! + 1,
        dp[i]![j - 1]! + 1,
        dp[i - 1]![j - 1]! + cost,
      )
    }
  }

  return dp[a.length]![b.length]!
}

const names = commands.map(command => command.name)

export function complete(raw: string) {
  const input = normalize(raw)
  if (!input) return null
  const hits = names.filter(name => name.startsWith(input))
  return hits.length === 1 ? hits[0] : null
}

function suggestion(input: string) {
  if (input.includes('hire')) return 'sudo hire-jacob'

  const prefix = names.filter(name => name.startsWith(input))
  if (input.length >= 2 && prefix.length === 1 && prefix[0] !== input) {
    return prefix[0]
  }

  let best: string | null = null
  let bestScore = Number.POSITIVE_INFINITY

  for (const name of names) {
    const score = levenshtein(input, name)
    if (score < bestScore) {
      bestScore = score
      best = name
    }
  }

  const max = input.length <= 3 ? 1 : input.length <= 6 ? 2 : 3
  if (best && bestScore > 0 && bestScore <= max) return best
  return null
}

function help(): TermResult {
  return {
    blocks: [
      {
        kind: 'pre',
        text: commands.map(command => `${command.name.padEnd(18)} ${command.blurb}`).join('\n'),
      },
      {
        kind: 'text',
        text: 'Tab completes a command. Up and down walk through history.',
      },
    ],
  }
}

function about(): TermResult {
  return {
    blocks: [
      { kind: 'text', text: `${person.name} — ${person.locationLong}.` },
      {
        kind: 'text',
        text: `Looking for ${person.seeking.join(', ')} roles.`,
      },
      {
        kind: 'kv',
        rows: [
          ['owner', roles[0].org],
          ['registration', `${roles[1].title}, ${roles[1].org}`],
          ['system', 'Epic'],
          ['school', `${education.school} · ${education.degree}`],
          ['expected', education.expected],
        ],
      },
      {
        kind: 'links',
        links: [
          { href: '/#about', label: 'About' },
          { href: '/projets', label: 'Selected work' },
        ],
      },
    ],
  }
}

function certs(): TermResult {
  const lines = certifications.map((cert) => {
    const expiry = cert.expires ? `expires ${cert.expires}` : 'no expiry listed'
    return `${cert.name.padEnd(22)} earned ${cert.earned} · ${expiry}`
  })

  return {
    blocks: [
      { kind: 'pre', text: lines.join('\n') },
      {
        kind: 'links',
        links: [{ href: '/certifications', label: 'Open the certifications page' }],
      },
    ],
  }
}

function contact(): TermResult {
  return {
    blocks: [
      {
        kind: 'text',
        text: 'Email is the way to reach Jacob. A phone number is not published.',
      },
      {
        kind: 'kv',
        rows: [
          ['email', contactEmail],
          ['linkedin', person.linkedinLabel],
          ['business', person.businessUrlLabel],
        ],
      },
      {
        kind: 'links',
        links: [
          { href: contactEmailHref, label: 'Email Jacob' },
          { href: person.linkedin, label: 'LinkedIn' },
          { href: '/#contact', label: 'Contact' },
        ],
      },
    ],
  }
}

function hire(): TermResult {
  return {
    blocks: [
      {
        kind: 'text',
        text: 'No password is collected here. Hiring starts with an email.',
      },
      {
        kind: 'kv',
        rows: [
          ['name', person.name],
          ['place', person.location],
          ['open to', person.seeking.join(' · ')],
          ['email', contactEmail],
        ],
      },
      {
        kind: 'links',
        links: [{ href: contactEmailHref, label: 'Email jacob.wiseman345@gmail.com' }],
      },
    ],
  }
}

function neofetch(): TermResult {
  return {
    blocks: [
      {
        kind: 'pre',
        text: [
          '       *',
          '      /|\\',
          '     * | *',
          '      \\|/',
          '       *',
          '',
          'user      jacob',
          'host      northstar',
          'location  Elkview, WV',
          'focus     desktop · systems · networking',
          'school    CSU Global',
          'degree    B.S. IT · Sept 2027',
          'shell     portfolio',
        ].join('\n'),
      },
    ],
  }
}

function coffee(): TermResult {
  return {
    blocks: [
      { kind: 'text', text: 'Kettle’s on.' },
      {
        kind: 'text',
        text: 'One cup, then back to the desk. The next device can wait until the mug is down.',
      },
    ],
  }
}

export function runCommand(raw: string, fortuneIndex = 0): TermResult {
  const input = normalize(raw)
  if (!input) return { blocks: [] }
  if (input === 'clear') return { blocks: [], clear: true }
  if (input === 'help' || input === '?') return help()
  if (input === 'about' || input === 'whoami') return about()
  if (input === 'certs' || input === 'certifications') return certs()
  if (input === 'contact' || input === 'email' || input === 'mail') return contact()
  if (input === 'sudo hire-jacob' || input === 'sudo hire jacob') return hire()
  if (input === 'neofetch') return neofetch()
  if (input === 'coffee') return coffee()
  if (input === 'fortune') {
    const text = fortunes[Math.abs(fortuneIndex) % fortunes.length]!
    return { blocks: [{ kind: 'text', text }] }
  }
  if (input === 'sudo') {
    return { blocks: [{ kind: 'error', text: 'usage: sudo hire-jacob' }] }
  }
  if (input.startsWith('sudo ')) {
    return {
      blocks: [
        { kind: 'error', text: `sudo: ${input.slice(5)}: command not found` },
        { kind: 'suggest', guess: 'sudo hire-jacob' },
      ],
    }
  }

  const guess = suggestion(input)
  const blocks: TermBlock[] = [
    { kind: 'error', text: `command not found: ${input}` },
  ]
  if (guess) blocks.push({ kind: 'suggest', guess })
  return { blocks }
}
