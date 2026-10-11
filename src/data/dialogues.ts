import type { DialogueConfig } from '../types'

export const dialogueData: DialogueConfig = {
  characterName: 'CHETHAN S',
  greetingScript:
    "Hey, I'm Chethan S! I'm pursuing my Bachelor of Engineering in Computer Science and Engineering at Channabasaveshwara Institute of Technology, Gubbi, Karnataka. I'm interested in programming, Linux, cloud technologies, and building useful applications. My current skills include C Programming, Python, DBMS, Linux, Google Cloud, and Vibe Coding. I'm also exploring projects like FALCON AI, TRINETRA-AI, and NOVA AI SUITE. Take a look around my world and explore what I'm learning and building. Your next mission starts here!",
  topics: [
    {
      id: 'who-am-i',
      label: 'WHO AM I?',
      shortTitle: 'Identity & Focus',
      text:
        "I'm Chethan S, an engineering student located in Gubbi, Karnataka. I have a genuine curiosity for how computer systems operate under the hood—from low-level C code to cloud-hosted microservices and AI-assisted workflows. I enjoy hands-on experimentation, debugging real problems, and creating structured software solutions.",
      targetSectionId: 'about',
    },
    {
      id: 'my-skills',
      label: 'MY SKILLS',
      shortTitle: 'Technical Arsenal',
      text:
        "My core technical toolset spans C Programming, Python, DBMS, Linux, Google Cloud, and Vibe Coding. I use C to master algorithmic structure and memory fundamentals; Python for scripting and AI pipelines; DBMS for data persistence; Linux for OS-level control; Google Cloud for cloud foundations; and Vibe Coding to build fast with AI pair programming.",
      targetSectionId: 'skills',
    },
    {
      id: 'my-projects',
      label: 'MY PROJECTS',
      shortTitle: 'Active Missions',
      text:
        "I'm developing and researching three primary project missions: FALCON AI (a concept & prototype for vehicle incident detection and dispatch), TRINETRA-AI (an AI command-center monitoring prototype), and NOVA AI SUITE (a local-first bilingual English/Kannada workspace concept). I make sure to distinguish active prototypes from future planned features.",
      targetSectionId: 'missions',
    },
    {
      id: 'my-education',
      label: 'MY EDUCATION',
      shortTitle: 'Academic Path',
      text:
        "I am pursuing my Bachelor of Engineering (B.E.) in Computer Science and Engineering (CSE) at Channabasaveshwara Institute of Technology (CIT) in Gubbi, Karnataka, India. CIT provides the academic and foundational rigor for my computer science journey.",
      targetSectionId: 'education',
    },
    {
      id: 'my-goals',
      label: 'MY GOALS',
      shortTitle: 'Next Objective',
      text:
        "My goal is straightforward: continue sharpening my software engineering craftsmanship, deepen my grasp of distributed cloud architectures and AI systems, and build practical applications that solve tangible problems for people and communities.",
      targetSectionId: 'about',
    },
  ],
}
