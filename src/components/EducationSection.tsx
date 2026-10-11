import React from 'react'
import type { EducationInfo } from '../types'
import { GraduationCap, MapPin, BookOpen, ShieldCheck } from 'lucide-react'

interface EducationSectionProps {
  education: EducationInfo
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-gta text-xs tracking-widest uppercase mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION // UNDERGRADUATE DEGREE</span>
          </div>
          <h2
            id="education-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            ACADEMIC BACKGROUND
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Verified formal computer science curriculum and foundational technical studies.
          </p>
        </div>
      </div>

      {/* Main Education Card */}
      <div className="bg-[#111422] border-2 border-amber-500/30 rounded-xl overflow-hidden shadow-2xl gta-panel-border">
        {/* Top GTA Header Banner */}
        <div className="p-4 sm:p-5 bg-[#0a0c16] border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bebas text-xl sm:text-2xl text-white tracking-wider block">
                {education.degree}
              </span>
              <span className="font-gta text-xs text-amber-400 tracking-wider">
                {education.field}
              </span>
            </div>
          </div>

          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs rounded font-bold">
            STATUS: ENROLLED / IN PROGRESS
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div>
              <h3 className="font-bebas text-2xl sm:text-4xl text-amber-300 tracking-wide">
                {education.institution}
              </h3>
              <p className="flex items-center gap-2 text-sm text-slate-300 font-mono mt-1">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{education.location}</span>
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-[#151929] p-4 rounded-lg border border-slate-800">
              Pursuing rigorous foundational coursework covering core computing concepts: procedural and object-oriented programming, data structures, algorithm analysis, relational database design, operating systems, and computer networks.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-black/50 border border-slate-700 rounded text-slate-300 font-tech text-xs">
                Computer Science & Engineering
              </span>
              <span className="px-3 py-1 bg-black/50 border border-slate-700 rounded text-slate-300 font-tech text-xs">
                Systems Programming
              </span>
              <span className="px-3 py-1 bg-black/50 border border-slate-700 rounded text-slate-300 font-tech text-xs">
                Algorithm Fundamentals
              </span>
              <span className="px-3 py-1 bg-black/50 border border-slate-700 rounded text-slate-300 font-tech text-xs">
                DBMS Architecture
              </span>
            </div>
          </div>

          {/* Right: Academic Stat Summary */}
          <div className="md:col-span-4 bg-[#0c0e17] p-5 rounded-lg border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>ACADEMIC DOSSIER</span>
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-400">INSTITUTION:</span>
              <span className="text-slate-100 font-semibold">{education.institutionShort}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">DISCIPLINE:</span>
              <span className="text-slate-100 font-semibold">CSE</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">CAMPUS LOCATION:</span>
              <span className="text-slate-100 font-semibold">Gubbi, Karnataka</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">COUNTRY:</span>
              <span className="text-slate-100 font-semibold">India</span>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{education.honestyNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
