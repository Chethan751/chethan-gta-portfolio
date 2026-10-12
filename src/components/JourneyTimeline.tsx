import React from 'react'
import {
  GraduationCap,
  Terminal,
  Cloud,
  Cpu,
  Compass,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'

interface Milestone {
  id: string
  label: string
  subtitle: string
  description: string
  icon: React.FC<{ className?: string }>
  badgeText: string
  highlights: string[]
}

const milestones: Milestone[] = [
  {
    id: 'm-education',
    label: 'Education',
    subtitle: 'Undergraduate Computer Science & Engineering',
    description:
      'Pursuing Bachelor of Engineering (B.E.) in Computer Science and Engineering at Channabasaveshwara Institute of Technology (CIT) in Gubbi, Karnataka, India. Building rigorous academic foundations in computer science theory and software engineering.',
    icon: GraduationCap,
    badgeText: 'ACADEMIC FOUNDATION',
    highlights: ['B.E. in CSE at CIT Gubbi', 'Core CS Curriculum', 'Karnataka, India'],
  },
  {
    id: 'm-programming',
    label: 'Programming Foundations',
    subtitle: 'Procedural & Object-Oriented Engineering',
    description:
      'Developing strong core fundamentals in procedural C programming and Python. Focus on memory allocation, pointer mechanics, data structures, algorithm efficiency, and relational database schema design.',
    icon: Terminal,
    badgeText: 'CORE COMPUTATION',
    highlights: ['C Programming', 'Python Scripting', 'DBMS & SQL Foundations'],
  },
  {
    id: 'm-linux-cloud',
    label: 'Linux and Cloud Learning',
    subtitle: 'Operating Systems & Infrastructure Essentials',
    description:
      'Diving deep into Unix/Linux operating system internals, command-line utilities, process administration, and bash scripting. Exploring scalable hosting, compute instances, and cloud primitives on Google Cloud.',
    icon: Cloud,
    badgeText: 'SYSTEMS & CLOUD',
    highlights: ['Linux Terminal Mastery', 'Bash Automation', 'Google Cloud Basics'],
  },
  {
    id: 'm-ai-projects',
    label: 'AI Project Concepts',
    subtitle: 'Architecting Intelligent Systems',
    description:
      'Conceptualizing practical computer vision and AI solutions: FALCON AI for vehicle emergency triage, TRINETRA-AI for command-center data aggregation, and NOVA AI SUITE for local bilingual English/Kannada productivity.',
    icon: Cpu,
    badgeText: 'INTELLIGENT SYSTEMS',
    highlights: ['FALCON AI (CV Prototype)', 'TRINETRA-AI Concept', 'NOVA AI SUITE (Bilingual)'],
  },
  {
    id: 'm-current-journey',
    label: 'Current Development Journey',
    subtitle: 'Modern AI-Assisted Craftsmanship',
    description:
      'Active software craftsmanship integrating modern AI workflows ("Vibe Coding"), pairing with language models, and developing immersive web applications deployed on global cloud infrastructure.',
    icon: Compass,
    badgeText: 'ACTIVE HORIZON',
    highlights: ['Vibe Coding Methodology', 'Conversational AI Portfolios', 'Global Cloud Deployments'],
  },
]

export const JourneyTimeline: React.FC = () => {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-gta text-xs tracking-widest uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-red-400" />
            <span>SCENE 04 // DEVELOPMENT CHRONOLOGY</span>
          </div>
          <h2
            id="journey-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            JOURNEY TIMELINE
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Tracking verified milestones across Chethan S&apos;s computer science education and engineering progression.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>STRICT INTEGRITY // NO FABRICATED DATES</span>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative">
        {/* Glowing Center Line for Desktop */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-rose-500/50 to-red-900 -translate-x-1/2 shadow-[0_0_12px_rgba(220,38,38,0.7)]"
        />

        {/* Timeline Items */}
        <div className="space-y-12">
          {milestones.map((item, index) => {
            const Icon = item.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8`}
              >
                {/* Milestone Content Card */}
                <div className="w-full md:w-[46%] text-left">
                  <div className="bg-[#0f111c] border-2 border-red-500/30 hover:border-red-500/70 rounded-xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-gta text-xs font-bold tracking-widest text-red-400 uppercase px-2.5 py-0.5 rounded bg-red-500/15 border border-red-500/30">
                        {item.badgeText}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        MILESTONE 0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide group-hover:text-red-300 transition-colors">
                      {item.label}
                    </h3>
                    <p className="font-gta text-xs text-red-400/90 tracking-wider mb-3">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Highlights Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                      {item.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-black/60 border border-slate-800 text-slate-300 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-red-400" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Node Pin */}
                <div className="hidden md:flex relative z-10 w-12 h-12 rounded-full bg-[#121526] border-2 border-red-500 items-center justify-center text-red-400 shadow-[0_0_20px_rgba(220,38,38,0.6)] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Empty opposite column for balance */}
                <div className="hidden md:block w-[46%]" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
