import React from 'react'
import type { AchievementItem } from '../types'
import { Award, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react'

interface AchievementsSectionProps {
  achievements: AchievementItem[]
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  const hasAchievements = achievements.length > 0

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-gta text-xs tracking-widest uppercase mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>HONORS & REWARD SYSTEM // VERIFIED RECORD</span>
          </div>
          <h2
            id="achievements-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            ACHIEVEMENTS & AWARDS
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Tracking verified technical milestones, competitive rankings, and official certificates.
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-xs font-mono text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>ZERO INVENTED CREDENTIALS POLICY</span>
        </div>
      </div>

      {hasAchievements ? (
        /* Rendered when achievements are added in src/data/achievements.ts */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-[#121524] border border-amber-500/30 rounded-xl p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bebas text-xl text-amber-300">{item.title}</span>
                {item.date && (
                  <span className="text-[10px] font-mono text-slate-400">{item.date}</span>
                )}
              </div>
              <p className="text-sm text-slate-300 mb-3">{item.description}</p>
              {item.issuingOrganization && (
                <div className="text-xs font-mono text-amber-400">
                  ISSUER: {item.issuingOrganization}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Tasteful GTA Empty State */
        <div className="bg-[#111422] border-2 border-slate-800 rounded-xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#161a2b] border-2 border-slate-700 flex items-center justify-center text-slate-400 shadow-inner">
            <Lock className="w-10 h-10 text-amber-500/70" />
          </div>

          <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-gta text-xs tracking-widest rounded uppercase mb-3">
            MISSION PROGRESSION IN PROGRESS
          </span>

          <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider mb-3">
            NO VERIFIED AWARDS UNLOCKED YET
          </h3>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            In strict adherence to portfolio honesty and integrity standards, no unverified certifications, rankings, or contest placements are fabricated.
          </p>

          <div className="p-4 bg-[#0c0e17] rounded-lg border border-slate-800 text-xs font-mono text-slate-400 max-w-lg mx-auto text-left space-y-1.5">
            <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Ready for verified additions:</span>
            </div>
            <p>1. Open <code className="text-amber-300 font-bold">src/data/achievements.ts</code></p>
            <p>2. Add certified hackathons, workshop completions, or academic distinctions</p>
            <p>3. Achievements will dynamically display with full GTA mission style</p>
          </div>
        </div>
      )}
    </section>
  )
}
