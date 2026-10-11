import type { DialogueConfig, ConversationChoice } from '../types'

export const conversationChoices: ConversationChoice[] = [
  {
    id: 'intro',
    question: 'Hey, introduce yourself.',
    shortLabel: 'Introduce Yourself',
    response:
      "Hey! I'm Chethan S. I'm a Computer Science and Engineering student at CIT, Gubbi, Karnataka. I love programming, exploring Linux, and building practical applications. Welcome to my Los Santos-themed world!",
    targetSectionId: 'about',
  },
  {
    id: 'skills',
    question: 'What skills do you have?',
    shortLabel: 'My Skills',
    response:
      'My 6 core technical skills are C Programming, Python, DBMS, Linux, Google Cloud, and Vibe Coding. I focus on solid programming fundamentals, OS control, and rapid AI-assisted development.',
    targetSectionId: 'skills',
  },
  {
    id: 'projects',
    question: 'Tell me about your projects.',
    shortLabel: 'All Projects',
    response:
      "I'm developing and researching three primary project concepts: FALCON AI for vehicle incident response, TRINETRA-AI for tactical AI monitoring, and NOVA AI SUITE for local bilingual productivity.",
    targetSectionId: 'missions',
  },
  {
    id: 'falcon-ai',
    question: 'What is FALCON AI?',
    shortLabel: 'FALCON AI',
    response:
      'FALCON AI is my vehicle incident detection and emergency dispatch concept. It uses Python and computer vision prototypes to identify abnormal roadside incidents and accelerate emergency triage.',
    targetSectionId: 'missions',
  },
  {
    id: 'trinetra-ai',
    question: 'What is TRINETRA-AI?',
    shortLabel: 'TRINETRA-AI',
    response:
      'TRINETRA-AI is an exploratory AI command-center project concept. It focuses on situational awareness, fusing multi-stream camera feeds, event tracking, and tactical status monitoring in real time.',
    targetSectionId: 'missions',
  },
  {
    id: 'nova-ai',
    question: 'Tell me about NOVA AI SUITE.',
    shortLabel: 'NOVA AI SUITE',
    response:
      'NOVA AI SUITE is a local-first, privacy-focused workspace concept. It is designed to run open-weights AI models on-device with native bilingual support in English and Kannada.',
    targetSectionId: 'missions',
  },
  {
    id: 'education',
    question: 'What are you studying?',
    shortLabel: 'Education',
    response:
      'I am pursuing my Bachelor of Engineering (B.E.) in Computer Science and Engineering at Channabasaveshwara Institute of Technology (CIT) in Gubbi, Karnataka, India.',
    targetSectionId: 'education',
  },
  {
    id: 'goals',
    question: 'What are your goals?',
    shortLabel: 'Goals',
    response:
      'My goal is to continually sharpen my programming craftsmanship, master distributed cloud and Linux systems, and build software that solves real-world challenges for people and communities.',
    targetSectionId: 'about',
  },
]

export const dialogueData: DialogueConfig = {
  characterName: 'CHETHAN S',
  greetingScript:
    "Hey, I'm Chethan S! Welcome to my Los Santos portfolio. Ask me anything about my studies at CIT Gubbi, my 6 technical skills, or my AI project concepts!",
  topics: [
    {
      id: 'who-am-i',
      label: 'WHO AM I?',
      shortTitle: 'Identity & Focus',
      text:
        "I'm Chethan S, an engineering student in Gubbi, Karnataka. I have a genuine curiosity for how computer systems operate under the hood—from procedural C code to cloud services and AI workflows.",
      targetSectionId: 'about',
    },
    {
      id: 'my-skills',
      label: 'MY SKILLS',
      shortTitle: 'Technical Arsenal',
      text:
        'My core technical skills are C Programming, Python, DBMS, Linux, Google Cloud, and Vibe Coding. I use C for memory fundamentals; Python for scripting and AI; DBMS for data; Linux for OS control; and GCP for cloud foundations.',
      targetSectionId: 'skills',
    },
    {
      id: 'my-projects',
      label: 'MY PROJECTS',
      shortTitle: 'Active Missions',
      text:
        "I'm working on three project concepts: FALCON AI (incident detection prototype), TRINETRA-AI (command center monitor), and NOVA AI SUITE (bilingual English/Kannada workspace).",
      targetSectionId: 'missions',
    },
    {
      id: 'my-education',
      label: 'MY EDUCATION',
      shortTitle: 'Academic Path',
      text:
        'I am pursuing my Bachelor of Engineering (B.E.) in Computer Science and Engineering at Channabasaveshwara Institute of Technology (CIT) in Gubbi, Karnataka, India.',
      targetSectionId: 'education',
    },
    {
      id: 'my-goals',
      label: 'MY GOALS',
      shortTitle: 'Next Objective',
      text:
        'My goal is to continuously improve my software engineering craftsmanship, learn more about cloud architecture, and build practical tools that solve real problems.',
      targetSectionId: 'about',
    },
  ],
  conversationChoices,
  fallbackResponse:
    "I'm Chethan's virtual interactive guide. Right now, I can answer questions about my background, education at CIT Gubbi, my 6 skills (C, Python, DBMS, Linux, Google Cloud, Vibe Coding), my projects (FALCON AI, TRINETRA-AI, NOVA AI SUITE), or my goals. What would you like to know?",
}

/**
 * Lightweight local keyword/intent matching engine for typed user questions.
 * Does not require external APIs or keys. Ready for future backend/LLM expansion.
 */
