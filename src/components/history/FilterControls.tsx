import { useState } from 'react'

const timeRanges = ['7D', '30D', '90D'] as const
type TimeRange = (typeof timeRanges)[number]

const symptoms = ['Cough', 'Wheeze', 'Tight Chest'] as const

interface FilterControlsProps {
  range: TimeRange
  onRangeChange: (range: TimeRange) => void
}

export default function FilterControls({ range, onRangeChange }: FilterControlsProps) {
  const [activeSymptoms, setActiveSymptoms] = useState<Set<string>>(new Set())

  const toggleSymptom = (symptom: string) => {
    setActiveSymptoms((prev) => {
      const next = new Set(prev)
      if (next.has(symptom)) next.delete(symptom)
      else next.add(symptom)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {timeRanges.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onRangeChange(r)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              range === r
                ? 'bg-teal-500 text-white'
                : 'bg-white text-gray-600 hover:bg-teal-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            aria-pressed={range === r}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {symptoms.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => toggleSymptom(s)}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              activeSymptoms.has(s)
                ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            aria-pressed={activeSymptoms.has(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">Pollutant</span>
        <select
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          defaultValue="pm25"
        >
          <option value="pm25">PM2.5</option>
          <option value="pm10">PM10</option>
          <option value="o3">Ozone</option>
          <option value="no2">NO₂</option>
        </select>
      </label>
    </div>
  )
}
