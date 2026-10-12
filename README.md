# Chethan S — Cinematic AI Talking Portfolio | Los Santos Edition

A high-impact, cinematic open-world developer portfolio for **Chethan S**, pursuing a Bachelor of Engineering (B.E.) in Computer Science and Engineering (CSE) at Channabasaveshwara Institute of Technology (CIT), Gubbi, Karnataka, India.

Inspired by original cinematic game aesthetic references with dramatic red typography, futuristic glowing technology spaces, three project mission environments, and an open-ended conversational AI character deployed 24/7 on Vercel.

---

## 1. Production Architecture Overview

The portfolio is architected for 24/7 public availability over the internet without requiring any personal laptop or local server to remain running:

```
Visitor's Web Browser
       │
       ▼
React 19 + Vite Static Frontend (Hosted on Vercel Global CDN)
       │
       ▼ (POST /api/chat)
Secure Vercel Serverless Function (`api/chat.ts`)
       │
       ├── Rate Limiting & Input Validation (Max 800 chars, 15 req/min/IP)
       ├── Injects Chethan S Verified Persona & Guardrails
       ├── Reads Server-Side `OPENROUTER_API_KEY` (Never exposed to client)
       │
       ▼
OpenRouter API (`https://openrouter.ai/api/v1/chat/completions`)
       │
       ▼ (Model: meta-llama/llama-3.3-70b-instruct or configured ID)
Language Model Response
       │
       ▼
Frontend Chat Transcript + Captions
       ├── Browser SpeechSynthesis Audio Output (Natural male voice preference)
       ├── WebGL / 2D Portrait Audio-Reactive Animation
       └── Fallback: Local Verified Intent Engine (Active if key missing/offline)
```

### Security & Privacy Guarantees
- **Zero Frontend Secrets**: API keys are never stored in client-side code, `VITE_` variables, JavaScript bundles, or Git repositories.
- **Serverless Execution**: Runs entirely in the cloud via Vercel Functions.
- **Abuse Prevention**: IP-based rate limiting, input length caps (800 chars), conversation history boundaries (last 8 messages), and strict request timeouts (20 seconds).
- **Zero Hallucination Policy**: Strict system prompts instruct the AI to distinguish verified personal details (CIT Gubbi, 6 skills, 3 projects) from general questions. It will never fabricate graduation dates, grades, awards, or personal contact info.

---

## 2. Seven Cinematic Scenes (Reference-Aligned)

1. **Scene 1: Cinematic Opening & Master Title**
   - Controlled dark entrance with Chethan S's approved character visual.
   - High-impact bold red typography: **CHETHAN S** behind the character.
   - Secondary title: `••• WELCOME TO MY WORLD •••`.
   - Badges: `• LEGEND •`, `• CIT CSE •`, and dot matrix accents.
   - Immediate "ENTER WORLD" and "SKIP INTRO" interactions.

2. **Scene 2: Formal Education**
   - Degree: Bachelor of Engineering (B.E.) in Computer Science and Engineering (CSE).
   - Institution: Channabasaveshwara Institute of Technology (CIT), Gubbi, Karnataka, India.
   - Verified academic curriculum in real, readable website text.

3. **Scene 3: Skills Environment**
   - Futuristic technology space with a glowing 3D perspective floor grid.
   - Character standing on a glowing central pedestal.
   - 6 verified technical skills:
     1. C Programming
     2. Python
     3. Database Management Systems (DBMS)
     4. Linux
     5. Google Cloud
     6. Vibe Coding
   - Interactive holographic spotlight with verified focus areas and dynamic world backdrop shifting.

4. **Scene 4: Journey Timeline**
   - Five verified chronological milestone labels:
     - Education
     - Programming Foundations
     - Linux and Cloud Learning
     - AI Project Concepts
     - Current Development Journey
   - Zero invented dates or fabricated claims.

5. **Scene 5: Project Gallery**
   - Three distinct project environments with large tactical display screens and full detail briefing dossiers:
     - **FALCON AI**: Vehicle incident detection & emergency response concept (Python, Flask, YOLO, OpenCV).
     - **TRINETRA-AI**: Multi-perspective AI command-center monitoring concept.
     - **NOVA AI SUITE**: Local-first bilingual English/Kannada AI workspace concept.

6. **Scene 6: Open-Ended AI Talking Character**
   - Connects live to `/api/chat` via OpenRouter.
   - Supports natural open-ended questions, technical queries, code examples, and session follow-ups.
   - Optional microphone voice input with browser `SpeechRecognition` (text chat works 100% independently).
   - Natural male voice speech output with play, pause, replay, stop, mute, and voice selection.
   - Instant local fallback to verified knowledge base if the API key is not configured or the network is offline.

7. **Scene 7: Closing Scene**
   - Original cinematic closing environment with Chethan S character visual, city skyline backdrop, dramatic red lighting, and sports-car-inspired sleek aesthetic.
   - Displays:
     - **CHETHAN S**
     - *"Building Ideas. Exploring AI. Creating the Future."*
   - Transmission channels and verified contact placeholders.

---

## 3. Environment Variables Configuration

Create a `.env.local` file for local development or configure these in the Vercel Dashboard for production:

```env
# Required for live OpenRouter AI conversation:
OPENROUTER_API_KEY=sk-or-v1-your-real-openrouter-key-here