export function matchUserIntent(input: string): { response: string; targetSectionId?: string } {
  const clean = input.trim().toLowerCase()

  // 1. Identity / Introduction
  if (
    clean.includes('who are you') ||
    clean.includes('introduce') ||
    clean.includes('your name') ||
    clean.includes('who is chethan') ||
    clean.includes('about you') ||
    clean.includes('yourself') ||
    clean === 'hi' ||
    clean === 'hello' ||
    clean === 'hey'
  ) {
    return {
      response:
        "Hey there! I'm Chethan S. I'm pursuing my B.E. in Computer Science and Engineering at CIT, Gubbi, Karnataka. I build software, experiment with Linux and cloud setups, and explore AI prototypes.",
      targetSectionId: 'about',
    }
  }

  // 2. Specific Projects
  if (clean.includes('falcon')) {
    return {
      response:
        'FALCON AI is my vehicle incident detection and emergency-response dashboard prototype. It explores using Python and computer vision logic to detect stalled vehicles or accidents and streamline emergency dispatch.',
      targetSectionId: 'missions',
    }
  }

  if (clean.includes('trinetra')) {
    return {
      response:
        'TRINETRA-AI is an exploratory AI command-center project concept. Inspired by the "Three Eyes", it aims to aggregate multi-angle camera feeds, telemetry, and automated event tracking into a unified situational interface.',
      targetSectionId: 'missions',
    }
  }

  if (clean.includes('nova') || clean.includes('kannada') || clean.includes('bilingual')) {
    return {
      response:
        'NOVA AI SUITE is a local-first, privacy-focused productivity workspace concept. It features native bilingual support in both English and Kannada, allowing offline document workflows and local model assistance.',
      targetSectionId: 'missions',
    }
  }

  if (clean.includes('project') || clean.includes('work') || clean.includes('portfolio') || clean.includes('build')) {
    return {
      response:
        "I'm developing and researching three primary project concepts: FALCON AI (incident detection & dispatch), TRINETRA-AI (command center analytics), and NOVA AI SUITE (local bilingual workspace). You can inspect each in the Missions section!",
      targetSectionId: 'missions',
    }
  }

  // 3. Education / CIT / College
  if (
    clean.includes('stud') ||
    clean.includes('college') ||
    clean.includes('cit') ||
    clean.includes('degree') ||
    clean.includes('education') ||
    clean.includes('gubbi') ||
    clean.includes('university') ||
    clean.includes('cse') ||
    clean.includes('engineering')
  ) {
    return {
      response:
        'I am pursuing my Bachelor of Engineering (B.E.) in Computer Science and Engineering (CSE) at Channabasaveshwara Institute of Technology (CIT) in Gubbi, Karnataka, India.',
      targetSectionId: 'education',
    }
  }

  // 4. Specific Skills
  if (clean.includes('c program') || clean === 'c' || clean.includes(' c ') || clean.includes('c lang')) {
    return {
      response:
        'I use C Programming for understanding low-level computing fundamentals, memory pointers, data structures, and algorithmic efficiency.',
      targetSectionId: 'skills',
    }
  }

  if (clean.includes('python')) {
    return {
      response:
        'Python is my go-to language for rapid prototyping, data scripting, computer vision exploration (like in FALCON AI), and AI experiments.',
      targetSectionId: 'skills',
    }
  }

  if (clean.includes('dbms') || clean.includes('database') || clean.includes('sql')) {
    return {
      response:
        'DBMS covers relational schema design, SQL query optimization, normalization, indexing, and ACID transaction safety.',
      targetSectionId: 'skills',
    }
  }

  if (clean.includes('linux') || clean.includes('bash') || clean.includes('terminal')) {
    return {
      response:
        'Linux is my preferred environment for command-line mastery, process inspection, bash scripting, and understanding operating system internals.',
      targetSectionId: 'skills',
    }
  }

  if (clean.includes('cloud') || clean.includes('gcp') || clean.includes('google cloud')) {
    return {
      response:
        'I explore Google Cloud for cloud computing fundamentals, compute engine instances, storage buckets, and scalable hosting basics.',
      targetSectionId: 'skills',
    }
  }

  if (clean.includes('vibe') || clean.includes('prompt')) {
    return {
      response:
        'Vibe Coding is my approach to modern AI-augmented development—pairing iteratively with LLMs and prompt engineering to build and validate software prototypes rapidly.',
      targetSectionId: 'skills',
    }
  }

  if (clean.includes('skill') || clean.includes('stack') || clean.includes('technolog') || clean.includes('tools')) {
    return {
      response:
        'My 6 current technical skills are C Programming, Python, DBMS, Linux, Google Cloud, and Vibe Coding. Check out the Skills section to view them in their custom Los Santos environments!',
      targetSectionId: 'skills',
    }
  }

  // 5. Goals / Future
  if (clean.includes('goal') || clean.includes('future') || clean.includes('ambition') || clean.includes('career') || clean.includes('plan')) {
    return {
      response:
        'My goal is to continually sharpen my programming craftsmanship, deepen my knowledge in cloud architecture and AI systems, and build software that delivers real value.',
      targetSectionId: 'about',
    }
  }

  // 6. Contact / Location
  if (clean.includes('where') || clean.includes('location') || clean.includes('live')) {
    return {
      response:
        "I'm based in Gubbi, Karnataka, India, where I attend Channabasaveshwara Institute of Technology (CIT).",
      targetSectionId: 'contact',
    }
  }

  if (clean.includes('contact') || clean.includes('email') || clean.includes('reach') || clean.includes('hire')) {
    return {
      response:
        'You can check out the Contact section below for communication details and updates.',
      targetSectionId: 'contact',
    }
  }

  // Fallback response
  return {
    response: dialogueData.fallbackResponse,
  }
}
