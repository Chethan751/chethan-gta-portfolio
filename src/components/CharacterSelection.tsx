import React, { useState } from 'react'
import type { Character } from '../types'
import { soundManager } from '../utils/audio'
import { UserCheck, Sparkles, CheckCircle2, Shield, Eye } from 'lucide-react'

interface CharacterSelectionProps {
  characters: Character[]
  selectedCharacter: Character
  onSelectCharacter: (char: Character) => void
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  characters,
  selectedCharacter,
  onSelectCharacter,
}) => {
  const [showOriginalReference, setShowOriginalReference] = useState(false)

  const handleSelect = (char: Character) => {
    if (char.id !== selectedCharacter.id) {
      soundManager.playSwitch()
      onSelectCharacter(char)
    }
  }

  return (
    <section
      id="character"
      aria-labelledby="character-selection-heading"
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-gta text-xs tracking-widest uppercase mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>GTA V THEMED CHARACTER SELECTOR // SINGLE VERIFIED IDENTITY</span>
          </div>
          <h2
            id="character-selection-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            CHARACTER SELECTION
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Choose a presentation theme for <strong className="text-amber-400 font-semibold">Chethan S</strong>. All three slots represent the same developer, highlighting complementary technical focuses.
          </p>
        </div>

        {/* Toggle to view verified reference photo */}
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick()
              setShowOriginalReference(!showOriginalReference)
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border transition-all cursor-pointer ${
              showOriginalReference
                ? 'bg-amber-500 text-black border-amber-400 font-bold'
                : 'bg-[#151926] text-slate-300 border-slate-700 hover:border-amber-500/50'
            }`}
            aria-pressed={showOriginalReference}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showOriginalReference ? 'SHOW GTA ARTWORK' : 'SHOW VERIFIED REFERENCE PHOTO'}</span>
          </button>
        </div>
      </div>

      {/* 3 Character Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {characters.map((char, index) => {
          const isSelected = char.id === selectedCharacter.id
          const imageSrc = showOriginalReference ? char.referenceOriginalImage : char.portraitImage

          return (
            <div
              key={char.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`Select presentation theme: ${char.roleTitle}`}
              onClick={() => handleSelect(char)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSelect(char)
                }
              }}
              className={`group relative rounded-lg overflow-hidden transition-all duration-300 text-left cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400 flex flex-col ${
                isSelected
                  ? 'bg-[#171b2b] border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.35)] -translate-y-2'
                  : 'bg-[#121522] border border-slate-800 hover:border-slate-600 hover:-translate-y-1'
              }`}
            >
              {/* GTA Slot Header Badge */}
              <div className="p-3 bg-[#0c0e17] border-b border-slate-800 flex items-center justify-between">
                <span className="font-gta text-xs tracking-widest text-slate-400 font-bold">
                  SLOT 0{index + 1} // CHETHAN S
                </span>
                {isSelected ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-gta font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                    <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    ACTIVE WHEEL
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-slate-300">
                    CLICK TO SWITCH
                  </span>
                )}
              </div>

              {/* Portrait Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                <img
                  src={imageSrc}
                  alt={`Chethan S - ${char.roleTitle}`}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isSelected ? 'scale-105 filter brightness-105' : 'group-hover:scale-102 filter grayscale-[15%]'
                  }`}
                  loading="lazy"
                />

                {/* Ambient lighting tint */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-t from-[#171b2b] via-transparent to-transparent opacity-90'
                      : 'bg-gradient-to-t from-[#121522] via-black/20 to-transparent opacity-80'
                  }`}
                />

                {/* Identity watermark badge */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm border border-slate-700 px-2.5 py-1 rounded text-[11px] font-mono text-slate-200 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>IDENTITY: CHETHAN S</span>
                </div>

                {/* Active check ring indicator */}
                {isSelected && (
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold shadow-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Character Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
                      Presentation Theme
                    </span>
                  </div>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide leading-tight group-hover:text-amber-300 transition-colors">
                    {char.roleTitle}
                  </h3>
                  <p className="font-gta text-xs text-amber-500/90 tracking-wider mb-3">
                    {char.themeTagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 mb-4">
                    {char.description}
                  </p>
                </div>

                {/* Focus Area Tags */}
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                    Targeted Tools
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {char.focusAreas.map((area) => (
                      <span
                        key={area}
                        className={`text-xs px-2 py-0.5 rounded font-tech font-semibold tracking-wide border ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                            : 'bg-black/40 border-slate-800 text-slate-300'
                        }`}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Honest Note */}
      <div className="mt-8 p-4 bg-[#11131e] border border-slate-800/80 rounded-lg text-xs text-slate-400 flex items-start gap-3">
        <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Portrayal Note:</strong> Each slot illustrates Chethan S with his verified facial identity in alternate GTA V cinematic art styles. These depict distinct areas of computer science focus rather than separate employment positions or unverified claims.
        </p>
      </div>
    </section>
  )
}
