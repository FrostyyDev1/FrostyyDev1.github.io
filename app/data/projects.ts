import type { Project } from '~/types'

export const projects: Project[] = [
  {
    slug: 'northstar',
    title: 'NorthStar IT Services LLC',
    images: [
      { src: '/images/projects/northstar-cover.png', cover: true },
    ],
    technologies: ['IT services', 'Elkview', 'Charleston'],
    featured: true,
    accentColor: '#8ea584',
    bentoSize: 'l',
    url: 'https://northstarwv.com',
    takeawaysCount: 3,
    year: 'Owner',
    role: 'Owner',
    heroImage: '/images/projects/northstar-cover.png',
  },
  {
    slug: 'thomas-imaging',
    title: 'Thomas Imaging Center',
    images: [
      { src: '/images/projects/thomas-imaging-cover.png', cover: true },
    ],
    technologies: ['Epic', 'Patient registration'],
    featured: true,
    accentColor: '#c4a574',
    bentoSize: 'm',
    takeawaysCount: 3,
    year: 'Previously',
    role: 'Registration Specialist',
  },
  {
    slug: 'comptia-a-plus',
    title: 'CompTIA A+',
    images: [
      { src: '/images/projects/comptia-a-plus-cover.png', cover: true },
    ],
    technologies: ['Hardware', 'Windows', 'Troubleshooting'],
    featured: true,
    accentColor: '#b7c4a8',
    bentoSize: 's',
    url: 'https://www.credly.com/org/comptia/badge/comptia-a-ce-certification',
    takeawaysCount: 3,
    year: '2025',
    stats: [
      { value: 'Oct 2025', label: 'earned' },
      { value: 'Oct 2028', label: 'expires' },
    ],
  },
  {
    slug: 'network-plus',
    title: 'CompTIA Network+',
    images: [
      { src: '/images/projects/network-plus-cover.png', cover: true },
    ],
    technologies: ['Networking', 'TCP/IP', 'Wi-Fi'],
    featured: true,
    accentColor: '#9aab8c',
    bentoSize: 's',
    url: 'https://www.credly.com/org/comptia/badge/comptia-network-ce-certification',
    takeawaysCount: 3,
    year: '2025',
    stats: [
      { value: 'Oct 2025', label: 'earned' },
      { value: 'Oct 2028', label: 'expires' },
    ],
  },
  {
    slug: 'csu-global',
    title: 'CSU Global',
    images: [
      { src: '/images/projects/csu-global-cover.png', cover: true },
    ],
    technologies: ['B.S. Information Technology'],
    featured: true,
    accentColor: '#d7c4a8',
    bentoSize: 'm',
    url: 'https://csuglobal.edu',
    takeawaysCount: 3,
    year: '2027',
    role: 'B.S. Information Technology',
    stats: [
      { value: 'Sept 2027', label: 'expected' },
    ],
  },
]
