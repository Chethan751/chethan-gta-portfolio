import React from 'react'
import type { SocialLinks } from '../types'
import { soundManager } from '../utils/audio'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons'
import {
  Mail,
  FileText,
  MapPin,
  ShieldCheck,
  ChevronUp,
  FastForward,
  Compass,
} from 'lucide-react'

interface ClosingSectionProps {
  displayName: string
  contactLinks: SocialLinks
  location: string
  onReplayIntro: () => void
  onScrollTop: () => void
}

const CURRENT_YEAR = new Date().getFullYear()

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  displayName,
  contactLinks,
  location,
  onReplayIntro,
  onScrollTop,
}) => {
  return (
    <section
      id="contact"
      aria-labelledby="closing-heading"
      className="relative min-h-[90vh] py-24 px-4 sm:px-6 flex flex-col justify-between overflow-hidden bg-black select-none"
    >
      {/* Background Skyline with Dramatic Red Lighting and Sports-Car Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/env_linux_night.jpg"
          alt=""
          className="w-full h-full object-cover filter brightness-35 contrast-125"
        />
        {/* Dramatic Red Horizon Light Bar (Sports Car Taillight Vibe) */}
        <div className="absolute inset-x-0 bottom-1/3 h-28 bg-red-600/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0b10] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/90 to-transparent" />
        <div className="absolute inset-0 bg-radial from-red-950/25 via-transparent to-black" />
        <div className="absolute inset-0 scanlines opacity-20" />
      </div>

      {/* Main Closing Showcase */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center my-auto">
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/40 rounded text-red-400 font-gta text-xs tracking-widest uppercase mb-4 shadow">
          <Compass className="w-3.5 h-3.5 text-red-400" />
          <span>SCENE 07 // FINAL TRANSMISSION & VISION</span>
        </div>

        {/* Character Visual Framed in Sports-Car Cockpit / Red Skyline Horizon */}
        <div className="relative w-48 sm:w-60 h-56 sm:h-72 mb-6 flex items-end justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-red-600/30 to-transparent blur-xl" />
          <img
            src="/assets/chethan_suit.jpg"
            alt="Chethan S - Closing Scene Visual"
            className="relative z-10 h-full w-auto object-contain rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-2 border-red-500/50 filter brightness-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Closing Title Display: "CHETHAN S" */}
        <h2
          id="closing-heading"
          className="font-bebas text-6xl sm:text-8xl md:text-9xl text-white tracking-wider leading-none drop-shadow-[0_15px_30px_rgba(220,38,38,0.5)]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-red-100 to-red-500">
            {displayName}
          </span>
        </h2>

        {/* Closing Tagline Display: "Building Ideas. Exploring AI. Creating the Future." */}
        <p className="mt-4 font-gta text-lg sm:text-2xl md:text-3xl text-red-400 font-bold tracking-[0.2em] max-w-3xl drop-shadow-md">
          &ldquo;Building Ideas. Exploring AI. Creating the Future.&rdquo;
        </p>

        {/* Academic Profile & Location Confirmation */}
        <p className="mt-3 text-xs sm:text-sm text-slate-300 font-mono flex items-center justify-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-red-500" />
          <span>B.E. Computer Science & Engineering • CIT Gubbi, Karnataka • {location}</span>
        </p>

        {/* Verified Channels & Social Links */}
        <div className="mt-8 max-w-xl w-full p-5 bg-[#0a0c16]/90 border border-red-500/30 rounded-xl shadow-2xl backdrop-blur-md">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>OFFICIAL TRANSMISSION CHANNELS</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {contactLinks.email ? (
              <a
                href={`mailto:${contactLinks.email}`}
                className="flex items-center gap-2 px-3.5 py-2 bg-[#121524] hover:bg-red-600 text-slate-200 hover:text-white border border-slate-700 hover:border-red-400 rounded-lg text-xs font-mono transition-all"
              >
                <Mail className="w-4 h-4 text-red-400" />
                <span>{contactLinks.email}</span>
              </a>
            ) : (
              <div className="px-3 py-1.5 bg-black/60 border border-slate-800 rounded text-slate-400 text-xs font-mono">
                Email: Configuration Placeholder
              </div>
            )}

            {contactLinks.github ? (
              <a
                href={contactLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 bg-[#121524] hover:bg-red-600 text-slate-200 hover:text-white border border-slate-700 hover:border-red-400 rounded-lg text-xs font-mono transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            ) : (
              <a
                href="https://github.com/Chethan751/chethan-gta-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 bg-[#121524] hover:bg-red-600 text-slate-200 hover:text-white border border-slate-700 hover:border-red-400 rounded-lg text-xs font-mono transition-all"
              >
                <GithubIcon className="w-4 h-4 text-red-400" />
                <span>Portfolio Repo</span>
              </a>
            )}

            {contactLinks.linkedin && (
              <a
                href={contactLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 bg-[#121524] hover:bg-red-600 text-slate-200 hover:text-white border border-slate-700 hover:border-red-400 rounded-lg text-xs font-mono transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-red-400" />
                <span>LinkedIn</span>
              </a>
            )}

            {contactLinks.resumeUrl && (
              <a
                href={contactLinks.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 bg-[#121524] hover:bg-red-600 text-slate-200 hover:text-white border border-slate-700 hover:border-red-400 rounded-lg text-xs font-mono transition-all"
              >
                <FileText className="w-4 h-4 text-red-400" />
                <span>Resume</span>
              </a>
            )}

            {contactLinks.twitter && (
              <a
                href={contactLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 bg-[#121524] hover:bg-red-600 text-slate-200 hover:text-white border border-slate-700 hover:border-red-400 rounded-lg text-xs font-mono transition-all"
              >
                <TwitterIcon className="w-4 h-4 text-red-400" />
                <span>X / Twitter</span>
              </a>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              soundManager.playMissionSelect()
              onReplayIntro()
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#121524] hover:bg-red-600/30 border border-slate-700 hover:border-red-500/50 text-red-300 rounded text-xs font-gta tracking-wider transition-colors cursor-pointer"
          >
            <FastForward className="w-4 h-4 text-red-400" />
            <span>REPLAY CINEMATIC INTRO</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick()
              onScrollTop()
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#121524] hover:bg-slate-800 border border-slate-700 text-slate-200 rounded text-xs font-gta tracking-wider transition-colors cursor-pointer"
          >
            <ChevronUp className="w-4 h-4" />
            <span>RETURN TO TOP</span>
          </button>
        </div>
      </div>

      {/* Legal & Authorship Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full pt-8 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-3 text-center sm:text-left">
        <div>
          &copy; {CURRENT_YEAR} {displayName}. All verified portfolio rights reserved.
        </div>
        <div className="text-slate-400">
          Original aesthetic experience inspired by GTA V Los Santos • No proprietary game/car assets used.
        </div>
      </footer>
    </section>
  )
}
