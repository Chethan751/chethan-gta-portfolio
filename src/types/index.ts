export interface Character {
  id: string
  name: string
  roleTitle: string
  themeTagline: string
  description: string
  focusAreas: string[]
  portraitImage: string
  referenceOriginalImage: string
  badgeColor: string
  environmentId: string
}

export interface Environment {
  id: string
  name: string
  locationLabel: string
  timeOfDay: string
  backgroundImage: string
  fallbackGradient: string
  accentColor: string
  overlayOpacity: number
  atmosphericEffect?: 'haze' | 'rain' | 'sunflare' | 'clouds' | 'neon'
}

export interface Skill {
  id: string
  name: string
  description: string
  category: 'Languages' | 'Systems & DB' | 'Cloud & Modern Workflows'
  iconName: string
  environmentId: string
  accentColor: string
  backgroundImage: string
  enabled: boolean
  sortOrder: number
}

export interface DialogueTopic {
  id: string
  label: string
  shortTitle: string
  text: string
  targetSectionId?: string
}

export interface DialogueConfig {
  characterName: string
  greetingScript: string
  topics: DialogueTopic[]
}

export type ProjectStatus = 'Concept' | 'Prototype' | 'In Development' | 'Planned'

export interface ProjectMission {
  id: string
  missionNumber: string
  title: string
  tagline: string
  status: ProjectStatus
  thumbnailImage: string
  overview: string
  problemStatement: string
  proposedSolution: string
  technologiesAndConcepts: string[]
  verifiedImplementedFeatures: string[]
  futureImprovements: string[]
  repoUrl?: string
  demoUrl?: string
}

export interface EducationInfo {
  degree: string
  field: string
  institution: string
  institutionShort: string
  location: string
  honestyNote: string
}

export interface AchievementItem {
  id: string
  title: string
  description: string
  date?: string
  issuingOrganization?: string
  certificateUrl?: string
  badgeIcon?: string
}

export interface SocialLinks {
  email?: string
  github?: string
  linkedin?: string
  resumeUrl?: string
  twitter?: string
}

export interface SiteConfig {
  displayName: string
  subtitle: string
  tagline: string
  location: string
  characterDialogueIntro: string
  education: EducationInfo
  contactLinks: SocialLinks
  enableAudioEffects: boolean
}
