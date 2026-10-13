export interface ProjectImage {
  src: string
  cover?: boolean
}

export type BentoSize = 'l' | 'm' | 's'

export interface ProjectStat {
  value: string
  label: string
}

export interface Project {
  slug: string
  title: string
  images: ProjectImage[]
  technologies: string[]
  url?: string
  agency?: { name: string, url: string }
  featured: boolean
  accentColor?: string
  takeawaysCount?: number
  bentoSize?: BentoSize
  year?: string
  role?: string
  stats?: ProjectStat[]
  heroImage?: string
}

export interface Skill {
  name: string
  logo: string
  highlighted?: boolean
}

export interface SocialLink {
  label: string
  url: string
  icon: string
}
