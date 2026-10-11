import React from 'react'
import type { Character, Environment } from '../types'
import { soundManager } from '../utils/audio'
import {
  Compass,
  Crosshair,
  MessageSquare,
  Sparkles,
  MapPin,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react'

interface HeroSectionProps {
  displayName: string
  subtitle: string
  tagline: string
  selectedCharacter: Character
  activeEnvironment: Environment
  onNavigate: (sectionId: string) => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  displayName,
  subtitle,
  tagline,
  selectedCharacter,
  activeEnvironment,
  onNavigate,
}) => {
  const handleAction = (sectionId: string) => {
    soundManager.playMissionSelect()
    onNavigate(sectionId)
  }

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden text-center"
    >
      {/* Background Environment Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeEnvironment.backgroundImage}
          alt={activeEnvironment.name}
          className="w-full h-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: 1 - activeEnvironment.overlayOpacity }}
        />
        {/* Dynamic Dark Gradient & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-[#0a0b10]/60 to-black/40" />
        <div className="absolute inset-0 vignette-radial" />
        <div className="absolute inset-0 scanlines opacity-20" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 border border-amber-500/50 text-amber-400 font-gta text-xs sm:text-sm tracking-widest uppercase shadow-lg">
            <Compass className="w-3.5 h-3.5" />
            <span>{subtitle}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121524]/80 border border-slate-700 text-slate-300 font-mono text-xs tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>CIT GUBBI // KARNATAKA, INDIA</span>
          </div>
        </div>

        {/* Display Name */}
        <h1
          id="hero-title"
          className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wider leading-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-amber-200">
            {displayName}
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 font-gta text-xl sm:text-2xl md:text-3xl text-amber-400 font-bold tracking-[0.2em] max-w-2xl drop-shadow-md">
          {tagline}
        </p>

        {/* Short Bio Summary */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed font-sans">
          Pursuing B.E. in Computer Science and Engineering at Channabasaveshwara Institute of Technology (CIT), exploring systems programming, Linux, cloud architectures, and intelligent application concepts.
        </p>

        {/* Hero Interactive CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleAction('missions')}
            className="group px-7 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-gta text-lg sm:text-xl font-black tracking-widest rounded-sm shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
          >
            <Crosshair className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span>VIEW MISSIONS</span>
          </button>

          <button
            onClick={() => handleAction('about')}
            className="px-6 py-3.5 sm:px-8 sm:py-4 bg-[#141829]/90 hover:bg-slate-800 text-slate-100 hover:text-white font-gta text-base sm:text-lg tracking-wider rounded-sm border border-slate-700 hover:border-amber-400/60 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>TALK WITH ME</span>
          </button>

          <button
            onClick={() => handleAction('skills')}
            className="px-6 py-3.5 sm:px-8 sm:py-4 bg-black/60 hover:bg-black/80 text-amber-300 hover:text-amber-200 font-gta text-base sm:text-lg tracking-wider rounded-sm border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>EXPLORE SKILLS</span>
          </button>
        </div>

        {/* Tactical Status Cards at the bottom of hero */}
        <div className="mt-12 sm:mt-16 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-4 bg-black/70 backdrop-blur-sm border border-slate-800 rounded-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>VERIFIED PROFILE</span>
            </div>
            <div className="font-bebas text-xl text-white">CIT CSE STUDENT</div>
            <div className="text-xs text-slate-300">Gubbi, Karnataka, India</div>
          </div>

          <div className="p-4 bg-black/70 backdrop-blur-sm border border-slate-800 rounded-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-amber-400" />
              <span>ACTIVE THEME</span>
            </div>
            <div className="font-bebas text-xl text-amber-300 truncate">
              {selectedCharacter.roleTitle}
            </div>
            <div className="text-xs text-slate-300">1 Identity • 3 Perspectives</div>
          </div>

          <div className="p-4 bg-black/70 backdrop-blur-sm border border-slate-800 rounded-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACTIVE SCENE</span>
            </div>
            <div className="font-bebas text-xl text-cyan-300 truncate">
              {activeEnvironment.name}
            </div>
            <div className="text-xs text-slate-300 truncate">{activeEnvironment.locationLabel}</div>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => handleAction('character')}
          className="mt-8 text-slate-400 hover:text-amber-400 transition-colors flex flex-col items-center gap-1 cursor-pointer"
          aria-label="Scroll down to character selection"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">SCROLL DOWN</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
