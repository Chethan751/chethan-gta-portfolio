import React, { useState, useEffect } from 'react'
import { soundManager } from '../utils/audio'
import type { Character } from '../types'

import {
  Volume2,
  VolumeX,
  Menu,
  X,
  Sliders,
  Crosshair,
} from 'lucide-react'

interface NavbarProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
  currentCharacter: Character
  soundEnabled: boolean
  onToggleSound: () => void
  onOpenConfigEditor: () => void
}

const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'character', label: 'CHARACTER' },
  { id: 'about', label: 'ABOUT ME' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'missions', label: 'MISSIONS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'achievements', label: 'ACHIEVEMENTS' },
  { id: 'contact', label: 'CONTACT' },
]

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  currentCharacter,
  soundEnabled,
  onToggleSound,
  onOpenConfigEditor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    soundManager.playClick()
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  return (
    <nav
      aria-label="Main Navigation HUD"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0b10]/95 backdrop-blur-md border-b border-amber-500/20 py-2.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#0a0b10]/90 to-transparent py-3 md:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Minimap Icon */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1"
          aria-label="Return to portfolio home"
        >
          <div className="relative w-9 h-9 rounded bg-[#161926] border border-amber-500/50 flex items-center justify-center group-hover:border-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Crosshair className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bebas text-2xl text-white tracking-wider group-hover:text-amber-400 transition-colors leading-none">
                CHETHAN S
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                LOS SANTOS
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:block">
              CIT CSE // GUBBI
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-black/40 backdrop-blur-sm border border-slate-800/80 rounded-full px-3 py-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 font-gta text-sm tracking-wider rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                  isActive
                    ? 'bg-amber-500 text-black font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Utility Controls (Sound, Quick Character Indicator, Config Previewer) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Character Quick Chip */}
          <button
            onClick={() => handleNavClick('character')}
            title={`Active Character Theme: ${currentCharacter.roleTitle}`}
            className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-[#151926] border border-slate-700/80 hover:border-amber-500/50 text-slate-200 transition-colors cursor-pointer text-xs font-mono"
          >
            <img
              src={currentCharacter.portraitImage}
              alt=""
              className="w-5 h-5 rounded-full object-cover border border-amber-400"
            />
            <span className="hidden xl:inline text-amber-300 font-gta tracking-wider text-sm">
              {currentCharacter.roleTitle.toUpperCase()}
            </span>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Disable UI Audio' : 'Enable UI Audio (Opt-in)'}
            className={`p-2 rounded border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              soundEnabled
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
            aria-label={soundEnabled ? 'Mute game sound effects' : 'Unmute game sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Config Editor Button */}
          <button
            onClick={() => {
              soundManager.playClick()
              onOpenConfigEditor()
            }}
            title="Open Live Portfolio Config Editor"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/50 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-amber-400 rounded text-xs font-gta tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Open Configuration Editor"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">CONFIG</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              soundManager.playClick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="lg:hidden p-2 bg-black/60 border border-slate-800 text-slate-200 hover:text-amber-400 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0d15]/98 border-b border-amber-500/30 px-6 py-6 transition-all duration-300">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-3 text-left font-gta text-base tracking-wider rounded border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 border-amber-400 text-black font-black'
                      : 'bg-[#141724] border-slate-800 text-slate-200 hover:border-amber-500/40'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>CHETHAN S // CIT CSE</span>
            <span className="text-amber-400 font-bold">{currentCharacter.roleTitle}</span>
          </div>
        </div>
      )}
    </nav>
  )
}
