# Content Opportunity Engine (MVP)

> **Data-Driven Content Research & Strategic Script Studio**  
> Researches what is already working in Portugal (pt-PT), Brazil (pt-BR), and Spain (es-ES), analyzes competitor outliers, detects content gaps, and translates research into 15–20 ranked ideas and 3 production-ready script variations.

---

## ⚡ Core Workflow Pipeline

```
USER INPUT
   ↓
RESEARCH (Live Web & Video Search)
   ↓
10–20 COMPETITORS / VIDEOS (Real verified URLs & channel data)
   ↓
OUTLIER ANALYSIS (Formats, hook patterns, high velocity topics, emotional triggers)
   ↓
CONTENT GAPS (Unanswered questions, oversaturated tropes, local market nuances)
   ↓
15–20 RANKED CONTENT IDEAS (Opportunity Score 0–100, strategic thesis, format)
   ↓
BEST OPPORTUNITY (Spotlight #1 recommendation)
   ↓
3 SCRIPT VARIATIONS (Contrarian / Story-Driven / Actionable Blueprint)
   ↓
TITLES / HOOKS / CTAs (5+ CTR titles, first-3s visual/audio hooks, platform-native CTAs)
   ↓
SOURCES & EXPORT (Verified citations, one-click copy, Markdown dossier & JSON export)
```

---

## 🎯 Target Markets & Platforms

### Target Markets:
- 🇵🇹 **Portugal (pt-PT)**: European Portuguese vocabulary (*ecrã*, *telemóvel*, *faturas*), IRS tax regulations, Euribor and local Portuguese banking nuances (ActivoBank, CGD, Millennium).
- 🇧🇷 **Brazil (pt-BR)**: Brazilian Portuguese phrasing (*celular*, *tela*, *grana*), Selic, Pix, daily real interest rates, and high-energy mobile hooks.
- 🇪🇸 **Spain (es-ES)**: Peninsular Spanish (*móvil*, *Hacienda*, *autónomos*, *IRPF*), regional tax deductions, and European regulatory compliance.

### Target Platforms:
- 🔴 **YouTube** (Long-form 10–18 min deep dives, screen walkthroughs, chapter resets)
- ⚡ **YouTube Shorts** (Vertical 9:16, 30–60s fast pacing, dynamic captions, loop endings)
- 🎵 **TikTok** (Vertical 9:16, 35–50s, lo-fi authenticity, pattern interrupts, comment bait)
- 📸 **Instagram Reels** (Vertical 9:16, 40–55s, save-oriented, DM keyword automation like "GUIA")

---

## 🚀 Key Features

1. **Never Invented Data**: Strict integrity design. Every source includes real verified links and clearly separates **Observed Facts** from **AI Analytical Deductions**.
2. **Zero-Cost / Low-Cost Search Engine**:
   - Out of the box: uses built-in live web and platform search scrapers (DuckDuckGo Lite & platform scrapers) with zero API keys required.
   - Enhanced mode: supports Google Gemini with **Google Search Grounding** (`tools: [{ googleSearch: {} }]`) via `GEMINI_API_KEY`.
3. **24-Hour Intelligent Cache**: Caches research queries to minimize latency and API costs.
4. **Project Management**: Saves all past analyses locally and in backend storage. Browse, reload, or delete past research projects.
5. **One-Click Export**:
   - Copy Full Technical Script (cues, timestamps, audio, speech)
   - Copy Spoken Words Only (ready for teleprompters)
   - Download Markdown Dossier (`.md`)
   - Download Raw Data (`.json`)

---

## 🛠️ Stack & Deployment

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, Cheerio, `@google/genai` SDK
- **Serverless**: Pre-configured Netlify function in `netlify/functions/api.ts` with `netlify.toml`
- **Port**: `3001` (Backend/Unified), `3000` (Vite dev proxy)

---

## 💻 Local Development

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env`:
\`\`\`bash
cp .env.example .env
\`\`\`
*Note: If `GEMINI_API_KEY` is left blank, the app will run seamlessly in zero-cost live scraper mode.*

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`
This concurrently starts:
- Frontend on: `http://localhost:3000`
- Backend API on: `http://localhost:3001`

### 4. Production Build & Run
\`\`\`bash
npm run build
npm start
\`\`\`
Serves the unified full-stack application on `http://localhost:3001`.

---

## 🌐 Deploy to GitHub + Netlify

1. Push this repository to GitHub:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit of Content Opportunity Engine MVP"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   \`\`\`

2. Connect to Netlify:
   - Go to [app.netlify.com](https://app.netlify.com/)
   - Click **Add new site** > **Import an existing project** > **GitHub**
   - Netlify will auto-detect settings from `netlify.toml`:
     - **Build command**: `npm run build:frontend`
     - **Publish directory**: `dist`
     - **Functions directory**: `netlify/functions`
   - In Netlify **Site configuration > Environment variables**, add:
     - `GEMINI_API_KEY` (optional)
   - Click **Deploy Site**!
