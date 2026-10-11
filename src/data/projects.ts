import type { ProjectMission } from '../types'

export const projectMissions: ProjectMission[] = [
  {
    id: 'mission-falcon-ai',
    missionNumber: 'MISSION 01',
    title: 'FALCON AI',
    tagline: 'Vehicle Incident Detection & Emergency Dispatch Concept',
    status: 'Prototype',
    thumbnailImage: '/assets/mission_falcon.jpg',
    overview:
      'A prototype system conceived to identify roadside vehicle incidents, detect abnormal stationary vehicles or collisions via camera feeds, and streamline initial emergency-response workflows.',
    problemStatement:
      'Delayed emergency response during vehicular accidents on highways and arterial roads often leads to preventable trauma. Manual incident reporting causes critical lag in first-responder dispatch.',
    proposedSolution:
      'An automated telemetry and vision analysis dashboard combining computer vision vehicle bounding algorithms with quick triage workflows for emergency personnel.',
    technologiesAndConcepts: [
      'Python',
      'OpenCV (Computer Vision Concept)',
      'YOLO Object Detection (Model Concept)',
      'Flask (API Prototyping)',
      'Incident Mapping Telemetry',
    ],
    verifiedImplementedFeatures: [
      'Architecture design for real-time video stream ingestion',
      'Vehicle bounding box logic research and test frames',
      'Incident alert state machine prototype',
      'Emergency notification payload schema definition',
    ],
    futureImprovements: [
      'Hardware acceleration for edge cameras on rural highway segments',
      'Direct integration with local hospital trauma centers and emergency ambulance networks',
      'Adverse weather and nocturnal visibility enhancement filters',
    ],
    // Repo and Demo URLs are omitted truthfully until officially published
    repoUrl: undefined,
    demoUrl: undefined,
  },
  {
    id: 'mission-trinetra-ai',
    missionNumber: 'MISSION 02',
    title: 'TRINETRA-AI',
    tagline: 'Multi-Perspective AI Command-Center Experience',
    status: 'In Development',
    thumbnailImage: '/assets/mission_trinetra.jpg',
    overview:
      'Named after the concept of the "Three Eyes", TRINETRA-AI is an exploratory command-center platform engineered to fuse multi-channel visual inputs, ambient telemetry, and automated event tracking.',
    problemStatement:
      'Security and operations personnel often face cognitive overload monitoring disjointed video streams and separate sensor telemetry across large environments.',
    proposedSolution:
      'A consolidated tactical dashboard interface that flags anomalous motion events, correlates spatial coordinates, and presents a prioritized situational briefing.',
    technologiesAndConcepts: [
      'Python Backend Core',
      'Multi-Stream Video Processing Architecture',
      'Event Classification Logic',
      'Real-time Dashboard State Management',
      'Tactical HUD Visual Design',
    ],
    verifiedImplementedFeatures: [
      'Multi-panel video matrix layout and mock telemetry feeds',
      'Event priority classification taxonomy (Critical, Warning, Info)',
      'Coordinate-based anomaly logging state model',
    ],
    futureImprovements: [
      'Integration with local neural inference models for offline camera processing',
      'Automated incident report generation with chronological keyframe timestamps',
      'Low-bandwidth edge synchronization for remote surveillance nodes',
    ],
    repoUrl: undefined,
    demoUrl: undefined,
  },
  {
    id: 'mission-nova-ai-suite',
    missionNumber: 'MISSION 03',
    title: 'NOVA AI SUITE',
    tagline: 'Local-First, Bilingual English/Kannada AI Workspace Concept',
    status: 'Concept',
    thumbnailImage: '/assets/mission_nova.jpg',
    overview:
      'An ambitious conceptual productivity workspace designed with a local-first privacy architecture, featuring native bilingual English and Kannada language support, document canvas, and on-device assistance.',
    problemStatement:
      'Most modern AI productivity tools require constant cloud internet connectivity, compromising document privacy, and lack genuine first-class support for regional Indian languages like Kannada.',
    proposedSolution:
      'A desktop and web workspace integrating quantized local language models with markdown canvas editors and localized user interfaces for seamless bilingual writing and analysis.',
    technologiesAndConcepts: [
      'Local-First Data Architecture',
      'Bilingual English / Kannada Localization',
      'Markdown & Canvas Note Graph',
      'Small Language Model (SLM) Inference Concepts',
      'Local Vector Storage',
    ],
    verifiedImplementedFeatures: [
      'Initial UX workflow sketches and bilingual terminology dictionary',
      'Local storage document schema definition',
      'Kannada unicode script rendering testing and typography guidelines',
    ],
    futureImprovements: [
      'Integration with open-weights models (e.g., Gemma, Llama) running via Ollama/WebGPU',
      'Voice transcription supporting conversational Kannada dialects',
      'Interactive visual knowledge graph linking bilingual notes',
    ],
    repoUrl: undefined,
    demoUrl: undefined,
  },
]
