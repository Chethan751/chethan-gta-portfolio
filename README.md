# Chethan S — GTA V / Los Santos Developer Portfolio

A responsive, interactive developer portfolio inspired by the cinematic atmosphere, character selection wheels, open-world environments, and tactical mission interfaces of Grand Theft Auto V (GTA V) and Los Santos.

Built for **Chethan S**, pursuing a Bachelor of Engineering (B.E.) in Computer Science and Engineering (CSE) at Channabasaveshwara Institute of Technology (CIT), Gubbi, Karnataka, India.

---

## 1. Project Overview

- **Cinematic Open-World Introduction**: Golden-hour Los Santos skyline sequence with camera motion, title reveal, "ENTER WORLD", and immediate "SKIP INTRO" options.
- **GTA V Character Selection**: 3 character presentation slots illustrating the exact same person (**Chethan S**) across complementary computer science focus areas (AI & Programming Developer, Application Builder, Cloud & Linux Explorer). Includes a toggle to view Chethan S's real verified reference photograph.
- **Talking Character HUD**: Interactive first-person cutscene dialogue panel with animated typewriter text reveal, dialogue topics (*Who Am I*, *My Skills*, *My Projects*, *My Education*, *My Goals*), and opt-in browser-native SpeechSynthesis voice narration.
- **Dynamic Skills & Environment Switching**: 6 verified skills mapped to 6 authentic Los Santos environments that dynamically shift the world backdrop on selection.
- **Tactical Mission Dossiers**: 3 AI projects presented as GTA heist mission cards with honest development status badges and full briefing modals (*FALCON AI*, *TRINETRA-AI*, *NOVA AI SUITE*).
- **Academic Foundation**: Verified undergraduate engineering education at CIT Gubbi.
- **Honest Achievements & Contact**: No invented rankings or fake certificates; contact links hidden until configured by Chethan S.
- **In-Memory Configuration Editor**: Live HUD modal allowing real-time preview and code snippet export.

---

## 2. Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom cinematic overlays, scanlines, and vignette filters
- **Icons**: Lucide React + custom SVG brand icons
- **Audio Effects**: Browser Web Audio API synthesizer (0 external audio network requests, opt-in)
- **Speech**: Browser-native SpeechSynthesis API (opt-in, 0 paid APIs)
- **Code Quality**: Oxlint (0 warnings, 0 errors) + TypeScript strict checks

---

## 3. Prerequisites

- **Node.js**: v18.0.0 or later (v20+ / v24+ recommended)
- **npm**: v9.0.0 or later

Verify versions:
```bash
node -v
npm -v
```

---

## 4. Installation

Clone or open the workspace and install dependencies:

```bash
npm install
```

---

## 5. Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 6. Production Build

Run the type checker and Vite production bundle compiler:

```bash
npm run build
```

The compiled assets are generated into the `dist/` directory.

---

## 7. Production Preview

Preview the production build locally:

```bash
npm run preview
```

---

## 8. Project Structure

