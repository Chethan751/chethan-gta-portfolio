import React from 'react'
import type { Character, Environment } from '../types'
import { soundManager } from '../utils/audio'
import {
  Crosshair,
  MessageSquare,
  Sparkles,
  MapPin,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
  Layers,
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
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 overflow-hidden text-center select-none"
    >
      {/* Background Environment Image with Dark Red Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={activeEnvironment.backgroundImage}
          alt=""
          className="w-full h-full object-cover filter brightness-50 contrast-125 transition-opacity duration-1000 ease-out"
          style={{ opacity: 0.28 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-[#0a0b10]/80 to-black/70" />
        <div className="absolute inset-0 bg-radial from-red-950/20 via-transparent to-black pointer-events-none" />
        <div className="absolute inset-0 scanlines opacity-20" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center">
        {/* Secondary Title (Reference Match: ••• WELCOME TO MY WORLD •••) */}
        <div className="flex items-center gap-3 text-white font-gta font-bold text-xs sm:text-base md:text-lg tracking-[0.35em] text-center mb-1 drop-shadow-md">
          <span className="text-red-500 tracking-normal">• • •</span>
          <span>WELCOME TO MY WORLD</span>
          <span className="text-red-500 tracking-normal">• • •</span>
        </div>

        {/* Master Stage Box with Bold Red Typography Behind Character */}
        <div className="relative w-full flex items-center justify-center my-3 sm:my-4">
          {/* Top-Right Badge: • LEGEND • */}
          <div className="absolute -top-2 right-4 sm:right-16 z-20">
            <div className="px-3 py-0.5 bg-white text-black font-gta font-black text-xs md:text-sm tracking-widest rounded-sm shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>LEGEND</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
          </div>

          {/* Bottom-Left Badge: • CIT CSE • */}
          <div className="absolute -bottom-2 left-4 sm:left-16 z-20">
            <div className="px-3 py-0.5 bg-white text-black font-gta font-black text-xs md:text-sm tracking-widest rounded-sm shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>CIT CSE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
          </div>

          {/* Bottom-Right Dot Matrix */}
          <div className="absolute -bottom-2 right-4 sm:right-16 z-20 hidden sm:grid grid-cols-4 gap-1.5 opacity-80">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
            ))}
          </div>

          {/* Huge Red Typography: "CHETHAN S" */}
          <h1
            id="hero-title"
            className="w-full text-center font-bebas text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black tracking-normal leading-none text-red-600 drop-shadow-[0_0_50px_rgba(220,38,38,0.4)] pointer-events-none"
          >
            {displayName}
          </h1>

          {/* Foreground Character Image */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="relative h-60 sm:h-76 md:h-96 w-auto flex items-end justify-center pointer-events-auto">
              <img
                src={selectedCharacter.portraitImage || '/assets/chethan_suit.jpg'}
                alt={`Chethan S - ${selectedCharacter.roleTitle}`}
                className="h-full w-auto object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] border border-red-500/40 filter brightness-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0b10] via-[#0a0b10]/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Identity & Education Headline */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-mono text-slate-300">
          <span className="px-3 py-1 bg-black/80 border border-red-500/30 rounded text-red-400 font-gta tracking-wider uppercase font-bold flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-red-500" />
            <span>B.E. COMPUTER SCIENCE & ENGINEERING</span>
          </span>
          <span className="px-3 py-1 bg-black/80 border border-slate-700 rounded text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>CIT GUBBI // KARNATAKA, INDIA</span>
          </span>
        </div>

        {/* Short Mission Intro */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed font-sans px-4">
          Pursuing B.E. in Computer Science and Engineering at Channabasaveshwara Institute of Technology (CIT), exploring foundational systems, Linux, cloud architectures, and conversational AI.
        </p>

        {/* Hero Interactive CTAs */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 px-4">
          <button
            onClick={() => handleAction('about')}
            className="group px-7 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-gta text-lg sm:text-xl font-black tracking-widest rounded-sm shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
          >
            <MessageSquare className="w-5 h-5 text-white" />
            <span>TALK WITH AI CHETHAN</span>
          </button>

          <button
            onClick={() => handleAction('skills')}
            className="px-6 py-3.5 sm:px-8 sm:py-4 bg-[#141829]/90 hover:bg-slate-800 text-slate-100 hover:text-white font-gta text-base sm:text-lg tracking-wider rounded-sm border border-slate-700 hover:border-red-500/60 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>SKILLS ENVIRONMENT</span>
          </button>

          <button
            onClick={() => handleAction('missions')}
            className="px-6 py-3.5 sm:px-8 sm:py-4 bg-black/70 hover:bg-black/90 text-red-300 hover:text-red-200 font-gta text-base sm:text-lg tracking-wider rounded-sm border border-red-500/30 hover:border-red-500/60 transition-all cursor-pointer flex items-center gap-2"
          >
            <Crosshair className="w-4 h-4 text-red-400" />
            <span>VIEW MISSIONS</span>
          </button>
        </div>

        {/* Tactical Status Cards */}
        <div className="mt-10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-left px-4">
          <div className="p-3.5 bg-black/80 backdrop-blur-sm border border-slate-800 rounded-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ACADEMIC STATUS</span>
            </div>
            <div className="font-bebas text-lg text-white">CIT CSE STUDENT</div>
            <div className="text-xs text-slate-400">Gubbi, Karnataka, India</div>
          </div>

          <div className="p-3.5 bg-black/80 backdrop-blur-sm border border-slate-800 rounded-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-red-400" />
              <span>CORE TECHNICAL SKILLS</span>
            </div>
            <div className="font-bebas text-lg text-red-300">6 VERIFIED DOMAINS</div>
            <div className="text-xs text-slate-400">C, Python, DBMS, Linux, Cloud, Vibe</div>
          </div>

          <div className="p-3.5 bg-black/80 backdrop-blur-sm border border-slate-800 rounded-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI CONVERSATION</span>
            </div>
            <div className="font-bebas text-lg text-cyan-300">OPEN-ENDED MODEL</div>
            <div className="text-xs text-slate-400">Vercel Function + Local Fallback</div>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => handleAction('education')}
          className="mt-8 text-slate-400 hover:text-red-400 transition-colors flex flex-col items-center gap-1 cursor-pointer"
          aria-label="Scroll down to education section"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">SCROLL DOWN</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-red-500" />
        </button>
      </div>
    </section>
  )
}
