import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { Character, ChatMessage } from '../types'
import { dialogueData, matchUserIntent, conversationChoices } from '../data/dialogues'
import { soundManager } from '../utils/audio'
import { AvatarCanvas } from './AvatarCanvas'

import {
  Mic,
  MicOff,
  Square,
  RotateCcw,
  Send,
  Trash2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Shield,
  Bot,
  User,
  Volume2,
} from 'lucide-react'

// Male and Female keyword hints for OS/browser speech voices
const MALE_HINTS = [
  'ravi',
  'prabhat',
  'david',
  'guy',
  'mark',
  'george',
  'james',
  'andrew',
  'ryan',
  'brian',
  'christopher',
  'eric',
  'liam',
  'male',
  'steffan',
  'roger',
]

const FEMALE_HINTS = [
  'heera',
  'neerja',
  'zira',
  'jenny',
  'aria',
  'sonia',
  'hazel',
  'susan',
  'catherine',
  'female',
  'eva',
  'samantha',
  'victoria',
  'karen',
  'anna',
]

interface RankedVoice {
  voice: SpeechSynthesisVoice
  isMaleHint: boolean
  isIndian: boolean
  score: number
  label: string
}

function rankVoices(voices: SpeechSynthesisVoice[]): RankedVoice[] {
  const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
  const candidateVoices = englishVoices.length > 0 ? englishVoices : voices

  return candidateVoices
    .map((voice) => {
      const nameLower = voice.name.toLowerCase()
      const langLower = voice.lang.toLowerCase()

      const isMale = MALE_HINTS.some((k) => nameLower.includes(k))
      const isFemale = FEMALE_HINTS.some((k) => nameLower.includes(k))
      const isIndian = langLower.includes('en-in') || nameLower.includes('india')

      let score = 10
      if (isMale && !isFemale) score += 60
      if (isFemale) score -= 40

      if (isIndian) {
        score += isMale ? 50 : 15
      } else if (langLower.includes('en-gb') || langLower.includes('en-us')) {
        score += 20
      }

      if (nameLower.includes('natural') || nameLower.includes('online')) {
        score += 10
      }

      let tag = ''
      if (isIndian && isMale) tag = ' [Indian English • Male]'
      else if (isIndian) tag = ' [Indian English]'
      else if (isMale) tag = ' [Male Hint]'
      else if (isFemale) tag = ' [Female Hint]'

      return {
        voice,
        isMaleHint: isMale && !isFemale,
        isIndian,
        score,
        label: `${voice.name}${tag}`,
      }
    })
    .sort((a, b) => b.score - a.score)
}

interface TalkingCharacterProps {
  selectedCharacter: Character
  onNavigateSection: (sectionId: string) => void
}