```text
Portfolio/
├── public/
│   ├── favicon.svg             # Original GTA-style emblem
│   └── assets/                 # High-resolution generated & reference assets
│       ├── chethan_original.jpg        # Verified uploaded portrait of Chethan S
│       ├── char_ai_developer.jpg       # Theme 1: AI & Programming Developer
│       ├── char_app_builder.jpg        # Theme 2: Application Builder
│       ├── char_cloud_explorer.jpg     # Theme 3: Cloud & Linux Explorer
│       ├── env_intro_skyline.jpg       # Intro Los Santos golden hour skyline
│       ├── env_c_industrial.jpg        # C Programming environment
│       ├── env_py_sunset.jpg           # Python environment
│       ├── env_db_downtown.jpg         # DBMS environment
│       ├── env_linux_night.jpg         # Linux environment
│       ├── env_cloud_skyline.jpg       # Google Cloud environment
│       ├── env_vibe_workspace.jpg      # Vibe Coding environment
│       ├── mission_falcon.jpg          # Mission 01 artwork
│       ├── mission_trinetra.jpg        # Mission 02 artwork
│       └── mission_nova.jpg            # Mission 03 artwork
├── src/
│   ├── types/
│   │   └── index.ts            # Type definitions for Characters, Skills, Projects, etc.
│   ├── data/
│   │   ├── siteConfig.ts       # Central source of truth for profile, education, links
│   │   ├── characters.ts       # 3 character presentation profiles for Chethan S
│   │   ├── environments.ts     # Environment scenes, gradients, and lighting
│   │   ├── skills.ts           # Dynamic skill definitions and environment bindings
│   │   ├── dialogues.ts        # Talking character scripts and conversation topics
│   │   ├── projects.ts         # Mission dossiers and feature checklists
│   │   └── achievements.ts     # Verified achievements list (currently empty)
│   ├── utils/
│   │   └── audio.ts            # Web Audio API sound synthesizer
│   ├── components/
│   │   ├── ErrorBoundary.tsx   # React runtime error boundary
│   │   ├── Intro.tsx           # Opening cinematic Los Santos sequence
│   │   ├── Navbar.tsx          # Top HUD navigation bar
│   │   ├── HeroSection.tsx     # Hero banner and quick stats
│   │   ├── CharacterSelection.tsx # 3-slot character switcher
│   │   ├── TalkingCharacter.tsx   # Interactive dialogue & SpeechSynthesis HUD
│   │   ├── SkillsSection.tsx   # Data-driven skills with live scene switching
│   │   ├── MissionsSection.tsx # Tactical mission cards
│   │   ├── MissionModal.tsx    # Accessible mission briefing dossier modal
│   │   ├── EducationSection.tsx# B.E. CSE at CIT Gubbi dossier
│   │   ├── AchievementsSection.tsx # Empty state with honest unlock criteria
│   │   ├── ContactSection.tsx  # Verified contact links and non-submitting form
│   │   ├── ConfigEditorModal.tsx # In-memory live preview config editor
│   │   ├── SocialIcons.tsx     # Clean SVG brand icons
│   │   └── Footer.tsx          # GTA-inspired footer & intro replay
│   ├── App.tsx                 # Root application state & environment coordinator
│   ├── index.css               # Tailwind CSS v4 and game typography rules
│   └── main.tsx                # React entry point
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
├── vercel.json                 # Vercel SPA deployment configuration
└── README.md
```

---

## 9. Updating Name and Tagline

Open `src/data/siteConfig.ts`:

```typescript
export const initialSiteConfig: SiteConfig = {
  displayName: 'Chethan S',
  subtitle: 'DEVELOPER PROFILE',
  tagline: 'YOUR NEXT MISSION STARTS HERE',
  location: 'Gubbi, Karnataka, India',
  // ...
}
```

---

## 10. Adding Skills

To add a new skill (e.g., Docker, Java, or Git), append one object to the `skills` array in `src/data/skills.ts`:

```typescript
{
  id: 'skill-docker',
  name: 'Docker',
  description: 'Containerization, Dockerfiles, multi-stage builds, and microservices isolation.',
  category: 'Cloud & Modern Workflows',
  iconName: 'Cpu',
  environmentId: 'env_linux_night', // assign an existing or new environment
  accentColor: '#0ea5e9',
  backgroundImage: '/assets/env_linux_night.jpg',
  enabled: true,
  sortOrder: 7,
}
```

The UI will automatically render the new skill card and bind it to the environment engine.

---

## 11. Creating and Assigning Environments

Add a new environment in `src/data/environments.ts`:

