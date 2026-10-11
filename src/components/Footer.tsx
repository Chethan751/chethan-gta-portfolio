import React from 'react'
import { soundManager } from '../utils/audio'
import { FastForward, Shield, Crosshair, ChevronUp } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

interface FooterProps {
  onReplayIntro: () => void
  onScrollTop: () => void
  displayName: string
}


export const Footer: React.FC<FooterProps> = ({
  onReplayIntro,
  onScrollTop,
  displayName,
}) => {
  return (
    <footer className="relative bg-[#07080d] border-t-2 border-amber-500/20 text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand identity */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Crosshair className="w-4 h-4 text-amber-400" />
            <span className="font-bebas text-2xl text-white tracking-wider">
              {displayName}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              DEVELOPER PORTFOLIO
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400">
            B.E. Computer Science & Engineering • Channabasaveshwara Institute of Technology (CIT), Gubbi, Karnataka
          </p>
        </div>

        {/* Center / Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              soundManager.playMissionSelect()
              onReplayIntro()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141724] hover:bg-amber-500/20 border border-slate-700 hover:border-amber-500/40 text-amber-300 rounded text-xs font-gta tracking-wider transition-colors cursor-pointer"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>REPLAY CINEMATIC INTRO</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick()
              onScrollTop()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141724] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-xs font-gta tracking-wider transition-colors cursor-pointer"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span>RETURN TO TOP</span>
          </button>
        </div>
      </div>

      {/* Attribution & Legal Notice */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            Original creative interface inspired by GTA V / Los Santos aesthetics. No proprietary Rockstar game assets or trademarks are used.
          </span>
        </div>
        <div>
          &copy; {CURRENT_YEAR} {displayName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
