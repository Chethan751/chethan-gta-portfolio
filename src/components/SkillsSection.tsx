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
  CheckCircle2,
  Shield,
} from 'lucide-react'

interface SkillsSectionProps {
  skills: Skill[]
  activeSkillId: string
  onSelectSkill: (skill: Skill) => void
  environments: Record<string, Environment>
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  FileCode2,
  Database,
  Terminal,
  Cloud,
  Sparkles,
  Code2,
}

const skillConceptsMap: Record<string, string[]> = {
  'skill-c': ['Low-level Memory & Pointers', 'Data Structures', 'Procedural Algorithms', 'Memory Management'],
  'skill-python': ['Rapid Prototyping', 'Computer Vision Scripting', 'Automation', 'Flask APIs'],
  'skill-dbms': ['Relational Schema Design', 'SQL Queries', 'Normalization (1NF-3NF)', 'ACID Transactions'],
  'skill-linux': ['Bash Shell Scripting', 'Process Inspection', 'File Permissions & Cron', 'System Utilities'],
  'skill-gcp': ['Compute Engine Basics', 'Cloud Storage Buckets', 'Networking Primitives', 'Cloud Deployment'],
  'skill-vibe': ['AI-Augmented Development', 'Prompt Craftsmanship', 'Iterative Prototyping', 'LLM Integration'],
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

  const conceptsList = activeSkill.concepts || skillConceptsMap[activeSkill.id] || ['Core Principles', 'Foundational Logic', 'Practical Application']

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-gta text-xs tracking-widest uppercase mb-2">
            <Layers className="w-3.5 h-3.5 text-red-400" />
            <span>SCENE 03 // FUTURISTIC TECHNOLOGY SPACE</span>
          </div>
          <h2
            id="skills-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            SKILLS ENVIRONMENT
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Explore Chethan S&apos;s 6 verified technical skills presented in an interactive holographic technology room with glowing floor architecture.
          </p>
        </div>

        {/* Current Active Scene Indicator */}
        {currentEnv && (
          <div className="mt-4 md:mt-0 flex items-center gap-2.5 px-3.5 py-2 bg-[#0d0f1b] border border-red-500/30 rounded-lg text-xs font-mono shadow-md">
            <MapPin className="w-4 h-4 text-red-400 shrink-0" />
            <div>
              <div className="text-red-400 font-bold">{currentEnv.name}</div>
              <div className="text-[10px] text-slate-400">{currentEnv.locationLabel}</div>
            </div>
          </div>
        )}
      </div>

      {/* Futuristic Glowing Grid Floor Stage (Reference Screenshot 5 Inspired) */}
      <div className="relative mb-12 p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0e111f] via-[#090b14] to-black border-2 border-red-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Glowing Perspective Floor Grid Lines */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-64 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(220, 38, 38, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(220, 38, 38, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(400px) rotateX(60deg) scale(1.6)',
            transformOrigin: 'bottom center',
          }}
        />
        <div className="absolute inset-0 bg-radial from-red-600/10 via-transparent to-transparent pointer-events-none" />

        {/* Central Character & Active Holographic Skill Spotlight */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Active Skill Holographic Detail Panel */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-600/20 border border-red-500/40 text-red-300 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>ACTIVE SKILL SPOTLIGHT // {activeSkill.category.toUpperCase()}</span>
            </div>

            <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide flex items-center gap-3">
              <span>{activeSkill.name}</span>
            </h3>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-black/60 p-4 sm:p-5 rounded-xl border border-slate-800 shadow-inner">
              {activeSkill.description}
            </p>

            {/* Verified Concepts Tags */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                VERIFIED FOCUS AREAS:
              </div>
              <div className="flex flex-wrap gap-2">
                {conceptsList.map((concept) => (
                  <span
                    key={concept}
                    className="px-3 py-1 rounded bg-[#151929] border border-red-500/30 text-red-200 text-xs font-mono flex items-center gap-1.5 shadow"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                    <span>{concept}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Accurately described • No fabricated expertise claims</span>
            </div>
          </div>

          {/* Right: Character Standing On Futuristic Glowing Pedestal */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-52 sm:w-64 h-64 sm:h-76 flex items-end justify-center">
              {/* Glowing floor ring under character */}
              <div
                className="absolute bottom-0 w-48 h-12 rounded-full blur-md opacity-75"
                style={{
                  background: 'radial-gradient(circle, rgba(220,38,38,0.8) 0%, rgba(220,38,38,0) 70%)',
                }}
              />
              <div className="absolute bottom-1 w-44 h-8 rounded-full border-2 border-red-500/60 shadow-[0_0_20px_rgba(220,38,38,0.8)]" />

              <img
                src="/assets/chethan_suit.jpg"
                alt="Chethan S - Technology Space Character"
                className="relative z-10 h-full w-auto object-contain rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] filter brightness-105"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="font-bebas text-lg text-white tracking-wider block">CHETHAN S</span>
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">
                CIT CSE DEVELOPER
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of the 6 Verified Skills (Glowing Pedestal Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
        {skills
          .filter((s) => s.enabled)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((skill) => {
            const isActive = skill.id === activeSkillId
            const IconComponent = iconMap[skill.iconName] || Code2

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
                className={`group relative rounded-xl p-6 text-left transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-400 overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#141829] border-2 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.35)] -translate-y-1.5'
                    : 'bg-[#0f111c] border border-slate-800 hover:border-red-500/50 hover:-translate-y-1'
                }`}
              >
                {/* Background Environment Mini Preview & Ambient Gradient */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-15 transition-opacity duration-500 group-hover:opacity-25"
                  style={{
                    backgroundImage: `url(${skill.backgroundImage})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f111c] via-[#0f111c]/90 to-transparent" />

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    {/* Glowing Tech Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-red-600/30 border border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                          : 'bg-black/60 border border-slate-700 text-slate-300 group-hover:text-red-400 group-hover:border-red-500/40'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 border border-slate-800 text-slate-300">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide group-hover:text-red-300 transition-colors mb-2">
                    {skill.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Footer Status */}
                <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span className="truncate max-w-[170px]">{environments[skill.environmentId]?.name || 'Scene'}</span>
                  </span>
                  {isActive ? (
                    <span className="text-red-400 font-bold tracking-widest text-[10px]">
                      ACTIVE SPOTLIGHT
                    </span>
                  ) : (
                    <span className="text-slate-500 group-hover:text-red-400 transition-colors">
                      CLICK TO INSPECT
                    </span>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}
