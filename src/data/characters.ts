import type { Character } from '../types'

export const characters: Character[] = [
  {
    id: 'char_ai_developer',
    name: 'Chethan S',
    roleTitle: 'AI & Programming Developer',
    themeTagline: 'Core algorithms, foundational programming, and intelligent systems',
    description:
      'Focusing on computational fundamentals, algorithm design, and AI experimentation with C and Python.',
    focusAreas: ['C Programming', 'Python', 'AI Concepts'],
    portraitImage: '/assets/char_ai_developer.jpg',
    referenceOriginalImage: '/assets/chethan_original.jpg',
    badgeColor: '#f59e0b',
    environmentId: 'env_intro',
  },
  {
    id: 'char_app_builder',
    name: 'Chethan S',
    roleTitle: 'Application Builder',
    themeTagline: 'Engineering full solutions, interfaces, and problem-solving tools',
    description:
      'Translating problem statements into interactive software systems, database-backed architectures, and intuitive workflows.',
    focusAreas: ['Application Logic', 'DBMS', 'Vibe Coding'],
    portraitImage: '/assets/char_app_builder.jpg',
    referenceOriginalImage: '/assets/chethan_original.jpg',
    badgeColor: '#a855f7',
    environmentId: 'env_vibe_workspace',
  },
  {
    id: 'char_cloud_explorer',
    name: 'Chethan S',
    roleTitle: 'Cloud & Linux Explorer',
    themeTagline: 'Systems infrastructure, open-source environments, and cloud architectures',
    description:
      'Exploring operating system internals, command-line environments in Linux, and scalable deployment fundamentals on Google Cloud.',
    focusAreas: ['Linux Shell', 'Google Cloud', 'Distributed Services'],
    portraitImage: '/assets/char_cloud_explorer.jpg',
    referenceOriginalImage: '/assets/chethan_original.jpg',
    badgeColor: '#10b981',
    environmentId: 'env_linux_night',
  },
]