```typescript
export const environments: Record<string, Environment> = {
  env_new_scene: {
    id: 'env_new_scene',
    name: 'Sandy Shores Outpost',
    locationLabel: 'Grand Senora Desert // Sector 04',
    timeOfDay: 'Midday (13:00)',
    backgroundImage: '/assets/env_new_scene.jpg',
    fallbackGradient: 'linear-gradient(135deg, #78350f 0%, #1c1917 100%)',
    accentColor: '#f59e0b',
    overlayOpacity: 0.5,
    atmosphericEffect: 'haze',
  },
}
```

Then assign `environmentId: 'env_new_scene'` to any skill or character.

---

## 12. Replacing Background Images

Place your JPG/PNG files in `public/assets/` and update the `backgroundImage` path in `src/data/environments.ts` or `src/data/skills.ts`.

---

## 13. Adding Projects

Append a new mission to `src/data/projects.ts`:

```typescript
{
  id: 'mission-04',
  missionNumber: 'MISSION 04',
  title: 'NEW PROJECT TITLE',
  tagline: 'Short descriptive punchline',
  status: 'In Development', // 'Prototype' | 'In Development' | 'Concept' | 'Planned'
  thumbnailImage: '/assets/mission_new.jpg',
  overview: 'Detailed project summary...',
  problemStatement: 'Problem being addressed...',
  proposedSolution: 'Architecture and solution...',
  technologiesAndConcepts: ['React', 'Python', 'Docker'],
  verifiedImplementedFeatures: ['Feature 1', 'Feature 2'],
  futureImprovements: ['Improvement 1'],
  repoUrl: undefined, // Add GitHub link when ready
  demoUrl: undefined, // Add demo link when ready
}
```

---

## 14. Updating Project Status and URLs

In `src/data/projects.ts`, change `status` or provide valid URLs for `repoUrl` and `demoUrl`. If `undefined`, buttons gracefully display a safe "In Development" badge.

---

## 15. Adding Achievements

When an award or certificate is verified, open `src/data/achievements.ts` and add:

```typescript
export const initialAchievements: AchievementItem[] = [
  {
    id: 'ach-01',
    title: 'Hackathon Finalist',
    description: 'Developed an emergency triage prototype.',
    date: '2026',
    issuingOrganization: 'Tech Festival',
    certificateUrl: 'https://...',
  },
]
```

---

## 16. Editing Character Dialogue

Open `src/data/dialogues.ts` to customize the main opening monologue or individual topic answers (*WHO AM I?*, *MY SKILLS*, *MY PROJECTS*, *MY EDUCATION*, *MY GOALS*).

---

## 17. Enabling Voice Narration

Voice narration is built with browser-native Web SpeechSynthesis. It is **disabled by default** for accessibility. Visitors can toggle **VOICE ON / VOICE OFF** inside the Talking Character panel or in the top HUD.

---

## 18. Updating Contact Links

Open `src/data/siteConfig.ts` and populate:

```typescript
contactLinks: {
  email: 'chethan@example.com',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-profile',
  resumeUrl: '/assets/resume.pdf',
  twitter: 'https://x.com/your-handle',
}
```

Unpopulated links are automatically hidden without broken buttons.

---

## 19. Replacing Character Photographs

Place your new photos into `public/assets/` and point `portraitImage` or `referenceOriginalImage` in `src/data/characters.ts`.

---

## 20. Deploying to Vercel (Recommended)

1. Initialize and push your repository to GitHub (see Section 23).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New → Project**.
4. Import your GitHub repository.
5. Build settings (automatically detected from `vercel.json`):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**.

---

## 21. Deploying to Netlify (Alternative)

1. Go to [netlify.com](https://netlify.com) and import your Git repository.
2. Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**.

---

## 22. Known Limitations

- **Browser SpeechSynthesis**: Voice accents and availability depend on your operating system and browser's installed speech voices.
- **Contact Form**: The contact form is a non-submitting demo template by design until a backend endpoint (such as Formspree or Netlify Forms) is configured.
- **No Private Repositories Exposed**: Project source code links remain in an honest "In Development" state until Chethan S connects public GitHub repositories.