# Optional: Preferred OpenRouter Model (defaults to llama-3.3-70b-instruct:free if unset):
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free
```

> **IMPORTANT**:
> - Never prefix these with `VITE_`.
> - Never commit `.env` or `.env.local` to Git. (They are strictly ignored in `.gitignore`).

---

## 4. Step-by-Step Vercel Production Deployment Guide

Your portfolio is hosted on GitHub and deployed on Vercel at project `chethan-gta-portfolio-to6g`.

### Step 1: Push Changes to GitHub
Pushing to the `main` branch automatically triggers a deployment in Vercel:
```bash
git push origin main
```

### Step 2: Configure Environment Variables in Vercel
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Select your project: **chethan-gta-portfolio-to6g**.
3. Navigate to **Settings** (top navigation) → **Environment Variables** (left sidebar).
4. Add the following variables:
   - **Key**: `OPENROUTER_API_KEY`
   - **Value**: Your OpenRouter API key (starts with `sk-or-v1-...`)
   - **Environments**: Check `Production`, `Preview`, and `Development`.
   - Click **Save**.
5. (Optional) Add a custom model:
   - **Key**: `OPENROUTER_MODEL`
   - **Value**: `meta-llama/llama-3.3-70b-instruct:free` (or any model from your OpenRouter dashboard)
   - Click **Save**.

### Step 3: Redeploy on Vercel
Environment variable changes apply to **new** deployments:
1. In the Vercel dashboard, go to the **Deployments** tab.
2. Click the `...` (three dots) menu next to the latest deployment.
3. Select **Redeploy**.
4. Confirm **Redeploy** (ensure "Use existing Build Cache" is unchecked if you want a clean build).
5. Once complete, your public portfolio URL will be live with active AI conversation!

---

## 5. Local Development & Verification

### Install Dependencies
```bash
npm install
```

### Run Linter
```bash
npm run lint
```
*(Runs Oxlint: 0 warnings, 0 errors)*

### Run Production Build
```bash
npm run build
```
*(Runs TypeScript strict check + Vite bundle)*

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173). The local dev server automatically routes `/api/chat` using Vite middleware and loads keys from `.env.local`.

---

## 6. Testing & Quality Verification Checklist

| Test Item | Expected Result | Verified Status |
| :--- | :--- | :--- |
| **Lint Check** | `npm run lint` completes with 0 errors | Passed |
| **Build Check** | `tsc -b && vite build` completes with 0 errors | Passed |
| **Missing API Key** | `/api/chat` returns HTTP 503 structured fallback; UI seamlessly falls back to verified knowledge engine | Passed |
| **Empty Message** | `/api/chat` rejects empty input with HTTP 400 `EMPTY_MESSAGE` | Passed |
| **Long Message** | `/api/chat` rejects messages > 800 characters with HTTP 400 `MESSAGE_TOO_LONG` | Passed |
| **Rate Limiting** | Bursts exceeding 15 req/min from the same IP receive HTTP 429 `RATE_LIMIT_EXCEEDED` | Passed |
| **Secret Leak Check** | Client bundles in `dist/assets/` contain zero API keys or secrets | Passed |
| **Voice Output** | SpeechSynthesis reads response aloud using preferred natural male voice | Passed |
| **Optional Mic** | Microphone only requests permission on click; recognized text appears for review; text chat works 100% without mic | Passed |
| **Lip-Sync Fallback** | WebGL avatar jaw movement responds to audio; 2D portrait shows active speaking glow; limitations documented honestly | Passed |
| **All 6 Skills & 3 Projects** | Accurate facts matching Chethan S verified details | Passed |

---

## 7. License & Attribution

- Built by **Chethan S** (CIT Gubbi, CSE).
- Aesthetic design inspired by GTA V / Los Santos open-world cinematic style.
- No official Rockstar Games logos, proprietary automotive trademarks, or copyrighted game code are used.
