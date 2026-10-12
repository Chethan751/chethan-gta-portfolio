import React, { useState } from 'react'
import type { ProjectMission } from '../types'
import { soundManager } from '../utils/audio'
import { MissionModal } from './MissionModal'
import {
  Crosshair,
  ArrowRight,
  ShieldCheck,
  FolderGit2,
  Tv,
  Eye,
  CheckCircle2,
} from 'lucide-react'

interface MissionsSectionProps {
  missions: ProjectMission[]
}

export const MissionsSection: React.FC<MissionsSectionProps> = ({ missions }) => {
  const [selectedMissionIndex, setSelectedMissionIndex] = useState(0)
  const [activeModalMission, setActiveModalMission] = useState<ProjectMission | null>(null)

  const activeMission = missions[selectedMissionIndex] || missions[0]

  const handleSelectMission = (index: number) => {
    soundManager.playSwitch()
    setSelectedMissionIndex(index)
  }

  const handleOpenModal = (mission: ProjectMission) => {
    soundManager.playMissionSelect()
    setActiveModalMission(mission)
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
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-gta text-xs tracking-widest uppercase mb-2">
            <Crosshair className="w-3.5 h-3.5 text-red-400" />
            <span>SCENE 05 // THREE PROJECT ENVIRONMENTS</span>
          </div>
          <h2
            id="missions-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            PROJECT GALLERY & MISSIONS
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Three distinct project environments with large display screens, architectural breakdowns, and transparent development statuses.
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-xs font-mono text-emerald-400 flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-slate-800 rounded">
          <ShieldCheck className="w-4 h-4" />
          <span>ACCURATE CONCEPT DISCLOSURE</span>
        </div>
      </div>

      {/* Project Switcher Bar */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {missions.map((mission, idx) => {
          const isSelected = idx === selectedMissionIndex
          return (
            <button
              key={mission.id}
              onClick={() => handleSelectMission(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-gta text-sm tracking-wider uppercase transition-all cursor-pointer ${
                isSelected
                  ? 'bg-red-600 text-white font-black shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-400'
                  : 'bg-[#121524] text-slate-300 border border-slate-800 hover:border-red-500/40 hover:text-white'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>{mission.title}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono border ${getStatusBadge(mission.status)}`}>
                {mission.status}
              </span>
            </button>
          )
        })}
      </div>

      {/* Large Display Screen Environment for Active Mission */}
      <div className="bg-[#0e101c] border-2 border-red-500/30 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] mb-12 gta-panel-border">
        {/* Top Screen HUD Bar */}
        <div className="p-4 bg-[#07080f] border-b border-red-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bebas text-xl text-white tracking-wider">{activeMission.title}</span>
            <span className="text-red-400">// {activeMission.missionNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">STATUS:</span>
            <span className={`px-2 py-0.5 rounded font-mono font-bold border ${getStatusBadge(activeMission.status)}`}>
              {activeMission.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Big Display Screen Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Large Display Visual */}
          <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] bg-black overflow-hidden flex items-center justify-center">
            <img
              src={activeMission.thumbnailImage}
              alt={`Display screen for ${activeMission.title}`}
              className="w-full h-full object-cover filter brightness-95 contrast-110"
            />
            {/* Ambient Screen Vignette & Scanlines */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e101c] via-transparent to-black/40" />
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

            {/* Screen Corner Reticles */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-red-400 bg-black/70 px-2 py-1 rounded border border-red-500/40">
              DISPLAY CH: 0{selectedMissionIndex + 1} // TACTICAL FEED
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-gta text-red-300 font-bold tracking-wider drop-shadow">
                {activeMission.tagline}
              </span>
            </div>
          </div>

          {/* Right Column: Functional Detail Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#111424] border-t lg:border-t-0 lg:border-l border-slate-800 text-left">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono text-red-400 uppercase tracking-widest block mb-1">
                  PROJECT SPECIFICATION
                </span>
                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                  {activeMission.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                  {activeMission.overview}
                </p>
              </div>

              {/* Technologies and Concepts */}
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                  STACK & CONCEPTS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeMission.technologiesAndConcepts.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded bg-black/70 border border-red-500/25 text-red-200 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Features */}
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                  VERIFIED IMPLEMENTATION STATUS:
                </div>
                <ul className="space-y-1.5">
                  {activeMission.verifiedImplementedFeatures.slice(0, 3).map((feat) => (
                    <li key={feat} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Launch Dossier Action */}
            <div className="pt-6 border-t border-slate-800 mt-6">
              <button
                onClick={() => handleOpenModal(activeMission)}
                className="w-full py-3 px-5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-gta font-black text-sm tracking-widest rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>INSPECT FULL MISSION DOSSIER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All 3 Distinct Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {missions.map((mission, idx) => {
          const isSelected = idx === selectedMissionIndex
          return (
            <div
              key={mission.id}
              onClick={() => handleSelectMission(idx)}
              className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#151929] border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)] -translate-y-1'
                  : 'bg-[#0f111c] border-slate-800 hover:border-red-500/40 hover:-translate-y-0.5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-red-400 font-bold">{mission.missionNumber}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${getStatusBadge(mission.status)}`}>
                    {mission.status}
                  </span>
                </div>
                <h4 className="font-bebas text-2xl text-white tracking-wide">{mission.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">{mission.tagline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{mission.technologiesAndConcepts[0]}</span>
                <span className="text-red-400 font-gta tracking-wider">SELECT DISPLAY →</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* File Callout */}
      <div className="mt-8 text-center">
        <p className="text-xs font-mono text-slate-500 inline-flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded border border-slate-800">
          <FolderGit2 className="w-3.5 h-3.5 text-red-400" />
          <span>Configured centrally in src/data/projects.ts • Transparent concept disclosures</span>
        </p>
      </div>

      {/* Full Modal */}
      <MissionModal mission={activeModalMission} onClose={() => setActiveModalMission(null)} />
    </section>
  )
}
