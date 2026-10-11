import React, { useState, useEffect, useRef } from 'react'
import type { Character } from '../types'
import { dialogueData } from '../data/dialogues'
import { soundManager } from '../utils/audio'
import {
  Mic,
  MicOff,
  RotateCcw,
  FastForward,
  ChevronUp,
  ChevronDown,
  Volume2,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

interface TalkingCharacterProps {
  selectedCharacter: Character
  onNavigateSection: (sectionId: string) => void
}

export const TalkingCharacter: React.FC<TalkingCharacterProps> = ({
  selectedCharacter,
  onNavigateSection,
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string>('intro')
  const [displayedText, setDisplayedText] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false)
  const [minimized, setMinimized] = useState<boolean>(false)
  const [speechSupported] = useState<boolean>(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window
  )

  const activeFullText =
    activeTopicId === 'intro'
      ? dialogueData.greetingScript
      : dialogueData.topics.find((t) => t.id === activeTopicId)?.text || dialogueData.greetingScript

  const targetSection =
    activeTopicId === 'intro'
      ? undefined
      : dialogueData.topics.find((t) => t.id === activeTopicId)?.targetSectionId

  const typewriterRef = useRef<number | null>(null)
  const voiceEnabledRef = useRef(voiceEnabled)

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled
  }, [voiceEnabled])

  // Handle SpeechSynthesis narration
  const stopSpeech = React.useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [])

  const speakText = React.useCallback((text: string) => {
    if (!voiceEnabledRef.current || !speechSupported) return

    stopSpeech()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [speechSupported, stopSpeech])

  // Typewriter effect
  useEffect(() => {
    if (typewriterRef.current) {
      window.clearInterval(typewriterRef.current)
    }

    const currentText = activeFullText
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        setDisplayedText(currentText)
        setIsTyping(false)
        if (voiceEnabled) speakText(currentText)
      }, 0)
      return () => clearTimeout(t)
    }

    const startTimer = setTimeout(() => {
      setDisplayedText('')
      setIsTyping(true)

      let currentIndex = 0
      const stepLength = 2
      const intervalTime = 16

      typewriterRef.current = window.setInterval(() => {
        currentIndex += stepLength
        if (currentIndex >= currentText.length) {
          setDisplayedText(currentText)
          setIsTyping(false)
          if (typewriterRef.current) clearInterval(typewriterRef.current)
        } else {
          setDisplayedText(currentText.slice(0, currentIndex))
        }
      }, intervalTime)

      if (voiceEnabled) {
        speakText(currentText)
      }
    }, 0)

    return () => {
      clearTimeout(startTimer)
      if (typewriterRef.current) clearInterval(typewriterRef.current)
      stopSpeech()
    }
  }, [activeTopicId, activeFullText, voiceEnabled, speakText, stopSpeech])


  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stopSpeech()
    }
  }, [stopSpeech])



  const handleSkipAnimation = () => {
    soundManager.playClick()
    if (typewriterRef.current) clearInterval(typewriterRef.current)
    setDisplayedText(activeFullText)
    setIsTyping(false)
  }

  const handleReplay = () => {
    soundManager.playClick()
    stopSpeech()
    setDisplayedText('')
    setIsTyping(true)
    setActiveTopicId((prev) => (prev === 'intro' ? 'intro-again' : 'intro'))
    setTimeout(() => setActiveTopicId('intro'), 10)
  }

  const handleTopicSelect = (topicId: string) => {
    soundManager.playSwitch()
    stopSpeech()
    setActiveTopicId(topicId)
  }

  const toggleVoice = () => {
    soundManager.playClick()
    if (voiceEnabled) {
      stopSpeech()
      setVoiceEnabled(false)
    } else {
      setVoiceEnabled(true)
      speakText(activeFullText)
    }
  }

  return (
    <section
      id="about"
      aria-labelledby="about-character-heading"
      className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-gta text-xs tracking-widest uppercase mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>INTERACTIVE DIALOGUE SYSTEM // FIRST-PERSON INTERVIEW</span>
        </div>
        <h2
          id="about-character-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
        >
          TALKING WITH CHETHAN S
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
          Direct dialogue panel inspired by open-world mission cutscenes. Choose dialogue topics below or listen with optional browser voice narration.
        </p>
      </div>

      {/* Main Dialogue Panel Container */}
      <div className="relative bg-[#111422] border-2 border-amber-500/30 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] gta-panel-border">
        {/* Top GTA HUD Bar */}
        <div className="px-4 py-3 bg-[#0a0c16] border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bebas text-xl sm:text-2xl text-amber-400 tracking-wider">
              {dialogueData.characterName}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase hidden sm:inline">
              // {selectedCharacter.roleTitle}
            </span>
          </div>

          {/* Controls: Minimize, Speech Toggle, Skip */}
          <div className="flex items-center gap-2">
            {/* Voice Narration Toggle */}
            {speechSupported && (
              <button
                onClick={toggleVoice}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-all cursor-pointer ${
                  voiceEnabled
                    ? 'bg-amber-500 text-black border-amber-400 font-bold'
                    : 'bg-black/50 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title={
                  voiceEnabled
                    ? 'Voice Narration is Active (Synthetic Browser Speech)'
                    : 'Enable Browser Synthetic Speech (Opt-in)'
                }
                aria-pressed={voiceEnabled}
              >
                {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{voiceEnabled ? 'VOICE ON' : 'VOICE OFF'}</span>
              </button>
            )}

            {/* Replay */}
            <button
              onClick={handleReplay}
              title="Replay dialogue typing"
              className="p-1.5 bg-black/40 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded cursor-pointer"
              aria-label="Replay dialogue"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Skip Typing Animation */}
            {isTyping && (
              <button
                onClick={handleSkipAnimation}
                title="Skip text reveal"
                className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-xs font-gta tracking-wider cursor-pointer"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>SKIP</span>
              </button>
            )}

            {/* Minimize / Expand Toggle */}
            <button
              onClick={() => {
                soundManager.playClick()
                setMinimized(!minimized)
              }}
              className="p-1.5 bg-black/40 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded cursor-pointer"
              aria-label={minimized ? 'Expand dialogue box' : 'Minimize dialogue box'}
            >
              {minimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!minimized && (
          <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Animated Character Avatar & Speaking Indicator */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center text-center">
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-lg overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-black">
                <img
                  src={selectedCharacter.portraitImage}
                  alt={`Portrait of ${selectedCharacter.name}`}
                  className="w-full h-full object-cover filter brightness-105"
                />

                {/* Speaking Wave Overlay */}
                {(isTyping || isSpeaking) && (
                  <div className="absolute bottom-2 inset-x-2 py-1 bg-black/85 backdrop-blur-sm rounded border border-amber-500/60 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-3 bg-amber-400 rounded-full animate-bounce" />
                    <span className="text-[10px] font-mono font-bold text-amber-300 ml-1">SPEAKING</span>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <span className="font-bebas text-lg text-white tracking-wider block">
                  {selectedCharacter.name}
                </span>
                <span className="text-xs font-gta text-amber-400 tracking-wide block">
                  CIT CSE // GUBBI
                </span>
              </div>
            </div>

            {/* Right: Dialogue Box Text & Response */}
            <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between min-h-[220px]">
              {/* Dialogue Balloon */}
              <div className="bg-[#0b0d18] border border-slate-700/80 rounded-lg p-5 sm:p-6 relative">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold">
                      {activeTopicId === 'intro' ? 'OPENING MONOLOGUE' : 'DIALOGUE RESPONSE'}
                    </span>
                    {voiceEnabled && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        <Volume2 className="w-3 h-3" /> SYNTHETIC NARRATION
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {dialogueData.characterName}
                  </span>
                </div>

                {/* Animated Speech Text */}
                <p className="text-base sm:text-lg md:text-xl text-slate-100 font-sans leading-relaxed min-h-[90px]">
                  {displayedText}
                  {isTyping && <span className="inline-block w-2 h-5 bg-amber-400 ml-1 animate-pulse" />}
                </p>

                {/* Action button to related section if topic is chosen */}
                {targetSection && (
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => onNavigateSection(targetSection)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 rounded text-xs font-gta tracking-wider transition-all cursor-pointer"
                    >
                      <span>VIEW {targetSection.toUpperCase()} SECTION</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Dialogue Topic Choices */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Choose Conversation Topic:</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleReplay}
                    className={`px-3 py-1.5 rounded text-xs font-gta tracking-wider border transition-all cursor-pointer ${
                      activeTopicId === 'intro'
                        ? 'bg-amber-500 text-black border-amber-400 font-bold'
                        : 'bg-[#151926] text-slate-300 border-slate-700 hover:border-amber-500/50'
                    }`}
                  >
                    INTRO TALK
                  </button>

                  {dialogueData.topics.map((topic) => {
                    const isSelected = activeTopicId === topic.id
                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicSelect(topic.id)}
                        className={`px-3 py-1.5 rounded text-xs font-gta tracking-wider border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-black border-amber-400 font-bold'
                            : 'bg-[#151926] text-slate-300 border-slate-700 hover:border-amber-500/50'
                        }`}
                      >
                        {topic.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice disclosure note */}
      <div className="mt-3 text-[11px] font-mono text-slate-500">
        Voice narration uses your device&apos;s standard browser Web SpeechSynthesis API with zero third-party dependencies. Disabled by default.
      </div>
    </section>
  )
}
