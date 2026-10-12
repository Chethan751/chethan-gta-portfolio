import React from 'react'
import type { EducationInfo } from '../types'
import { GraduationCap, MapPin, BookOpen, ShieldCheck, Award } from 'lucide-react'

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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-gta text-xs tracking-widest uppercase mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-red-400" />
            <span>SCENE 02 // ACADEMIC PROFILE & FOUNDATION</span>
          </div>
          <h2
            id="education-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            FORMAL EDUCATION
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Verified undergraduate curriculum and foundational computer science studies in Karnataka, India.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-slate-800 rounded text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>VERIFIED ACADEMIC CREDENTIALS</span>
        </div>
      </div>

      {/* Main Education Showcase Card */}
      <div className="bg-[#0e101b] border-2 border-red-500/30 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] gta-panel-border">
        {/* Top GTA Header Banner */}
        <div className="p-4 sm:p-5 bg-[#080911] border-b border-red-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bebas text-2xl sm:text-3xl text-white tracking-wider block">
                {education.degree}
              </span>
              <span className="font-gta text-xs sm:text-sm text-red-400 tracking-wider font-bold">
                BRANCH: {education.field}
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
              <h3 className="font-bebas text-2xl sm:text-4xl text-white tracking-wide">
                {education.institution}
              </h3>
              <p className="flex items-center gap-2 text-sm text-red-300 font-mono mt-1">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{education.location}</span>
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-[#131726] p-4 rounded-lg border border-slate-800">
              Pursuing rigorous computer science fundamentals covering structured procedural programming, object-oriented concepts, relational databases, data structures & algorithms, operating systems, and computer networks.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-black/60 border border-red-500/20 rounded text-slate-200 font-mono text-xs">
                Computer Science & Engineering
              </span>
              <span className="px-3 py-1 bg-black/60 border border-slate-700 rounded text-slate-200 font-mono text-xs">
                Procedural C & OOP Python
              </span>
              <span className="px-3 py-1 bg-black/60 border border-slate-700 rounded text-slate-200 font-mono text-xs">
                Data Structures & Algorithms
              </span>
              <span className="px-3 py-1 bg-black/60 border border-slate-700 rounded text-slate-200 font-mono text-xs">
                Relational DBMS & SQL
              </span>
              <span className="px-3 py-1 bg-black/60 border border-slate-700 rounded text-slate-200 font-mono text-xs">
                Linux Systems & Cloud
              </span>
            </div>
          </div>

          {/* Right: Academic Stat Summary */}
          <div className="md:col-span-4 bg-[#080911] p-5 rounded-lg border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>ACADEMIC DOSSIER</span>
              <BookOpen className="w-3.5 h-3.5 text-red-400" />
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
              <span className="text-slate-400">LOCATION:</span>
              <span className="text-slate-100 font-semibold">Gubbi, Karnataka</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">AFFILIATION:</span>
              <span className="text-slate-100 font-semibold">B.E. Undergraduate</span>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-start gap-1.5">
              <Award className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span>{education.honestyNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
