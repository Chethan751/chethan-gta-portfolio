import { useState, useEffect } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Intro } from './components/Intro'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { CharacterSelection } from './components/CharacterSelection'
import { TalkingCharacter } from './components/TalkingCharacter'
import { SkillsSection } from './components/SkillsSection'
import { MissionsSection } from './components/MissionsSection'
import { EducationSection } from './components/EducationSection'
import { AchievementsSection } from './components/AchievementsSection'
import { ContactSection } from './components/ContactSection'
import { ConfigEditorModal } from './components/ConfigEditorModal'
import { Footer } from './components/Footer'

import { initialSiteConfig } from './data/siteConfig'
import { characters } from './data/characters'
import { skills as initialSkills } from './data/skills'
import { environments } from './data/environments'
import { projectMissions } from './data/projects'
import { initialAchievements } from './data/achievements'
import { soundManager } from './utils/audio'
import type { Character, Skill, SiteConfig } from './types'


export function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(initialSiteConfig)
  const [introDismissed, setIntroDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('chethan_portfolio_intro_dismissed') === 'true'
    }
    return false
  })

  const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[0])
  const [activeEnvironmentId, setActiveEnvironmentId] = useState<string>(characters[0].environmentId)
  const [activeSkillId, setActiveSkillId] = useState<string>('skill-c')
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const [configEditorOpen, setConfigEditorOpen] = useState<boolean>(false)

  // IntersectionObserver to track active section for Navbar HUD
  useEffect(() => {
    const sectionIds = ['home', 'character', 'about', 'skills', 'missions', 'education', 'achievements', 'contact']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id)
              }
            })
          },
          { threshold: 0.25 }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const handleDismissIntro = () => {
    setIntroDismissed(true)
    sessionStorage.setItem('chethan_portfolio_intro_dismissed', 'true')
  }

  const handleReplayIntro = () => {
    setIntroDismissed(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleToggleSound = () => {
    const next = !soundEnabled
    setSoundEnabled(next)
    soundManager.setEnabled(next)
    if (next) {
      soundManager.playMissionSelect()
    }
  }

  const handleSelectCharacter = (char: Character) => {
    setSelectedCharacter(char)
    setActiveEnvironmentId(char.environmentId)
  }

  const handleSelectSkill = (skill: Skill) => {
    setActiveSkillId(skill.id)
    if (skill.environmentId && environments[skill.environmentId]) {
      setActiveEnvironmentId(skill.environmentId)
    }
  }

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const activeEnvironment = environments[activeEnvironmentId] || environments.env_intro

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-[#0a0b10] text-slate-100 overflow-x-hidden">
        {/* Intro sequence */}
        {!introDismissed && (
          <Intro
            onEnter={handleDismissIntro}
            displayName={siteConfig.displayName}
            subtitle={siteConfig.subtitle}
            tagline={siteConfig.tagline}
          />
        )}

        {/* Global Dynamic Environment Backdrop */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000 ease-out"
        >
          <img
            src={activeEnvironment.backgroundImage}
            alt=""
            className="w-full h-full object-cover transition-opacity duration-1000 filter brightness-90"
            style={{ opacity: 0.18 }}
          />
          <div className="absolute inset-0 bg-[#0a0b10]/90" />
          <div className="absolute inset-0 scanlines opacity-15" />
        </div>

        {/* Top GTA HUD Navigation */}
        <Navbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          currentCharacter={selectedCharacter}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenConfigEditor={() => setConfigEditorOpen(true)}
        />

        {/* Main Sections */}
        <main className="relative z-10">
          <HeroSection
            displayName={siteConfig.displayName}
            subtitle={siteConfig.subtitle}
            tagline={siteConfig.tagline}
            selectedCharacter={selectedCharacter}
            activeEnvironment={activeEnvironment}
            onNavigate={handleNavigate}
          />

          <CharacterSelection
            characters={characters}
            selectedCharacter={selectedCharacter}
            onSelectCharacter={handleSelectCharacter}
          />

          <TalkingCharacter
            selectedCharacter={selectedCharacter}
            onNavigateSection={handleNavigate}
          />

          <SkillsSection
            skills={initialSkills}
            activeSkillId={activeSkillId}
            onSelectSkill={handleSelectSkill}
            environments={environments}
          />

          <MissionsSection missions={projectMissions} />

          <EducationSection education={siteConfig.education} />

          <AchievementsSection achievements={initialAchievements} />

          <ContactSection
            contactLinks={siteConfig.contactLinks}
            location={siteConfig.location}
            displayName={siteConfig.displayName}
          />
        </main>

        {/* Footer */}
        <Footer
          onReplayIntro={handleReplayIntro}
          onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          displayName={siteConfig.displayName}
        />

        {/* Live Config Editor Modal */}
        <ConfigEditorModal
          isOpen={configEditorOpen}
          onClose={() => setConfigEditorOpen(false)}
          currentConfig={siteConfig}
          onUpdateConfig={(updated) => setSiteConfig(updated)}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App
