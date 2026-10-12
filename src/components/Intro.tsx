import React, { useState, useEffect } from 'react'
import { soundManager } from '../utils/audio'
import { Play, FastForward, Shield, Compass } from 'lucide-react'

interface IntroProps {
  onEnter: () => void
  displayName?: string
  subtitle?: string
}

export const Intro: React.FC<IntroProps> = ({
  onEnter,
  displayName = 'CHETHAN S',
  subtitle = 'WELCOME TO MY WORLD',
}) => {
  const [phase, setPhase] = useState<'black' | 'character' | 'reveal' | 'ready'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'ready'
    }
    return 'black'
  })

  useEffect(() => {
    if (phase === 'ready') return

    const t1 = setTimeout(() => setPhase('character'), 400)
    const t2 = setTimeout(() => setPhase('reveal'), 1100)
    const t3 = setTimeout(() => setPhase('ready'), 2000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
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
      {/* Ambient Dark Red Fog and Radial Vignette */}
      <div className="absolute inset-0 bg-radial from-red-950/20 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      {/* Top HUD Controls */}
      <header className="absolute top-0 inset-x-0 p-4 md:p-6 flex items-center justify-between text-xs font-mono tracking-widest text-slate-400 z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 font-gta tracking-widest text-sm">CHETHAN S // LOS SANTOS CINEMATIC</span>
        </div>
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 hover:bg-red-950/40 border border-red-500/40 text-red-300 rounded font-gta text-xs md:text-sm tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Skip cinematic introduction"
        >
          <FastForward className="w-4 h-4" />
          <span>SKIP INTRO</span>
        </button>
      </header>

      {/* Center Cinematic Stage: Reference Screenshot Composition */}
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center justify-center min-h-[600px]">
        {/* Secondary Title: ••• WELCOME TO MY WORLD ••• */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            phase === 'reveal' || phase === 'ready'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-6'
          }`}
        >
          <div className="flex items-center gap-3 text-white font-gta font-bold text-sm sm:text-lg md:text-xl tracking-[0.35em] text-center mb-2 drop-shadow-md">
            <span className="text-red-500 tracking-normal">• • •</span>
            <span>{subtitle}</span>
            <span className="text-red-500 tracking-normal">• • •</span>
          </div>
        </div>

        {/* Master Stage Box with Huge Red Typography Behind Character */}
        <div className="relative w-full flex items-center justify-center my-2 sm:my-4">
          {/* Top-Right Badge: • LEGEND • (Reference Match) */}
          <div
            className={`absolute -top-3 right-4 sm:right-12 z-20 transition-all duration-700 delay-200 ${
              phase === 'reveal' || phase === 'ready' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="px-3 py-0.5 bg-white text-black font-gta font-black text-xs md:text-sm tracking-widest rounded-sm shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>LEGEND</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
          </div>

          {/* Bottom-Left Badge: • CIT CSE • */}
          <div
            className={`absolute -bottom-2 left-4 sm:left-12 z-20 transition-all duration-700 delay-200 ${
              phase === 'reveal' || phase === 'ready' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="px-3 py-0.5 bg-white text-black font-gta font-black text-xs md:text-sm tracking-widest rounded-sm shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>CIT CSE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
          </div>

          {/* Bottom-Right Dot Matrix: 4x3 dots (Reference Match) */}
          <div
            className={`absolute -bottom-2 right-4 sm:right-12 z-20 hidden sm:grid grid-cols-4 gap-1.5 transition-all duration-700 delay-300 ${
              phase === 'reveal' || phase === 'ready' ? 'opacity-80' : 'opacity-0'
            }`}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
            ))}
          </div>

          {/* Giant Bold Red Condensed Typography: "CHETHAN S" */}
          <div
            aria-hidden="true"
            className={`w-full text-center transition-all duration-1000 ease-out select-none pointer-events-none transform ${
              phase === 'reveal' || phase === 'ready'
                ? 'opacity-100 scale-100 filter drop-shadow-[0_0_40px_rgba(220,38,38,0.45)]'
                : 'opacity-0 scale-95'
            }`}
          >
            <span className="font-bebas text-7xl sm:text-9xl md:text-[13rem] lg:text-[16rem] font-black tracking-normal leading-none text-red-600 block">
              {displayName}
            </span>
          </div>

          {/* Center Approved Character Visual Foreground */}
          <div
            className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-1000 ease-out transform ${
              phase === 'character' || phase === 'reveal' || phase === 'ready'
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-90'
            }`}
          >
            <div className="relative h-64 sm:h-80 md:h-96 w-auto flex items-end justify-center">
              <img
                src="/assets/chethan_suit.jpg"
                alt="Chethan S - Approved Character Visual"
                className="h-full w-auto object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] border border-red-500/30 filter brightness-105"
              />
              {/* Bottom gradient fade for seamless integration */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Verification Pill */}
        <div
          className={`flex items-center gap-2 px-3 py-1 bg-black/80 border border-slate-800 text-slate-300 rounded font-mono text-xs tracking-wider transition-all duration-700 ${
            phase === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-red-400" />
          <span>B.E. Computer Science & Engineering • CIT Gubbi, Karnataka</span>
        </div>

        {/* CTA Enter Button */}
        <div
          className={`mt-6 flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 ease-out transform ${
            phase === 'ready' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={handleEnter}
            autoFocus
            className="group px-9 py-3.5 sm:px-11 sm:py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-gta text-xl md:text-2xl font-black tracking-widest rounded-sm shadow-[0_0_35px_rgba(220,38,38,0.6)] transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span>ENTER WORLD</span>
          </button>

          <button
            onClick={handleSkip}
            className="px-6 py-3.5 bg-black/70 hover:bg-white/10 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-gta text-base md:text-lg tracking-wider rounded-sm transition-colors cursor-pointer"
          >
            EXPLORE DIRECTLY
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="absolute bottom-4 inset-x-0 px-6 flex items-center justify-between text-[11px] font-mono text-slate-500 hidden sm:flex z-20">
        <div>CHETHAN S // VERIFIED DEVELOPER PROFILE</div>
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-red-500" />
          <span>ORIGINAL GTA V CINEMATIC EXPERIENCE</span>
        </div>
      </footer>
    </div>
  )
}
