import React from 'react'
import type { Skill, Environment } from '../types'
import { soundManager } from '../utils/audio'
import {
  Cpu,
  FileCode2,
  Database,
  Terminal,
  Cloud,
  Sparkles,
  Code2,
  Layers,
  MapPin,
  ExternalLink,
} from 'lucide-react'

interface SkillsSectionProps {
  skills: Skill[]
  activeSkillId: string
  onSelectSkill: (skill: Skill) => void
  environments: Record<string, Environment>
}

// Icon dictionary
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  FileCode2,
  Database,
  Terminal,
  Cloud,
  Sparkles,
  Code2,
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  activeSkillId,
  onSelectSkill,
  environments,
}) => {
  const activeSkill = skills.find((s) => s.id === activeSkillId) || skills[0]
  const currentEnv = environments[activeSkill.environmentId]

  const handleSkillClick = (skill: Skill) => {
    soundManager.playSwitch()
    onSelectSkill(skill)
  }

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-gta text-xs tracking-widest uppercase mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>DYNAMIC SKILL MATRIX // ENVIRONMENT BACKDROP ENGINE</span>
          </div>
          <h2
            id="skills-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            TECHNICAL SKILLS & ENVIRONMENTS
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Selecting any of Chethan S&apos;s verified skills dynamically transitions the world background to its custom Los Santos environment.
          </p>
        </div>

        {/* Current Active Scene Indicator */}
        {currentEnv && (
          <div className="mt-4 md:mt-0 flex items-center gap-2.5 px-3.5 py-2 bg-[#121626] border border-amber-500/30 rounded-lg text-xs font-mono">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-amber-400 font-bold">{currentEnv.name}</div>
              <div className="text-[10px] text-slate-400">{currentEnv.locationLabel}</div>
            </div>
          </div>
        )}
      </div>

      {/* Grid of 6 Verified Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills
          .filter((s) => s.enabled)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((skill) => {
            const isActive = skill.id === activeSkillId
            const IconComponent = iconMap[skill.iconName] || Code2
            const env = environments[skill.environmentId]

            return (
              <div
                key={skill.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`Select skill ${skill.name}`}
                onClick={() => handleSkillClick(skill)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSkillClick(skill)
                  }
                }}
                className={`group relative rounded-xl p-6 text-left transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400 overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#151928] border-2 shadow-[0_0_25px_rgba(245,158,11,0.25)] -translate-y-1'
                    : 'bg-[#11131e] border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5'
                }`}
                style={{
                  borderColor: isActive ? skill.accentColor : undefined,
                }}
              >
                {/* Background Environment Mini Preview & Gradient */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-15 transition-opacity duration-500 group-hover:opacity-25"
                  style={{
                    backgroundImage: `url(${skill.backgroundImage})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131e] via-[#11131e]/90 to-transparent" />

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    {/* Icon container */}
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: `${skill.accentColor}20`,
                        border: `1px solid ${skill.accentColor}60`,
                        color: skill.accentColor,
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Category pill */}
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 border border-slate-800 text-slate-300">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide group-hover:text-amber-300 transition-colors mb-2">
                    {skill.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Linked Environment Label Footer */}
                <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span className="truncate max-w-[170px]">{env?.name || 'Los Santos'}</span>
                  </span>
                  {isActive ? (
                    <span className="text-amber-400 font-bold tracking-widest text-[10px]">
                      VIEWING SCENE
                    </span>
                  ) : (
                    <span className="text-slate-500 group-hover:text-amber-400 transition-colors flex items-center gap-0.5">
                      LOAD SCENE <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              </div>
            )
          })}
      </div>

      {/* Extensibility Documentation Callout */}
      <div className="mt-10 p-5 bg-[#0f111a] border border-amber-500/20 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="font-gta text-base font-bold text-amber-400 tracking-wider">
            CONFIG-DRIVEN ARCHITECTURE FOR FUTURE SKILLS
          </h4>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Skills are entirely defined in <code className="text-amber-300 font-mono">src/data/skills.ts</code>. Adding new technologies (e.g., Docker, Git, or Java) takes just 1 JSON entry without modifying UI components.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400 shrink-0 bg-black/50 px-3 py-1.5 rounded border border-slate-800">
          DATA SOURCE: src/data/skills.ts
        </div>
      </div>
    </section>
  )
}
