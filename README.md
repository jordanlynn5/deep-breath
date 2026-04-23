# Deep Breath — Your Daily Air & Wellbeing Journal

[![CI](https://github.com/jordanlynn5/deep-breath/actions/workflows/ci.yml/badge.svg)](https://github.com/jordanlynn5/deep-breath/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff)](https://vite.dev/)

A Progressive Web App that pairs daily self-reported health check-ins with live local air quality data, using AI to surface personal patterns over time.

**Built for EcoHack 2026.**

---

## What it does

Poor air quality affects how people feel — but most people don't notice the connection. Deep Breath lets you log how you feel each day (energy, mood, sleep, breathing, focus) alongside live AQI data for your location. Over time, an AI surfaces patterns between the two: "On days when AQI exceeded 80, your breathing scores dropped by an average of 1.2 points."

## Features

- **Daily check-in** — five wellbeing dimensions rated 1–5 via tap-to-select buttons, plus symptom logging and a free-text reflection
- **Live air quality** — real-time PM2.5 AQI via OpenAQ v3, geocoded from your city
- **AI insight** — Gemini 2.0 Flash generates a personal observation after each check-in based on your history and today's AQI
- **History heatmap** — 35-day calendar heatmap coloured by wellness score; tap any day to see that check-in's vitals, AQI, city, symptoms, and reflection (travel is reflected automatically)
- **Trend chart** — wellness vs. AQI over 7 / 30 / 90 days
- **Privacy-first** — all data stays in your browser's localStorage; no accounts, no server-side storage
- **PWA** — installable on mobile, works offline for check-ins

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts + custom heatmap |
| AI insights | Gemini 2.0 Flash via Vercel serverless proxy |
| Air quality | OpenAQ v3 API (proxied server-side) |
| Geocoding | Nominatim / OpenStreetMap |
| Testing | Vitest + React Testing Library (124 tests) |
| Hosting | Vercel |

## Getting Started

```bash
npm install
```

Copy `.env.local` and fill in your keys:

```bash
# OpenAQ API key — https://explore.openaq.org/register
OPENAQ_API_KEY=

# Gemini API key — https://aistudio.google.com/apikey
GEMINI_API_KEY=
```

Run the frontend and API together:

```bash
# Terminal 1 — serverless functions (port 3000)
npx vercel dev --listen 3000

# Terminal 2 — Vite frontend (port 5173, proxies /api to 3000)
npm run dev
```

## Available Scripts

```bash
npm run dev        # Local dev server
npm run build      # Production build
npm run test       # Run all tests (Vitest)
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

## Air Quality Coverage

OpenAQ's PM2.5 monitoring network has strong coverage in the US, UK, Germany, Netherlands, India, and South Korea. Coverage in smaller cities and rural areas may be limited. If your city returns "AQI unavailable", try the nearest major city or update your location in Settings.

## Privacy

All check-in data is stored exclusively in your browser's `localStorage`. Nothing is sent to any server except the city name (for AQI lookup) and anonymised check-in summaries (for AI insight generation). No accounts, no tracking.
