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
  MessageSquare,
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
  { id: 'education', label: 'EDUCATION' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'missions', label: 'PROJECTS' },
  { id: 'about', label: 'AI TALK' },
  { id: 'contact', label: 'CLOSING' },
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
          ? 'bg-black/95 backdrop-blur-md border-b border-red-500/20 py-2.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/95 to-transparent py-3 md:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Minimap Icon (Reference Style) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1"
          aria-label="Return to portfolio home"
        >
          <div className="relative w-9 h-9 rounded bg-[#161926] border border-red-500/50 flex items-center justify-center group-hover:border-red-400 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            <Crosshair className="w-5 h-5 text-red-500 group-hover:rotate-45 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bebas text-2xl text-white tracking-wider group-hover:text-red-400 transition-colors leading-none">
                CHETHAN S
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30 uppercase">
                LOS SANTOS
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:block">
              CIT CSE // GUBBI, KARNATAKA
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links (Pill Bar matching reference) */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-black/70 backdrop-blur-md border border-slate-800 rounded-full px-3 py-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 font-gta text-xs xl:text-sm tracking-wider rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-400 ${
                  isActive
                    ? 'bg-red-600 text-white font-black shadow-[0_0_15px_rgba(220,38,38,0.6)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Utility Controls (Talk CTA, Sound, Config) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Talk Button */}
          <button
            onClick={() => handleNavClick('about')}
            title="Chat with Chethan S AI"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/50 transition-all cursor-pointer text-xs font-gta font-bold tracking-wider"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI TALK</span>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Disable UI Audio' : 'Enable UI Audio (Opt-in)'}
            className={`p-2 rounded-lg border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 ${
              soundEnabled
                ? 'bg-red-600/20 border-red-500 text-red-300'
                : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
            aria-label={soundEnabled ? 'Mute game sound effects' : 'Unmute game sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Config Editor Button */}
          <button
            onClick={() => {
              soundManager.playClick()
              onOpenConfigEditor()
            }}
            title="Open Live Portfolio Config Editor"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/50 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/40 text-red-400 rounded text-xs font-gta tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Open Configuration Editor"
          >
            <Sliders className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">CONFIG</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              soundManager.playClick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="lg:hidden p-2 bg-black/60 border border-slate-800 text-slate-200 hover:text-red-400 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/98 border-b border-red-500/30 px-6 py-6 transition-all duration-300">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-3 text-left font-gta text-base tracking-wider rounded border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-red-600 border-red-400 text-white font-black'
                      : 'bg-[#121524] border-slate-800 text-slate-200 hover:border-red-500/40'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>CHETHAN S // CIT CSE</span>
            <span className="text-red-400 font-bold">{currentCharacter.roleTitle}</span>
          </div>
        </div>
      )}
    </nav>
  )
}
