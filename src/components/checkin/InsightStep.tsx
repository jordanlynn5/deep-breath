import { getStreak } from '@/utils/storage'
import type { AqiSnapshot } from '@/types'

interface InsightStepProps {
  onDone: () => void
  aqi: AqiSnapshot | null
}

// Score 1–5 → color. 0 = no entry (gray).
function scoreColor(score: number): string {
  if (score === 0) return '#e5e7eb'
  if (score === 1) return '#ef4444'
  if (score === 2) return '#f97316'
  if (score === 3) return '#f59e0b'
  if (score === 4) return '#5eead4'
  return '#0d9488'
}

// Placeholder data: varied scores to show the full color range
const PLACEHOLDER_SCORES = [
  0, 4, 3, 5, 5, 2, 0,
  5, 4, 0, 4, 3, 5, 4,
  3, 2, 4, 0, 4, 5, 3,
  1, 3, 5, 4, 0, 4, 5,
  4, 5, 2, 4, 5, 4, 5,
]

export default function InsightStep({ onDone }: InsightStepProps) {
  const streak = getStreak()

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-4xl">🌱</span>
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          Nice work
        </h2>
      </div>

      <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm dark:border-teal-900/40 dark:bg-gray-800">
        <p className="text-xs font-medium uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Today's Insight
        </p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Your energy tends to rise when the air quality index stays below 50.
          Keep breathing easy.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-white p-4 dark:bg-gray-800">
        <span className="text-2xl">🔥</span>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {streak > 0 ? `${streak} day streak` : 'First check-in!'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {streak > 0 ? 'Keep it going!' : 'Welcome to Deep Breath.'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Last 5 weeks
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: '#ef4444' }} /> Low
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: '#0d9488' }} /> High
            </span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {PLACEHOLDER_SCORES.map((score, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{ backgroundColor: scoreColor(score) }}
              title={score === 0 ? 'No entry' : `Score: ${score}/5`}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto flex justify-center">
        <button
          type="button"
          onClick={onDone}
          className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
        >
          Done
        </button>
      </div>
    </div>
  )
}
