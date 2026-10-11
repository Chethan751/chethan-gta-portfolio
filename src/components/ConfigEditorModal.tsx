import React, { useState } from 'react'
import type { SiteConfig } from '../types'
import { soundManager } from '../utils/audio'
import { X, Sliders, Copy, Check, Info } from 'lucide-react'

interface ConfigEditorModalProps {
  isOpen: boolean
  onClose: () => void
  currentConfig: SiteConfig
  onUpdateConfig: (updated: SiteConfig) => void
}

export const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onUpdateConfig,
}) => {
  const [formData, setFormData] = useState<SiteConfig>({ ...currentConfig })
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleSavePreview = (e: React.FormEvent) => {
    e.preventDefault()
    soundManager.playMissionSelect()
    onUpdateConfig(formData)
    onClose()
  }

  const handleCopyCode = () => {
    soundManager.playClick()
    const codeSnippet = `export const initialSiteConfig: SiteConfig = ${JSON.stringify(
      formData,
      null,
      2
    )};`
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-editor-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-[#10131f] border-2 border-amber-500/50 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.95)] my-8 text-left gta-panel-border">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0a0c16] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 id="config-editor-title" className="font-bebas text-2xl text-white tracking-wider">
              PORTFOLIO CONFIGURATION PREVIEWER
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick()
              onClose()
            }}
            className="p-1 rounded bg-black/50 text-slate-400 hover:text-white"
            aria-label="Close configuration previewer modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Note */}
        <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <span>
            <strong>In-Memory Preview Mode:</strong> Changes applied here update your active session instantly without requiring a backend. To make changes permanent across refreshes, copy the configuration snippet below and save it into <code className="font-mono bg-black/40 px-1 py-0.5 rounded text-white">src/data/siteConfig.ts</code>.
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSavePreview} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">DISPLAY NAME</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full px-3 py-2 bg-[#090b14] border border-slate-700 rounded font-sans text-sm text-slate-100 focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">LOCATION</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-[#090b14] border border-slate-700 rounded font-sans text-sm text-slate-100 focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">TAGLINE</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-[#090b14] border border-slate-700 rounded font-sans text-sm text-slate-100 focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">CHARACTER TALK SCRIPT</label>
            <textarea
              rows={3}
              value={formData.characterDialogueIntro}
              onChange={(e) => setFormData({ ...formData, characterDialogueIntro: e.target.value })}
              className="w-full px-3 py-2 bg-[#090b14] border border-slate-700 rounded font-sans text-sm text-slate-100 focus:border-amber-400 resize-none"
            />
          </div>

          {/* Social Links Sub-fields */}
          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase text-amber-400 mb-3 font-semibold">
              Transmission Channels (Optional)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-0.5">Email Address</label>
                <input
                  type="email"
                  value={formData.contactLinks.email || ''}
                  placeholder="e.g. your.email@example.com"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactLinks: {
                        ...formData.contactLinks,
                        email: e.target.value || undefined,
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-[#090b14] border border-slate-700 rounded font-mono text-xs text-slate-100 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-0.5">GitHub URL</label>
                <input
                  type="url"
                  value={formData.contactLinks.github || ''}
                  placeholder="https://github.com/..."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactLinks: {
                        ...formData.contactLinks,
                        github: e.target.value || undefined,
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-[#090b14] border border-slate-700 rounded font-mono text-xs text-slate-100 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-0.5">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.contactLinks.linkedin || ''}
                  placeholder="https://linkedin.com/in/..."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactLinks: {
                        ...formData.contactLinks,
                        linkedin: e.target.value || undefined,
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-[#090b14] border border-slate-700 rounded font-mono text-xs text-slate-100 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-0.5">Resume URL</label>
                <input
                  type="url"
                  value={formData.contactLinks.resumeUrl || ''}
                  placeholder="https://drive.google.com/... or /resume.pdf"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactLinks: {
                        ...formData.contactLinks,
                        resumeUrl: e.target.value || undefined,
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-[#090b14] border border-slate-700 rounded font-mono text-xs text-slate-100 focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED SNIPPET!' : 'COPY AS CODE'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-black/50 text-slate-400 hover:text-white rounded text-xs font-gta cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold font-gta tracking-wider rounded text-xs cursor-pointer shadow-lg"
              >
                APPLY PREVIEW
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
