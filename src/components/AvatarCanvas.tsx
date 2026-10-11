import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Loader2, AlertCircle, Box, Image as ImageIcon } from 'lucide-react'

interface AvatarCanvasProps {
  isSpeaking: boolean
  fallbackImageUrl: string
  characterName: string
  modelUrl?: string
}

interface MorphMeshInfo {
  mesh: THREE.Mesh
  mouthOpenIndex: number
  mouthSmileIndex: number
}

export const AvatarCanvas: React.FC<AvatarCanvasProps> = ({
  isSpeaking,
  fallbackImageUrl,
  characterName,
  modelUrl = '/assets/avatar.glb',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [loading, setLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'3d' | 'portrait'>('portrait')

  // Keep latest isSpeaking in ref for animation loop
  const isSpeakingRef = useRef<boolean>(isSpeaking)
  useEffect(() => {
    isSpeakingRef.current = isSpeaking
  }, [isSpeaking])

  // Refs for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const morphMeshesRef = useRef<MorphMeshInfo[]>([])
  const headBoneRef = useRef<THREE.Bone | null>(null)
  const neckBoneRef = useRef<THREE.Bone | null>(null)
  const spineBoneRef = useRef<THREE.Bone | null>(null)
  const avatarGroupRef = useRef<THREE.Group | null>(null)
  const isVisibleRef = useRef<boolean>(true)

  // Pointer tracking
  const pointerTarget = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const isDragging = useRef<boolean>(false)
  const previousPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const userRotationY = useRef<number>(0)

  // Pointer event handlers for gentle interactive rotation & head tracking
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

    pointerTarget.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) }

    if (isDragging.current) {
      const deltaX = e.clientX - previousPointer.current.x
      userRotationY.current += deltaX * 0.008
      // Clamp rotation so avatar doesn't spin fully backwards
      userRotationY.current = Math.max(-0.6, Math.min(0.6, userRotationY.current))
      previousPointer.current = { x: e.clientX, y: e.clientY }
    }
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    previousPointer.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  useEffect(() => {
    if (viewMode !== '3d' || !canvasRef.current || !containerRef.current) {
      return
    }

    const container = containerRef.current
    const canvas = canvasRef.current

    let animationFrameId: number
    const clock = new THREE.Clock()

    // 1. Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // 2. Camera: Framed around chest and head (Medium Portrait Composition)
    const width = container.clientWidth || 280
    const height = container.clientHeight || 360
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 20)

    // Model rig dimensions from GLB:
    // Head bone is at Y = 1.638m, top of hair is at Y = 1.865m, neck is at Y = 1.52m, chest/shoulders at Y = 1.25-1.37m
    // Center portrait framing around eyes / upper torso (Y = 1.58m)
    const TARGET_CENTER_Y = 1.58
    const DESIRED_VISIBLE_HEIGHT = 0.88 // 1.14m (shoulders/chest) to 2.02m (well above hair at 1.865m with headroom)
    const DESIRED_VISIBLE_WIDTH = 0.58  // 0.50m shoulder span with margins

    const updateCameraFraming = (w: number, h: number) => {
      const aspect = w / h
      camera.aspect = aspect

      const fovRad = (camera.fov * Math.PI) / 180
      const tanHalfFov = Math.tan(fovRad / 2)

      const distV = DESIRED_VISIBLE_HEIGHT / (2 * tanHalfFov)
      const distH = DESIRED_VISIBLE_WIDTH / (2 * tanHalfFov * aspect)
      const distance = Math.max(distV, distH, 1.62)

      camera.position.set(0, TARGET_CENTER_Y, distance)
      camera.lookAt(0, TARGET_CENTER_Y, 0)
      camera.updateProjectionMatrix()
    }

    updateCameraFraming(width, height)

    // 3. WebGL Renderer
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
      rendererRef.current = renderer
    } catch (err) {
      console.error('WebGL initialization failed:', err)
      setTimeout(() => {
        setLoadError('WebGL is unavailable on this device.')
        setLoading(false)
      }, 0)
      return
    }

    // 4. Cinematic GTA V Los Santos Lighting Stage
    const ambientLight = new THREE.AmbientLight(0x222a38, 1.2)
    scene.add(ambientLight)

    // Key Light (warm amber front light)
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.8)
    keyLight.position.set(0.6, 2.2, 1.5)
    scene.add(keyLight)

    // Golden hour rim light (Los Santos sunset highlight from behind)
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 3.8)
    rimLight.position.set(-1.2, 1.8, -1.2)
    scene.add(rimLight)

    // Cool neon fill light (downtown cyan fill)
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2)
    fillLight.position.set(-0.8, 1.0, 1.2)
    scene.add(fillLight)

    // 5. Load 3D GLTF Avatar Model
    morphMeshesRef.current = []

    const loader = new GLTFLoader()
    loader.load(
      modelUrl,
      (gltf) => {
        const avatar = gltf.scene
        avatarGroupRef.current = avatar

        // Center avatar
        avatar.position.set(0, 0, 0)
        avatar.rotation.set(0, 0, 0)
        scene.add(avatar)

        // Traverse to find facial morph targets and skeleton bones
        avatar.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
              const dict = mesh.morphTargetDictionary
              const mouthOpenIdx = dict['mouthOpen'] ?? -1
              const mouthSmileIdx = dict['mouthSmile'] ?? -1

              if (mouthOpenIdx !== -1 || mouthSmileIdx !== -1) {
                morphMeshesRef.current.push({
                  mesh,
                  mouthOpenIndex: mouthOpenIdx,
                  mouthSmileIndex: mouthSmileIdx,
                })
              }
            }
          }

          if ((child as THREE.Bone).isBone) {
            const bone = child as THREE.Bone
            const boneName = bone.name.toLowerCase()
            if (boneName === 'head' && !headBoneRef.current) {
              headBoneRef.current = bone
            } else if (boneName === 'neck' && !neckBoneRef.current) {
              neckBoneRef.current = bone
            } else if ((boneName === 'spine2' || boneName === 'spine1') && !spineBoneRef.current) {
              spineBoneRef.current = bone
            }
          }
        })

        setLoading(false)
      },
      undefined,
      (err) => {
        console.warn('3D avatar model failed to load:', err)
        setLoadError('Failed to load 3D model asset.')
        setLoading(false)
      }
    )

    // 6. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer) return
      const w = container.clientWidth || 280
      const h = container.clientHeight || 360
      updateCameraFraming(w, h)
      renderer.setSize(w, h)
    })
    resizeObserver.observe(container)

    // 7. Intersection Observer for Performance
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )
    intersectionObserver.observe(container)

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 8. Render & Animation Loop
    let currentMouthOpen = 0
    let currentMouthSmile = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisibleRef.current) {
        return
      }

      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      // Idle breathing & natural motion
      if (!prefersReducedMotion && spineBoneRef.current) {
        spineBoneRef.current.rotation.x = Math.sin(elapsedTime * 1.5) * 0.015
        spineBoneRef.current.rotation.z = Math.cos(elapsedTime * 0.8) * 0.008
      }

      // Smooth interactive user rotation
      if (avatarGroupRef.current) {
        avatarGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          avatarGroupRef.current.rotation.y,
          userRotationY.current,
          delta * 8
        )
      }

      // Interactive Head Tracking towards mouse pointer
      if (!prefersReducedMotion && headBoneRef.current) {
        const targetRotY = pointerTarget.current.x * 0.22
        const targetRotX = -pointerTarget.current.y * 0.15

        headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
          headBoneRef.current.rotation.y,
          targetRotY,
          delta * 5
        )
        headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
          headBoneRef.current.rotation.x,
          targetRotX,
          delta * 5
        )

        if (neckBoneRef.current) {
          neckBoneRef.current.rotation.y = THREE.MathUtils.lerp(
            neckBoneRef.current.rotation.y,
            targetRotY * 0.4,
            delta * 5
          )
        }
      }

      // Real-time Talking Animation: Morph Targets (mouthOpen & mouthSmile)
      const speaking = isSpeakingRef.current
      let targetMouthOpen = 0
      let targetMouthSmile = 0

      if (speaking) {
        // Natural speech cadence combining multiple harmonic frequencies
        const speechOsc1 = Math.sin(elapsedTime * 18)
        const speechOsc2 = Math.sin(elapsedTime * 28)
        const speechOsc3 = Math.cos(elapsedTime * 11)
        const composite = (speechOsc1 * 0.5 + speechOsc2 * 0.3 + speechOsc3 * 0.2 + 1) * 0.5

        targetMouthOpen = Math.max(0.12, Math.min(0.78, composite * 0.75))
        targetMouthSmile = Math.max(0.05, Math.min(0.25, (speechOsc1 + 1) * 0.15))

        // Subtle jaw bone dip during speech
        if (headBoneRef.current && !prefersReducedMotion) {
          headBoneRef.current.position.y = 0.002 * Math.sin(elapsedTime * 16)
        }
      } else {
        targetMouthOpen = 0
        targetMouthSmile = 0
      }

      // Smooth interpolation for natural lip dynamics
      currentMouthOpen = THREE.MathUtils.lerp(currentMouthOpen, targetMouthOpen, delta * 20)
      currentMouthSmile = THREE.MathUtils.lerp(currentMouthSmile, targetMouthSmile, delta * 15)

      // Apply morph target weights to all head and teeth meshes
      const morphs = morphMeshesRef.current
      for (let i = 0; i < morphs.length; i++) {
        const { mesh, mouthOpenIndex, mouthSmileIndex } = morphs[i]
        if (mesh.morphTargetInfluences) {
          if (mouthOpenIndex !== -1) {
            mesh.morphTargetInfluences[mouthOpenIndex] = currentMouthOpen
          }
          if (mouthSmileIndex !== -1) {
            mesh.morphTargetInfluences[mouthSmileIndex] = currentMouthSmile
          }
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()

      if (sceneRef.current) {
        sceneRef.current.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh
            mesh.geometry?.dispose()
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose())
            } else if (mesh.material) {
              mesh.material.dispose()
            }
          }
        })
      }

      renderer.dispose()
      sceneRef.current = null
      rendererRef.current = null
    }
  }, [viewMode, modelUrl])

  return (
    <div className="relative flex flex-col items-center">
      {/* Stage Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`relative w-48 h-64 sm:w-56 sm:h-76 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-gradient-to-b from-[#141829] via-[#0c0e1a] to-black select-none cursor-grab active:cursor-grabbing ${
          isSpeaking ? 'border-amber-400 animate-speaking-glow' : 'border-amber-500/40 shadow-2xl'
        }`}
      >
        {/* View Mode 1: Real 3D WebGL Canvas */}
        {viewMode === '3d' && !loadError && (
          <canvas
            ref={canvasRef}
            className="w-full h-full block focus:outline-none"
            aria-label="3D Interactive Humanoid Avatar Rig"
          />
        )}

        {/* View Mode 2 or Fallback: Chethan S Verified Illustrated Portrait */}
        {(viewMode === 'portrait' || loadError) && (
          <div className="w-full h-full relative">
            <img
              src={fallbackImageUrl}
              alt={`Verified Portrait of ${characterName}`}
              className="w-full h-full object-cover object-top filter brightness-105 animate-character-breath select-none"
            />
            {loadError && (
              <div className="absolute top-2 inset-x-2 py-1 px-2 bg-black/85 backdrop-blur-sm rounded border border-amber-500/50 flex items-center gap-1.5 text-[10px] font-mono text-amber-300">
                <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                <span>2D FALLBACK (3D MODEL LOAD FAILED)</span>
              </div>
            )}
          </div>
        )}

        {/* Loading Overlay */}
        {loading && viewMode === '3d' && !loadError && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center z-10">
            <Loader2 className="w-7 h-7 text-amber-400 animate-spin mb-2" />
            <span className="font-gta text-xs text-amber-400 tracking-wider font-bold">
              INITIALIZING 3D NEURAL RIG...
            </span>
            <span className="text-[10px] font-mono text-slate-400 mt-1">
              Loading GLB Skeletal Mesh
            </span>
          </div>
        )}

        {/* Real-time Status Badge: SPEAKING ONLY while voice narration is active */}
        {isSpeaking ? (
          <div className="absolute bottom-2.5 inset-x-2.5 py-1 px-2 bg-black/90 backdrop-blur-md rounded border border-amber-400 flex items-center justify-center gap-1.5 shadow-lg z-20 pointer-events-none">
            <span className="w-1.5 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-3 bg-amber-400 rounded-full animate-bounce" />
            <span className="text-[11px] font-mono font-black text-amber-300 tracking-wider ml-1">
              SPEAKING
            </span>
          </div>
        ) : (
          <div className="absolute bottom-2.5 inset-x-2.5 py-1 px-2 bg-black/80 backdrop-blur-sm rounded border border-slate-700/80 flex items-center justify-center gap-1.5 z-20 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-mono text-slate-300 tracking-wider">
              {viewMode === '3d' ? '3D RIG // PROCEDURAL DEMO' : 'CHETHAN S // VERIFIED PORTRAIT'}
            </span>
          </div>
        )}

        {/* 3D Drag cue icon */}
        {viewMode === '3d' && !loading && !loadError && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 border border-slate-700 text-[9px] font-mono text-amber-300 pointer-events-none flex items-center gap-1">
            <Box className="w-2.5 h-2.5 text-amber-400" />
            <span>3D DEMO RIG // DRAG TO ROTATE</span>
          </div>
        )}
      </div>

      {/* 3D vs 2D Toggle Control */}
      <div className="mt-2.5 flex flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            const nextMode = viewMode === '3d' ? 'portrait' : '3d'
            setViewMode(nextMode)
            if (nextMode === '3d') {
              setLoading(true)
              setLoadError(null)
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#131728] hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 text-[11px] font-gta tracking-wider transition-colors cursor-pointer shadow"
        >
          {viewMode === '3d' ? (
            <>
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>RETURN TO VERIFIED PORTRAIT</span>
            </>
          ) : (
            <>
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>VIEW 3D AVATAR RIG (DEMO)</span>
            </>
          )}
        </button>

        {viewMode === '3d' && (
          <p className="text-[10px] font-mono text-slate-500 text-center max-w-[220px] leading-tight">
            *Generic humanoid 3D rig demonstrating WebGL & procedural lip sync. Switch to 2D for verified likeness.
          </p>
        )}
      </div>
    </div>
  )
}
