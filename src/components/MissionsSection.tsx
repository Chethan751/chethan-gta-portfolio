import React, { useState } from 'react'
import type { ProjectMission } from '../types'
import { soundManager } from '../utils/audio'
import { MissionModal } from './MissionModal'
import {
  Crosshair,
  ArrowRight,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react'

interface MissionsSectionProps {
  missions: ProjectMission[]
}

export const MissionsSection: React.FC<MissionsSectionProps> = ({ missions }) => {
  const [activeMission, setActiveMission] = useState<ProjectMission | null>(null)

  const handleOpenMission = (mission: ProjectMission) => {
    soundManager.playMissionSelect()
    setActiveMission(mission)
  }

  const handleCloseMission = () => {
    setActiveMission(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Prototype':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      case 'In Development':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
      case 'Concept':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40'
    }
  }

  return (
    <section
      id="missions"
      aria-labelledby="missions-heading"
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-gta text-xs tracking-widest uppercase mb-2">
            <Crosshair className="w-3.5 h-3.5" />
            <span>OPERATION DOSSIERS // PORTFOLIO MISSIONS</span>
          </div>
          <h2
            id="missions-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            ACTIVE MISSIONS & PROJECTS
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Explore Chethan S&apos;s project portfolio presented as GTA V tactical missions. All development statuses and technical features are reported transparently.
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-xs font-mono text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>ALL DESCRIPTIONS VERIFIED</span>
        </div>
      </div>

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {missions.map((mission) => {
          return (
            <div
              key={mission.id}
              className="group relative bg-[#121524] border border-slate-800 hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Header Strip */}
                <div className="p-3 bg-[#0a0c16] border-b border-slate-800 flex items-center justify-between">
                  <span className="font-gta text-xs font-bold tracking-widest text-amber-400">
                    {mission.missionNumber}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold border ${getStatusBadge(
                      mission.status
                    )}`}
                  >
                    {mission.status.toUpperCase()}
                  </span>
                </div>

                {/* Thumbnail Art */}
                <div className="relative aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={mission.thumbnailImage}
                    alt={`Mission artwork for ${mission.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121524] via-transparent to-transparent" />
                </div>

                {/* Title & Description */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide group-hover:text-amber-300 transition-colors">
                    {mission.title}
                  </h3>
                  <p className="font-gta text-xs text-amber-400/90 tracking-wider mb-3">
                    {mission.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {mission.overview}
                  </p>

                  {/* Tech Concept Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {mission.technologiesAndConcepts.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2 py-0.5 rounded bg-black/50 border border-slate-800 text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {mission.technologiesAndConcepts.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-slate-400 font-mono">
                        +{mission.technologiesAndConcepts.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenMission(mission)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#1b2034] to-[#161a2b] group-hover:from-amber-500 group-hover:to-amber-400 text-amber-300 group-hover:text-black font-gta font-bold text-sm tracking-widest rounded border border-amber-500/30 group-hover:border-amber-400 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>VIEW MISSION DOSSIER</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Central File Callout */}
      <div className="mt-8 text-center">
        <p className="text-xs font-mono text-slate-500 inline-flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded border border-slate-800">
          <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Projects configured centrally in src/data/projects.ts</span>
        </p>
      </div>

      {/* Mission Detail Modal */}
      <MissionModal mission={activeMission} onClose={handleCloseMission} />
    </section>
  )
}
