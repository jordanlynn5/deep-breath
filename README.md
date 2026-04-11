# Deep Breath — Your Daily Air & Wellbeing Journal

[![CI](https://github.com/jordanlynn5/deep-breath/actions/workflows/ci.yml/badge.svg)](https://github.com/jordanlynn5/deep-breath/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff)](https://vite.dev/)

A Progressive Web App that pairs daily self-reported health check-ins with live local air quality data, using AI to surface personal patterns over time. Built for EcoHack 2026.

---

## Features

- Daily health check-ins across 5 wellbeing dimensions (1-5 tap scale)
- Real-time local air quality data via OpenAQ
- AI-powered pattern insights via Claude Haiku
- Calendar heatmap and trend visualisations
- Dark mode support
- Push notification reminders
- Privacy-first: all data stored locally in the browser

## Getting Started

```bash
npm install
npm run dev
```

## Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts + Cal-Heatmap
- **AI:** Claude Haiku 4.5 via Vercel serverless proxy
- **Air Quality:** OpenAQ v3 API
- **Testing:** Vitest + React Testing Library
- **Hosting:** Vercel
