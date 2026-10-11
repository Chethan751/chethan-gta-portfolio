import React from 'react'
import type { SocialLinks } from '../types'
import { soundManager } from '../utils/audio'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons'
import {
  Mail,
  FileText,
  Radio,
  MapPin,
  ShieldAlert,
  Send,
  HelpCircle,
} from 'lucide-react'


interface ContactSectionProps {
  contactLinks: SocialLinks
  location: string
  displayName: string
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactLinks,
  location,
  displayName,
}) => {
  // Check if any link is configured
  const hasConfiguredLinks =
    Boolean(contactLinks.email) ||
    Boolean(contactLinks.github) ||
    Boolean(contactLinks.linkedin) ||
    Boolean(contactLinks.resumeUrl) ||
    Boolean(contactLinks.twitter)

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-gta text-xs tracking-widest uppercase mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>COMMUNICATION GRID // SECURE TRANSMISSIONS</span>
          </div>
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
          >
            CONTACT & CHANNELS
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
            Official communication channels for <strong className="text-amber-400 font-semibold">{displayName}</strong>.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-slate-400">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>LOCATION: {location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Links */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#111422] border-2 border-amber-500/30 rounded-xl p-6 sm:p-8 gta-panel-border">
            <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider mb-2">
              CONNECTED CHANNELS
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              In accordance with strict portfolio verification guidelines, only authentic, verified links are displayed. No fictitious handles or broken links are shown.
            </p>

            {hasConfiguredLinks ? (
              <div className="space-y-3">
                {contactLinks.email && (
                  <a
                    href={`mailto:${contactLinks.email}`}
                    onClick={() => soundManager.playClick()}
                    className="flex items-center justify-between p-3.5 bg-[#171b2b] hover:bg-amber-500 hover:text-black border border-amber-500/40 rounded-lg text-slate-200 transition-all font-mono text-sm group"
                  >
                    <span className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-amber-400 group-hover:text-black" />
                      <span>{contactLinks.email}</span>
                    </span>
                    <span className="text-xs font-gta font-bold tracking-wider">EMAIL DIRECT</span>
                  </a>
                )}

                {contactLinks.github && (
                  <a
                    href={contactLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="flex items-center justify-between p-3.5 bg-[#171b2b] hover:bg-amber-500 hover:text-black border border-slate-700 rounded-lg text-slate-200 transition-all font-mono text-sm group"
                  >
                    <span className="flex items-center gap-2.5">
                      <GithubIcon className="w-4 h-4 text-amber-400 group-hover:text-black" />
                      <span>GitHub Profile</span>
                    </span>
                    <span className="text-xs font-gta font-bold tracking-wider">VIEW REPOS</span>
                  </a>
                )}

                {contactLinks.linkedin && (
                  <a
                    href={contactLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="flex items-center justify-between p-3.5 bg-[#171b2b] hover:bg-amber-500 hover:text-black border border-slate-700 rounded-lg text-slate-200 transition-all font-mono text-sm group"
                  >
                    <span className="flex items-center gap-2.5">
                      <LinkedinIcon className="w-4 h-4 text-amber-400 group-hover:text-black" />
                      <span>LinkedIn Profile</span>
                    </span>
                    <span className="text-xs font-gta font-bold tracking-wider">CONNECT</span>
                  </a>
                )}

                {contactLinks.resumeUrl && (
                  <a
                    href={contactLinks.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="flex items-center justify-between p-3.5 bg-[#171b2b] hover:bg-amber-500 hover:text-black border border-slate-700 rounded-lg text-slate-200 transition-all font-mono text-sm group"
                  >
                    <span className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-amber-400 group-hover:text-black" />
                      <span>Curriculum Vitae / Resume</span>
                    </span>
                    <span className="text-xs font-gta font-bold tracking-wider">VIEW RESUME</span>
                  </a>
                )}

                {contactLinks.twitter && (
                  <a
                    href={contactLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="flex items-center justify-between p-3.5 bg-[#171b2b] hover:bg-amber-500 hover:text-black border border-slate-700 rounded-lg text-slate-200 transition-all font-mono text-sm group"
                  >
                    <span className="flex items-center gap-2.5">
                      <TwitterIcon className="w-4 h-4 text-amber-400 group-hover:text-black" />
                      <span>Twitter / X</span>
                    </span>
                    <span className="text-xs font-gta font-bold tracking-wider">FOLLOW</span>
                  </a>
                )}
              </div>
            ) : (
              <div className="bg-[#0c0e17] p-5 rounded-lg border border-slate-800 text-xs font-mono space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>TRANSMISSION LINKS PENDING CONFIGURATION</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Personal URLs (email, LinkedIn, GitHub, resume) are intentionally kept empty until Chethan S adds them to <code className="text-amber-300 font-bold">src/data/siteConfig.ts</code>.
                </p>
                <div className="p-3 bg-black/60 rounded border border-slate-800 text-[11px] text-slate-400">
                  <p className="text-amber-300 mb-1">// Quick Setup in src/data/siteConfig.ts:</p>
                  <p>contactLinks: &#123;</p>
                  <p className="pl-4">email: &quot;chethan@example.com&quot;,</p>
                  <p className="pl-4">github: &quot;https://github.com/your-username&quot;,</p>
                  <p className="pl-4">linkedin: &quot;https://linkedin.com/in/your-profile&quot;</p>
                  <p>&#125;</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Clearly Labeled Non-Submitting Contact Form Placeholder */}
        <div className="lg:col-span-6">
          <div className="bg-[#111422] border-2 border-slate-800 rounded-xl p-6 sm:p-8 gta-panel-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider">
                TRANSMISSION FORM
              </h3>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PLACEHOLDER DEMO
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-6 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                To prevent false success notices without an active server backend, this form is clearly documented as a template. To enable real submissions, connect an endpoint like Formspree, Basin, or Netlify Forms.
              </span>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                soundManager.playClick()
                alert(
                  'NOTICE: Contact form submission backend is currently unconfigured. Please configure an endpoint in src/data/siteConfig.ts or reach out via email once configured.'
                )
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  CALLSIGN // YOUR NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Agent Carter"
                  className="w-full px-3.5 py-2.5 bg-[#0a0c16] border border-slate-700 rounded font-sans text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  FREQUENCY // RETURN EMAIL
                </label>
                <input
                  type="email"
                  placeholder="e.g. contact@agency.org"
                  className="w-full px-3.5 py-2.5 bg-[#0a0c16] border border-slate-700 rounded font-sans text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  TRANSMISSION PAYLOAD // MESSAGE
                </label>
                <textarea
                  rows={4}
                  placeholder="Inquire regarding collaboration, software roles, or project concepts..."
                  className="w-full px-3.5 py-2.5 bg-[#0a0c16] border border-slate-700 rounded font-sans text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1e2336] hover:bg-amber-500 text-amber-300 hover:text-black font-gta font-bold text-sm tracking-widest rounded border border-amber-500/30 hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>SEND DIRECT MESSAGE (PREVIEW ONLY)</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
