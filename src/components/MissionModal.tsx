import React, { useEffect } from 'react'
import type { ProjectMission } from '../types'
import { soundManager } from '../utils/audio'
import { GithubIcon } from './SocialIcons'
import {
  X,
  Target,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react'


interface MissionModalProps {
  mission: ProjectMission | null
  onClose: () => void
}

export const MissionModal: React.FC<MissionModalProps> = ({ mission, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playClick()
        onClose()
      }
    }

    if (mission) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mission, onClose])

  if (!mission) return null

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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#10131f] border-2 border-amber-500/40 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] my-8 gta-panel-border text-left">
        {/* Header Ribbon */}
        <div className="p-4 sm:p-5 bg-[#0a0c16] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-gta text-sm tracking-widest text-amber-400 font-bold">
              {mission.missionNumber} // DOSSIER BRIEFING
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded font-mono font-semibold border ${getStatusBadge(
                mission.status
              )}`}
            >
              STATUS: {mission.status.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick()
              onClose()
            }}
            className="p-1.5 rounded bg-black/50 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-slate-800 transition-colors cursor-pointer"
            aria-label="Close mission dossier modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Hero Banner & Title */}
          <div className="relative rounded-lg overflow-hidden border border-slate-800 aspect-[21/9] bg-black">
            <img
              src={mission.thumbnailImage}
              alt={`Concept art for ${mission.title}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10131f] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3
                id="mission-dialog-title"
                className="font-bebas text-3xl sm:text-5xl text-white tracking-wider leading-none drop-shadow-md"
              >
                {mission.title}
              </h3>
              <p className="font-gta text-amber-400 text-sm sm:text-base tracking-wide mt-1">
                {mission.tagline}
              </p>
            </div>
          </div>

          {/* Mission Overview */}
          <div>
            <h4 className="flex items-center gap-2 font-bebas text-xl text-amber-400 tracking-wide mb-2">
              <Target className="w-4 h-4" />
              <span>MISSION OVERVIEW</span>
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-[#141828] p-4 rounded-lg border border-slate-800">
              {mission.overview}
            </p>
          </div>

          {/* Two-Column Problem & Proposed Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#141828] p-4 sm:p-5 rounded-lg border border-rose-500/20">
              <h5 className="flex items-center gap-2 font-gta text-sm font-bold text-rose-400 tracking-wider mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>CHALLENGE & PROBLEM</span>
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {mission.problemStatement}
              </p>
            </div>

            <div className="bg-[#141828] p-4 sm:p-5 rounded-lg border border-emerald-500/20">
              <h5 className="flex items-center gap-2 font-gta text-sm font-bold text-emerald-400 tracking-wider mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>PROPOSED SOLUTION</span>
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {mission.proposedSolution}
              </p>
            </div>
          </div>

          {/* Technologies and Concepts */}
          <div>
            <h4 className="flex items-center gap-2 font-bebas text-xl text-amber-400 tracking-wide mb-2">
              <Cpu className="w-4 h-4" />
              <span>TECHNOLOGIES & ARCHITECTURAL CONCEPTS</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {mission.technologiesAndConcepts.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Implemented Features */}
          <div>
            <h4 className="flex items-center gap-2 font-bebas text-xl text-emerald-400 tracking-wide mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>VERIFIED IMPLEMENTATION MILESTONES</span>
            </h4>
            <ul className="space-y-2 bg-[#141828] p-4 rounded-lg border border-slate-800">
              {mission.verifiedImplementedFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Improvements Roadmap */}
          <div>
            <h4 className="flex items-center gap-2 font-bebas text-xl text-cyan-400 tracking-wide mb-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>POTENTIAL FUTURE ROADMAP</span>
            </h4>
            <ul className="space-y-2 bg-[#141828] p-4 rounded-lg border border-slate-800">
              {mission.futureImprovements.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Honest Availability Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>REPOSITORY & DEMO LINKS PROTECTED UNTIL PUBLIC RELEASE</span>
            </div>

            <div className="flex items-center gap-3">
              {mission.repoUrl ? (
                <a
                  href={mission.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-gta tracking-wider"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>SOURCE CODE</span>
                </a>
              ) : (
                <span
                  title="Source repository is currently private during developmental phase."
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black/60 text-slate-400 border border-slate-800 rounded text-xs font-mono"
                >
                  <GithubIcon className="w-3.5 h-3.5 opacity-50" />
                  <span>REPO: IN DEVELOPMENT</span>
                </span>
              )}

              {mission.demoUrl ? (
                <a
                  href={mission.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded text-xs font-gta tracking-wider"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LAUNCH DEMO</span>
                </a>
              ) : (
                <span
                  title="Live deployment is not yet public."
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black/60 text-slate-400 border border-slate-800 rounded text-xs font-mono"
                >
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                  <span>DEPLOYMENT: PROTOTYPE ONLY</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
