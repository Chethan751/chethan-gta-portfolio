import React, { useState, useEffect } from 'react'
import { soundManager } from '../utils/audio'
import { Play, FastForward, Compass, ShieldAlert } from 'lucide-react'

interface IntroProps {
  onEnter: () => void
  displayName?: string
  subtitle?: string
  tagline?: string
}

export const Intro: React.FC<IntroProps> = ({
  onEnter,
  displayName = 'CHETHAN S',
  subtitle = 'DEVELOPER PROFILE',
  tagline = 'YOUR NEXT MISSION STARTS HERE',
}) => {
  const [phase, setPhase] = useState<'black' | 'skyline' | 'titles' | 'ready'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'ready'
    }
    return 'black'
  })
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (phase === 'ready') return

    // Sequence progression
    const timer1 = setTimeout(() => setPhase('skyline'), 350)
    const timer2 = setTimeout(() => setPhase('titles'), 1200)
    const timer3 = setTimeout(() => setPhase('ready'), 2200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [phase])


  const handleEnter = () => {
    soundManager.playMissionSelect()
    onEnter()
  }

  const handleSkip = () => {
    soundManager.playClick()
    onEnter()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic Portfolio Intro"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none"
    >
      {/* Background Skyline Image with slow camera zoom */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
          phase === 'black' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {!imgError ? (
          <img
            src="/assets/env_intro_skyline.jpg"
            alt="Los Santos Golden Hour Skyline"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transform transition-transform duration-[8000ms] ease-out ${
              phase === 'black' ? 'scale-100' : 'scale-110'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-950 via-slate-900 to-black flex items-center justify-center">
            <div className="text-center text-amber-500/60 p-4">
              <ShieldAlert className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-mono">SCENE BACKDROP PREVIEW MODE</p>
            </div>
          </div>
        )}

        {/* Cinematic Golden Hour Overlay & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-black/40 to-transparent" />
        <div className="absolute inset-0 vignette-radial" />
        <div className="absolute inset-0 scanlines opacity-30" />
      </div>

      {/* Atmospheric Horizon Light Glow */}
      <div
        className={`absolute inset-x-0 bottom-1/3 h-40 bg-amber-500/15 blur-3xl transition-opacity duration-1000 pointer-events-none ${
          phase !== 'black' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top HUD Bar */}
      <header className="absolute top-0 inset-x-0 p-4 md:p-6 flex items-center justify-between text-xs font-mono tracking-widest text-amber-400/80 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LOS SANTOS // GRID SECTOR 08</span>
        </div>
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded font-gta text-sm tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Skip cinematic introduction"
        >
          <FastForward className="w-4 h-4" />
          <span>SKIP INTRO</span>
        </button>
      </header>

      {/* Center Cinematic Titles */}
      <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center">
        {/* Subtitle badge */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            phase === 'titles' || phase === 'ready'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-sm bg-black/70 border-l-4 border-amber-500 text-amber-400 font-gta text-sm md:text-base tracking-[0.25em]">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>{subtitle}</span>
          </div>
        </div>

        {/* Main Title: CHETHAN S */}
        <h1
          className={`font-bebas text-6xl sm:text-7xl md:text-9xl text-white tracking-wider leading-none transition-all duration-700 ease-out transform drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] ${
            phase === 'titles' || phase === 'ready'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95'
          }`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-amber-200">
            {displayName}
          </span>
        </h1>

        {/* Tagline: YOUR NEXT MISSION STARTS HERE */}
        <p
          className={`mt-4 font-gta text-lg sm:text-xl md:text-2xl text-amber-400/90 tracking-[0.2em] max-w-xl transition-all duration-700 delay-150 ease-out transform ${
            phase === 'titles' || phase === 'ready'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {tagline}
        </p>

        {/* Action Controls */}
        <div
          className={`mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-300 ease-out transform ${
            phase === 'ready' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={handleEnter}
            autoFocus
            className="group relative px-8 py-3.5 sm:px-10 sm:py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-gta text-xl md:text-2xl font-black tracking-widest rounded-sm shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-300 flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
            <span>ENTER WORLD</span>
          </button>

          <button
            onClick={handleSkip}
            className="px-6 py-3.5 bg-black/60 hover:bg-white/10 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-gta text-lg tracking-wider rounded-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            BYPASS SEQUENCE
          </button>
        </div>

        {/* Sub-notice */}
        <p
          className={`mt-6 text-xs text-slate-400/70 font-mono transition-opacity duration-700 ${
            phase === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          CIT CSE Student Portfolio • Gubbi, Karnataka • Press Enter or Click to Proceed
        </p>
      </div>

      {/* Bottom Corner HUD Accents */}
      <footer className="absolute bottom-4 left-6 text-[10px] font-mono text-slate-500 hidden sm:block">
        BUILD VER: 2026.10 // REACT + VITE + TAILWIND // VERIFIED PROFILE
      </footer>
      <div className="absolute bottom-4 right-6 text-[10px] font-mono text-slate-500 hidden sm:block">
        AUDIO: OPT-IN SAFE // REDUCED MOTION SUPPORTED
      </div>
    </div>
  )
}
