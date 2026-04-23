import type { VercelRequest, VercelResponse } from '@vercel/node'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')

const SYSTEM_PROMPT = `You are a calm, supportive daily wellness companion for Deep Breath, a health journal app that pairs daily check-ins with air quality data.

The user rates their energy, mood, sleep, breathing, and focus on a 1–5 scale each day. They also log respiratory symptoms and optional free-text reflections. Air quality is measured as US AQI.

Your task: read the provided check-in history and today's data, then surface ONE meaningful pattern or observation in 2–3 warm, specific sentences.

Rules:
- Never diagnose or give medical advice
- Be concrete — reference specific vitals or AQI values if relevant
- If this is the user's first check-in, welcome them warmly and set expectations
- Keep it under 60 words
- Plain text only, no markdown, no lists`

interface CheckInSummary {
  date: string
  vitals: Record<string, number>
  symptoms: string[]
  aqi: number | null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { history, today } = req.body as {
      history: CheckInSummary[]
      today: CheckInSummary
    }

    const userPrompt = history.length > 0
      ? `Recent check-in history (${history.length} days):\n${JSON.stringify(history, null, 2)}\n\nToday's check-in:\n${JSON.stringify(today, null, 2)}`
      : `This is the user's first check-in.\n\nToday's check-in:\n${JSON.stringify(today, null, 2)}`

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const result = await model.generateContent(userPrompt)
    const insight = result.response.text().trim()

    return res.status(200).json({ insight })
  } catch (err) {
    console.error('Insights error:', err)
    return res.status(500).json({ error: 'Failed to generate insight' })
  }
}
