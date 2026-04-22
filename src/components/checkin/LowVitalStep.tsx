import { useState } from 'react'
import type { VitalName } from '@/types'

const LOW_VITAL_OPTIONS: Record<VitalName, string[]> = {
  energy: ['Poor sleep', 'Stress', 'Illness', 'Not enough food', 'Air quality effects'],
  mood: ['Stress or anxiety', 'Feeling unwell', 'Work pressure', 'Weather', 'Air quality effects'],
  sleep: ['Went to bed late', 'Couldn\'t fall asleep', 'Woke during the night', 'Noise', 'Air quality'],
  breathing: ['Tightness in chest', 'Coughing', 'Shortness of breath', 'Congestion', 'Allergies'],
  focus: ['Distracted environment', 'Tiredness', 'Stress', 'Brain fog', 'Poor sleep'],
}

const VITAL_QUESTIONS: Record<VitalName, string> = {
  energy: 'What\'s draining your energy?',
  mood: 'What\'s affecting your mood?',
  sleep: 'How was your sleep disrupted?',
  breathing: 'What breathing issues are you noticing?',
  focus: 'What\'s affecting your focus?',
}

interface LowVitalStepProps {
  lowVitals: VitalName[]
  onContinue: (tags: string[]) => void
}

export default function LowVitalStep({ lowVitals, onContinue }: LowVitalStepProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const primaryVital = lowVitals[0]

  const toggle = (option: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  const options = LOW_VITAL_OPTIONS[primaryVital] ?? []
  const otherLowVitals = lowVitals.slice(1)

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-teal-600 dark:text-teal-400">
          A bit more detail
        </p>
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          {VITAL_QUESTIONS[primaryVital]}
        </h2>
        {otherLowVitals.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            (You also rated {otherLowVitals.join(', ')} low — we'll note that too.)
          </p>
        )}
        <p className="text-sm text-gray-400 dark:text-gray-500">Select all that apply.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              selected.has(option)
                ? 'border-teal-500 bg-teal-500 text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-teal-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onContinue(Array.from(selected))}
        className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
      >
        Continue
      </button>
    </div>
  )
}
