import type { Skill } from '../types'

/**
 * SKILL CONFIGURATION
 * 
 * To add a new skill in the future:
 * 1. Add an object to the `skills` array below.
 * 2. Assign an `environmentId` (either an existing key from environments.ts or a new one).
 * 3. Set `enabled: true`.
 * 4. The UI automatically displays the skill, links it to its environment, and handles switching.
 */
export const skills: Skill[] = [
  {
    id: 'skill-c',
    name: 'C Programming',
    description:
      'Foundational low-level systems programming, memory management pointers, data structures, and core procedural logic.',
    category: 'Languages',
    iconName: 'Cpu',
    environmentId: 'env_c_industrial',
    accentColor: '#ea580c',
    backgroundImage: '/assets/env_c_industrial.jpg',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'skill-python',
    name: 'Python',
    description:
      'High-level scripting, data processing, rapid prototyping, automation, and AI/ML model integration.',
    category: 'Languages',
    iconName: 'FileCode2',
    environmentId: 'env_py_sunset',
    accentColor: '#ec4899',
    backgroundImage: '/assets/env_py_sunset.jpg',
    enabled: true,
    sortOrder: 2,
  },
  {
    id: 'skill-dbms',
    name: 'DBMS',
    description:
      'Database Management Systems concepts: relational schemas, SQL queries, indexing, normalization, and ACID transaction safety.',
    category: 'Systems & DB',
    iconName: 'Database',
    environmentId: 'env_db_downtown',
    accentColor: '#38bdf8',
    backgroundImage: '/assets/env_db_downtown.jpg',
    enabled: true,
    sortOrder: 3,
  },
  {
    id: 'skill-linux',
    name: 'Linux',
    description:
      'Operating system command line navigation, Bash scripting, process inspection, file permissions, and developer system tooling.',
    category: 'Systems & DB',
    iconName: 'Terminal',
    environmentId: 'env_linux_night',
    accentColor: '#10b981',
    backgroundImage: '/assets/env_linux_night.jpg',
    enabled: true,
    sortOrder: 4,
  },
  {
    id: 'skill-gcp',
    name: 'Google Cloud',
    description:
      'Cloud computing fundamentals, Compute Engine instances, Cloud Storage buckets, and containerized deployment pipelines.',
    category: 'Cloud & Modern Workflows',
    iconName: 'Cloud',
    environmentId: 'env_cloud_skyline',
    accentColor: '#0284c7',
    backgroundImage: '/assets/env_cloud_skyline.jpg',
    enabled: true,
    sortOrder: 5,
  },
  {
    id: 'skill-vibe-coding',
    name: 'Vibe Coding',
    description:
      'Modern AI-augmented rapid software development: pairing with LLMs, iterative prompt engineering, and agile project prototyping.',
    category: 'Cloud & Modern Workflows',
    iconName: 'Sparkles',
    environmentId: 'env_vibe_workspace',
    accentColor: '#a855f7',
    backgroundImage: '/assets/env_vibe_workspace.jpg',
    enabled: true,
    sortOrder: 6,
  },
]
