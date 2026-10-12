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
  Loader2,
  AlertCircle,
  HelpCircle,
  Cpu,
} from 'lucide-react'

// Web Speech API interface definitions
interface SpeechRecognitionEventLike {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string
      }
    }
  }
}

interface SpeechRecognitionInstance {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

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

  // Speech Recognition (Microphone input) state
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [micError, setMicError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  // Rank available voices with priority for Indian English and male hints
  const rankedVoices = useMemo(() => rankVoices(availableVoices), [availableVoices])

  // Chat & Conversation state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'chethan',
      text: dialogueData.greetingScript,
      timestamp: 'Just now',
      source: 'local',
      model: 'Verified Knowledge Base',
    },
  ])
  const [userInput, setUserInput] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false)
  const [displayedLatestText, setDisplayedLatestText] = useState<string>(dialogueData.greetingScript)
  const [latestResponseText, setLatestResponseText] = useState<string>(dialogueData.greetingScript)
  const [lastApiError, setLastApiError] = useState<string | null>(null)

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
  }, [chatHistory, displayedLatestText, isAiLoading])

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

      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setPreviewingVoice(false)

      const utterance = new SpeechSynthesisUtterance(textToSpeak)
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

  // Voice preview
  const previewVoice = useCallback(() => {
    if (!speechSupported || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setPreviewingVoice(true)

    const previewSentence = "Hey there, I'm Chethan S. B.E. Computer Science student at CIT Gubbi."
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
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [stopSpeech])

  // Handle a new response from Chethan S
  const triggerChethanResponse = useCallback(
    (
      responseText: string,
      targetSection?: string,
      source: 'openrouter' | 'local' = 'local',
      model?: string
    ) => {
      stopSpeech()
      setLatestResponseText(responseText)

      const newMsgId = `chethan-${Date.now()}`
      setChatHistory((prev) => [
        ...prev,
        {
          id: newMsgId,
          sender: 'chethan',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          targetSectionId: targetSection,
          source,
          model,
        },
      ])

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
      const speed = 14

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

  // Send message through Serverless AI Endpoint with graceful local fallback
  const processUserMessage = async (messageText: string, targetSection?: string) => {
    setIsAiLoading(true)
    setLastApiError(null)

    // Build bounded session history for the AI model
    const recentHistory = chatHistory.slice(-8).map((msg) => ({
      sender: msg.sender,
      text: msg.text,
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          history: recentHistory,
        }),
      })

      const data = await response.json()

      if (response.ok && data.response) {
        // AI model answered successfully
        setIsAiLoading(false)
        triggerChethanResponse(data.response, targetSection, 'openrouter', data.model)
        return
      }

      // API returned error or fallback requested
      console.warn('AI endpoint returned non-OK status:', data)
      setLastApiError(data.message || 'AI service unavailable. Using local verified knowledge.')
      
      // Fallback to local verified intent matcher
      const localResult = matchUserIntent(messageText)
      setIsAiLoading(false)
      triggerChethanResponse(localResult.response, localResult.targetSectionId || targetSection, 'local', 'Verified Knowledge Base')
    } catch (networkErr) {
      console.warn('Failed to reach AI endpoint (/api/chat), engaging local fallback:', networkErr)
      setLastApiError('Network connection to AI endpoint failed. Operating in local verified mode.')
      const localResult = matchUserIntent(messageText)
      setIsAiLoading(false)
      triggerChethanResponse(localResult.response, localResult.targetSectionId || targetSection, 'local', 'Verified Knowledge Base')
    }
  }

  // Handle preset conversation choices
  const handleSelectChoice = (choiceId: string) => {
    soundManager.playSwitch()
    const choice = conversationChoices.find((c) => c.id === choiceId)
    if (!choice || isAiLoading) return

    setChatHistory((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: choice.question,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])

    processUserMessage(choice.question, choice.targetSectionId)
  }

  // Handle typed user inquiry
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = userInput.trim()
    if (!trimmed || isAiLoading) return

    soundManager.playClick()

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
    processUserMessage(trimmed)
  }

  // Optional Microphone Voice Input
  const toggleMicrophoneInput = () => {
    soundManager.playClick()
    setMicError(null)

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsRecording(false)
      return
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRec) {
      setMicError('Speech recognition is not supported in this browser. Please type your message.')
      return
    }

    try {
      const recognition = new SpeechRec()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        const transcript = event.results[0][0].transcript
        setUserInput(transcript)
      }

      recognition.onerror = (event: { error: string }) => {
        setIsRecording(false)
        if (event.error === 'not-allowed') {
          setMicError('Microphone permission was denied. You can continue typing via text chat.')
        } else if (event.error !== 'no-speech') {
          setMicError(`Voice error: ${event.error}. You can continue typing below.`)
        }
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current = recognition
      recognition.start()
      setIsRecording(true)
    } catch (err) {
      setIsRecording(false)
      setMicError('Could not initialize microphone. Please type your message.')
      console.warn('Microphone initialization error:', err)
    }
  }

  // Toggle voice narration
  const handleToggleVoice = () => {
    soundManager.playClick()
    if (voiceEnabled) {
      stopSpeech()
      setVoiceEnabled(false)
    } else {
      setVoiceEnabled(true)
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
        source: 'local',
        model: 'Verified Knowledge Base',
      },
    ])
    setLatestResponseText(dialogueData.greetingScript)
    setDisplayedLatestText(dialogueData.greetingScript)
    setLastApiError(null)
  }

  return (
    <section
      id="about"
      aria-labelledby="talking-character-heading"
      className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-gta text-xs tracking-widest uppercase mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-red-400" />
          <span>SCENE 06 // CONVERSATIONAL AI & LIVE DIALOGUE</span>
        </div>
        <h2
          id="talking-character-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-black font-bebas text-white tracking-wider"
        >
          TALKING WITH CHETHAN S
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-1">
          Have an open-ended conversation with Chethan S powered by a secure serverless AI endpoint, speech narration, and verified portfolio safeguards.
        </p>
      </div>

      {/* Main Panel Container */}
      <div className="bg-[#0e101c] border-2 border-red-500/30 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] gta-panel-border">
        {/* Top GTA HUD Bar */}
        <div className="px-4 py-3 bg-[#080911] border-b border-red-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full ${
                isSpeaking ? 'bg-red-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span className="font-bebas text-xl sm:text-2xl text-white tracking-wider">
              {dialogueData.characterName}
            </span>
            <span className="text-xs font-mono text-red-400 uppercase hidden sm:inline">
              // {selectedCharacter.roleTitle}
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Voice Narration Toggle */}
            {speechSupported && (
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-all cursor-pointer ${
                  voiceEnabled
                    ? 'bg-red-600 text-white border-red-400 font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                    : 'bg-black/50 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500'
                }`}
                title={
                  voiceEnabled
                    ? 'Voice narration is ON (Browser speech synthesis)'
                    : 'Turn voice narration ON (Browser speech synthesis)'
                }
                aria-pressed={voiceEnabled}
              >
                {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 opacity-50" />}
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
              className="flex items-center gap-1 px-2.5 py-1.5 bg-black/40 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-red-300 rounded text-xs font-gta tracking-wider cursor-pointer transition-colors"
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
          <div className="px-4 sm:px-6 py-2.5 bg-black/50 border-b border-red-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-gta text-[11px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-red-400" />
                <span>NARRATION VOICE:</span>
              </span>

              <select
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
                className="bg-[#121626] border border-slate-700 hover:border-red-500/50 text-slate-200 text-xs font-mono rounded px-2.5 py-1 focus:outline-none focus:border-red-400 transition-colors max-w-[260px] sm:max-w-[340px] truncate cursor-pointer"
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

              <button
                type="button"
                onClick={previewVoice}
                disabled={previewingVoice}
                title="Preview selected voice"
                className="flex items-center gap-1 px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/40 rounded text-[11px] font-mono tracking-wider transition-colors cursor-pointer disabled:opacity-50"
              >
                <Volume2 className="w-3 h-3 text-red-400" />
                <span>{previewingVoice ? 'PREVIEWING...' : 'PREVIEW'}</span>
              </button>
            </div>

            <span className="text-[10px] font-mono text-slate-400 hidden md:inline">
              *Prioritizing natural male voices (rate 0.95 • pitch 0.95)
            </span>
          </div>
        )}

        {/* Mic Denial / System Alert Bar */}
        {micError && (
          <div className="px-4 py-2 bg-rose-950/40 border-b border-rose-500/40 text-rose-300 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{micError}</span>
            </span>
            <button
              onClick={() => setMicError(null)}
              className="text-[10px] text-slate-400 hover:text-white font-bold ml-2 uppercase"
            >
              DISMISS
            </button>
          </div>
        )}

        {lastApiError && (
          <div className="px-4 py-2 bg-amber-950/30 border-b border-amber-500/40 text-amber-300 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{lastApiError}</span>
            </span>
            <button
              onClick={() => setLastApiError(null)}
              className="text-[10px] text-slate-400 hover:text-white font-bold ml-2 uppercase"
            >
              OK
            </button>
          </div>
        )}

        {/* Main Body: Portrait Column + Conversation Column */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Character Visual */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <AvatarCanvas
              isSpeaking={isSpeaking}
              fallbackImageUrl={selectedCharacter.portraitImage}
              characterName={selectedCharacter.name}
              referenceOriginalImage={selectedCharacter.referenceOriginalImage}
            />

            <div className="mt-3.5 space-y-1">
              <h3 className="font-bebas text-2xl text-white tracking-wider">
                CHETHAN S
              </h3>
              <p className="font-gta text-xs text-red-400 tracking-wider uppercase font-bold">
                B.E. COMPUTER SCIENCE & ENGINEERING
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                CIT GUBBI // KARNATAKA, INDIA
              </p>
            </div>

            <div className="mt-3 px-3 py-1.5 rounded bg-black/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 max-w-[240px]">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Verified Identity Character</span>
            </div>

            {/* Lip Synchronization Documentation Pill */}
            <div className="mt-2.5 p-2 bg-[#080911] border border-slate-800 rounded text-[10px] font-mono text-slate-400 max-w-[260px] text-left">
              <span className="text-red-400 font-bold block mb-0.5">LIP-SYNC ARCHITECTURE:</span>
              <span>Procedural audio-reactive jaw movement is active in 3D demo. 2D portrait uses ambient speaking glow.</span>
            </div>
          </div>

          {/* Right Column: Conversational Chat Stream & Interactive Input */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
            {/* Conversation Stream */}
            <div
              className="bg-[#07080f] border border-slate-800 rounded-xl p-4 sm:p-5 h-[340px] sm:h-[380px] overflow-y-auto space-y-4"
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
                      <div className="w-7 h-7 rounded bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? 'bg-red-600 text-white font-semibold rounded-tr-none shadow-md'
                          : 'bg-[#121524] border border-slate-700/80 text-slate-100 rounded-tl-none shadow-lg'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 font-mono mb-1">
                        <span className="font-bold flex items-center gap-1.5">
                          <span>{isUser ? 'YOU' : 'CHETHAN S'}</span>
                          {!isUser && msg.source === 'openrouter' && (
                            <span className="text-[9px] px-1 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                              AI MODEL
                            </span>
                          )}
                          {!isUser && msg.source === 'local' && (
                            <span className="text-[9px] px-1 rounded bg-slate-800 text-slate-300">
                              LOCAL BASE
                            </span>
                          )}
                        </span>
                        {msg.timestamp && <span>{msg.timestamp}</span>}
                      </div>

                      {/* Render text with typewriter on latest Chethan message */}
                      <p className="font-sans text-sm sm:text-base whitespace-pre-wrap">
                        {isLatestChethan && isTyping ? displayedLatestText : msg.text}
                        {isLatestChethan && isTyping && (
                          <span className="inline-block w-1.5 h-4 bg-red-400 ml-1 animate-pulse" />
                        )}
                      </p>

                      {/* Model info footer */}
                      {!isUser && msg.model && (
                        <div className="mt-2 text-[9px] font-mono text-slate-400 opacity-60">
                          Model: {msg.model}
                        </div>
                      )}

                      {/* Navigation Link if mapped */}
                      {msg.targetSectionId && !isUser && (
                        <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onNavigateSection(msg.targetSectionId!)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 rounded text-xs font-gta tracking-wider transition-all cursor-pointer"
                          >
                            <span>EXPLORE {msg.targetSectionId.toUpperCase()}</span>
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

              {/* AI Thinking Indicator */}
              {isAiLoading && (
                <div className="flex items-center gap-2 text-slate-300 text-xs font-mono p-3 bg-[#121524] rounded-lg border border-red-500/30 max-w-xs animate-pulse">
                  <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                  <span>Thinking with OpenRouter AI...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Questions */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Suggested Questions:</span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {conversationChoices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={isAiLoading}
                    onClick={() => handleSelectChoice(choice.id)}
                    className="px-2.5 py-1.5 bg-[#121524] hover:bg-red-600 hover:text-white disabled:opacity-50 text-slate-300 border border-slate-800 hover:border-red-400 rounded text-xs font-gta tracking-wider transition-all cursor-pointer text-left"
                  >
                    {choice.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form with Optional Microphone & Text Chat */}
            <form onSubmit={handleSendMessage} className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                {/* Optional Microphone Button */}
                <button
                  type="button"
                  onClick={toggleMicrophoneInput}
                  disabled={isAiLoading}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.7)]'
                      : 'bg-[#121524] hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title={isRecording ? 'Stop listening' : 'Start voice input (optional)'}
                  aria-label={isRecording ? 'Stop voice input' : 'Start voice input'}
                >
                  {isRecording ? <Mic className="w-4 h-4 text-white" /> : <MicOff className="w-4 h-4" />}
                </button>

                {/* Text input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={
                      isRecording
                        ? 'Listening to your voice... Speak now'
                        : 'Ask Chethan anything (education, skills, projects, programming concepts)...'
                    }
                    disabled={isAiLoading}
                    className="w-full px-4 py-2.5 bg-[#07080f] border border-slate-700 focus:border-red-400 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-400 font-sans"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!userInput.trim() || isAiLoading}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-gta font-bold text-sm tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  {isAiLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>SEND</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Live recording indicator */}
              {isRecording && (
                <div className="text-xs font-mono text-red-400 flex items-center gap-1.5 pl-1 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Recording voice input... You can inspect the text above before sending.</span>
                </div>
              )}
            </form>

            {/* Footer Architecture Disclosure */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1 gap-2">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-red-400" />
                <span>OpenRouter AI Endpoint + Zero-Lag Local Verified Fallback</span>
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <HelpCircle className="w-3 h-3" />
                <span>Mic is 100% optional • Works 24/7 on Vercel</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