export const TalkingCharacter: React.FC<TalkingCharacterProps> = ({
  selectedCharacter,
  onNavigateSection,
}) => {
  // Voice & Speech synthesis state
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('')
  const [previewingVoice, setPreviewingVoice] = useState<boolean>(false)

  // Rank available voices with priority for Indian English and male hints
  const rankedVoices = useMemo(() => rankVoices(availableVoices), [availableVoices])

  // Chat & Conversation state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'chethan',
      text: dialogueData.greetingScript,
      timestamp: 'Just now',
    },
  ])
  const [userInput, setUserInput] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [displayedLatestText, setDisplayedLatestText] = useState<string>(dialogueData.greetingScript)

  // Track latest response text for replay
  const [latestResponseText, setLatestResponseText] = useState<string>(dialogueData.greetingScript)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const typewriterTimerRef = useRef<number | null>(null)
  const voiceEnabledRef = useRef<boolean>(voiceEnabled)

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled
  }, [voiceEnabled])

  // Auto-scroll chat to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, displayedLatestText])

  // Initialize SpeechSynthesis voices asynchronously
  useEffect(() => {
    if (!speechSupported) return

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices && voices.length > 0) {
        setAvailableVoices(voices)
        setSelectedVoiceURI((prev) => {
          if (prev && voices.some((v) => v.voiceURI === prev)) return prev
          const ranked = rankVoices(voices)
          return ranked.length > 0 ? ranked[0].voice.voiceURI : voices[0].voiceURI
        })
      }
    }

    updateVoices()
    window.speechSynthesis.onvoiceschanged = updateVoices

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [speechSupported])

  // Stop current utterance
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    setPreviewingVoice(false)
  }, [])

  // Speak response using browser speech synthesis with selected natural male voice
  const speakText = useCallback(
    (textToSpeak: string) => {
      if (!voiceEnabledRef.current || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return
      }

      // Cancel previous playback first
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setPreviewingVoice(false)

      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.rate = 0.95 // Natural, clear speaking rate
      utterance.pitch = 0.95 // Grounded masculine pitch

      // Select optimal voice based on user preference or highest male rank
      if (availableVoices.length > 0) {
        const preferredVoice =
          availableVoices.find((v) => v.voiceURI === selectedVoiceURI) ||
          rankedVoices[0]?.voice ||
          availableVoices[0]

        if (preferredVoice) {
          utterance.voice = preferredVoice
        }
      }

      // Synchronize React state using speech events
      utterance.onstart = () => {
        setIsSpeaking(true)
      }

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      utterance.onerror = (e) => {
        setIsSpeaking(false)
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('Speech synthesis event error:', e.error)
        }
      }

      window.speechSynthesis.speak(utterance)
    },
    [availableVoices, selectedVoiceURI, rankedVoices]
  )

  // Preview chosen voice with a short first-person sample
  const previewVoice = useCallback(() => {
    if (!speechSupported || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setPreviewingVoice(true)

    const previewSentence = "Hey there, I'm Chethan S. CIT Gubbi Computer Science student and developer."
    const utterance = new SpeechSynthesisUtterance(previewSentence)
    utterance.rate = 0.95
    utterance.pitch = 0.95

    if (availableVoices.length > 0) {
      const preferredVoice =
        availableVoices.find((v) => v.voiceURI === selectedVoiceURI) ||
        rankedVoices[0]?.voice ||
        availableVoices[0]

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true)
      setPreviewingVoice(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setPreviewingVoice(false)
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      setPreviewingVoice(false)
    }

    window.speechSynthesis.speak(utterance)
  }, [speechSupported, availableVoices, selectedVoiceURI, rankedVoices])

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech()
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current)
      }
    }
  }, [stopSpeech])

  // Handle a new response from Chethan S
  const triggerChethanResponse = useCallback(
    (responseText: string, targetSection?: string) => {
      stopSpeech()
      setLatestResponseText(responseText)

      // Add to chat history

      const newMsgId = `chethan-${Date.now()}`
      setChatHistory((prev) => [
        ...prev,
        {
          id: newMsgId,
          sender: 'chethan',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          targetSectionId: targetSection,
        },
      ])

      // Typewriter animation for latest message
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current)
      }

      const prefersReducedMotion =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        setDisplayedLatestText(responseText)
        setIsTyping(false)
        if (voiceEnabledRef.current) {
          speakText(responseText)
        }
        return
      }

      setDisplayedLatestText('')
      setIsTyping(true)

      let charIndex = 0
      const step = 2
      const speed = 16

      typewriterTimerRef.current = window.setInterval(() => {
        charIndex += step
        if (charIndex >= responseText.length) {
          setDisplayedLatestText(responseText)
          setIsTyping(false)
          if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current)
        } else {
          setDisplayedLatestText(responseText.slice(0, charIndex))
        }
      }, speed)

      if (voiceEnabledRef.current) {
        speakText(responseText)
      }
    },
    [speakText, stopSpeech]
  )

  // Handle preset conversation choices
  const handleSelectChoice = (choiceId: string) => {
    soundManager.playSwitch()
    const choice = conversationChoices.find((c) => c.id === choiceId)
    if (!choice) return

    // Add user question to chat history
    setChatHistory((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: choice.question,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])

    triggerChethanResponse(choice.response, choice.targetSectionId)
  }

  // Handle typed user inquiry
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = userInput.trim()
    if (!trimmed) return

    soundManager.playClick()

    // Add user message
    setChatHistory((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: trimmed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])

    setUserInput('')

    // Match intent locally
    const result = matchUserIntent(trimmed)
    triggerChethanResponse(result.response, result.targetSectionId)
  }

  // Toggle voice narration
  const handleToggleVoice = () => {
    soundManager.playClick()
    if (voiceEnabled) {
      stopSpeech()
      setVoiceEnabled(false)
    } else {
      setVoiceEnabled(true)
      // Read current response aloud
      speakText(latestResponseText)
    }
  }

  // Replay latest response
  const handleReplayResponse = () => {
    soundManager.playClick()
    stopSpeech()
    setDisplayedLatestText(latestResponseText)
    setIsTyping(false)
    if (voiceEnabled) {
      speakText(latestResponseText)
    }
  }

  // Clear conversation history
  const handleClearConversation = () => {
    soundManager.playClick()
    stopSpeech()
    setChatHistory([
      {
        id: 'msg-welcome',
        sender: 'chethan',
        text: dialogueData.greetingScript,
        timestamp: 'Just now',
      },
    ])
    setLatestResponseText(dialogueData.greetingScript)
    setDisplayedLatestText(dialogueData.greetingScript)
  }


  return (
    <section
      id="about"
      aria-labelledby="talking-character-heading"
      className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-gta text-xs tracking-widest uppercase mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>GTA V INTERACTIVE DIALOGUE // CONVERSATIONAL EXPERIENCE</span>
        </div>
        <h2
          id="talking-character-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
        >
          TALKING WITH CHETHAN S
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
          Have a natural first-person conversation with Chethan S. Ask about his engineering studies at CIT Gubbi, his technical toolset, or active AI project concepts.
        </p>
      </div>

      {/* Main Panel Container */}
      <div className="bg-[#101322] border-2 border-amber-500/30 rounded-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.85)] gta-panel-border">
        {/* Top GTA HUD Bar */}
        <div className="px-4 py-3 bg-[#0a0c16] border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full ${
                isSpeaking ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span className="font-bebas text-xl sm:text-2xl text-amber-400 tracking-wider">
              {dialogueData.characterName}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase hidden sm:inline">
              // {selectedCharacter.roleTitle}
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Voice On / Off */}
            {speechSupported && (
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-all cursor-pointer ${
                  voiceEnabled
                    ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'bg-black/50 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500'
                }`}
                title={
                  voiceEnabled
                    ? 'Voice narration is ON (Synthetic browser speech)'
                    : 'Turn voice narration ON (Browser synthetic speech)'
                }
                aria-pressed={voiceEnabled}
              >
                {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                <span className="font-bold">{voiceEnabled ? 'VOICE ON' : 'VOICE OFF'}</span>
              </button>
            )}

            {/* Stop Speaking */}
            {isSpeaking && (
              <button
                type="button"
                onClick={stopSpeech}
                title="Stop current speech narration"
                className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/50 rounded text-xs font-gta tracking-wider cursor-pointer transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-rose-400" />
                <span>STOP</span>
              </button>
            )}

            {/* Replay Response */}
            <button
              type="button"
              onClick={handleReplayResponse}
              title="Replay latest response"
              className="flex items-center gap-1 px-2.5 py-1.5 bg-black/40 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 rounded text-xs font-gta tracking-wider cursor-pointer transition-colors"
              aria-label="Replay current response"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">REPLAY</span>
            </button>

            {/* Clear Conversation */}
            <button
              type="button"
              onClick={handleClearConversation}
              title="Clear dialogue history"
              className="p-1.5 bg-black/40 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-300 rounded cursor-pointer transition-colors"
              aria-label="Clear dialogue thread"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Voice Selection & Preview Sub-bar */}
        {speechSupported && (
          <div className="px-4 sm:px-6 py-2.5 bg-black/45 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-gta text-[11px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>NARRATION VOICE:</span>
              </span>

              {/* Voice Selector Dropdown */}
              <select
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
                className="bg-[#121626] border border-slate-700 hover:border-amber-500/50 text-slate-200 text-xs font-mono rounded px-2.5 py-1 focus:outline-none focus:border-amber-400 transition-colors max-w-[260px] sm:max-w-[340px] truncate cursor-pointer"
                aria-label="Select speech narration voice"
              >
                {rankedVoices.length > 0 ? (
                  rankedVoices.map((item) => (
                    <option key={item.voice.voiceURI} value={item.voice.voiceURI}>
                      {item.label}
                    </option>
                  ))
                ) : (
                  <option value="">System Default Voice</option>
                )}
              </select>

              {/* Preview Button */}
              <button
                type="button"
                onClick={previewVoice}
                disabled={previewingVoice}
                title="Preview selected voice"
                className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[11px] font-mono tracking-wider transition-colors cursor-pointer disabled:opacity-50"
              >
                <Volume2 className="w-3 h-3 text-amber-400" />
                <span>{previewingVoice ? 'PREVIEWING...' : 'PREVIEW'}</span>
              </button>
            </div>

            <span className="text-[10px] font-mono text-slate-400 hidden md:inline">
              *Prioritizing natural male voices (rate 0.95 • pitch 0.95)
            </span>
          </div>
        )}

        {/* Main Body: Portrait Column + Conversation Column */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Alive Character Portrait */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            {/* 3D Talking Avatar Canvas with fallback & 2D toggle */}
            <AvatarCanvas
              isSpeaking={isSpeaking}
              fallbackImageUrl={selectedCharacter.portraitImage}
              characterName={selectedCharacter.name}
            />

            {/* Identity Details */}
            <div className="mt-3.5 space-y-1">
              <h3 className="font-bebas text-2xl text-white tracking-wider">
                CHETHAN S
              </h3>
              <p className="font-gta text-xs text-amber-400 tracking-wider uppercase font-bold">
                B.E. COMPUTER SCIENCE & ENGINEERING
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                CIT GUBBI // KARNATAKA, INDIA
              </p>
            </div>

            <div className="mt-3 px-3 py-1.5 rounded bg-black/50 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 max-w-[220px]">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Verified Identity Portrait</span>
            </div>
          </div>

          {/* Right Column: Conversational Chat Stream & Interactive Input */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
            {/* Conversation Stream */}
            <div
              className="bg-[#0b0e1a] border border-slate-800 rounded-xl p-4 sm:p-5 h-[340px] sm:h-[380px] overflow-y-auto space-y-4"
              role="log"
              aria-label="Conversation dialogue history"
            >
              {chatHistory.map((msg, index) => {
                const isUser = msg.sender === 'user'
                const isLatestChethan = !isUser && index === chatHistory.length - 1

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[78%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? 'bg-amber-500 text-black font-semibold rounded-tr-none shadow-md'
                          : 'bg-[#151929] border border-slate-700/80 text-slate-100 rounded-tl-none shadow-lg'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 font-mono mb-1">
                        <span className="font-bold">{isUser ? 'YOU' : 'CHETHAN S'}</span>
                        {msg.timestamp && <span>{msg.timestamp}</span>}
                      </div>

                      {/* Render text with typewriter on latest Chethan message */}
                      <p className="font-sans text-sm sm:text-base whitespace-pre-wrap">
                        {isLatestChethan && isTyping ? displayedLatestText : msg.text}
                        {isLatestChethan && isTyping && (
                          <span className="inline-block w-1.5 h-4 bg-amber-400 ml-1 animate-pulse" />
                        )}
                      </p>

                      {/* Action button if connected to a portfolio section */}
                      {msg.targetSectionId && !isUser && (
                        <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onNavigateSection(msg.targetSectionId!)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 rounded text-xs font-gta tracking-wider transition-all cursor-pointer"
                          >
                            <span>VIEW {msg.targetSectionId.toUpperCase()} SECTION</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                )
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Question Buttons */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Conversation Questions:</span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {conversationChoices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => handleSelectChoice(choice.id)}
                    className="px-2.5 py-1.5 bg-[#141829] hover:bg-amber-500 hover:text-black text-slate-300 border border-slate-800 hover:border-amber-400 rounded text-xs font-gta tracking-wider transition-all cursor-pointer text-left"
                  >
                    {choice.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Typed Question Input + Send Button */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask Chethan about his skills, projects, CIT, or goals..."
                  className="w-full px-4 py-2.5 bg-[#090b14] border border-slate-700 focus:border-amber-400 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={!userInput.trim()}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-gta font-bold text-sm tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>SEND</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Footer disclosure */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
              <span>Local intent architecture • 0 external APIs required</span>
              {voiceEnabled && (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  Voice Narration Active
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
