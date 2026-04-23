
const timeRanges = ['7D', '30D', '90D'] as const
type TimeRange = (typeof timeRanges)[number]

export const SYMPTOMS = ['Cough', 'Wheeze', 'Tight Chest'] as const

interface FilterControlsProps {
  range: TimeRange
  onRangeChange: (range: TimeRange) => void
  activeSymptoms: Set<string>
  onSymptomsChange: (symptoms: Set<string>) => void
}

export default function FilterControls({ range, onRangeChange, activeSymptoms, onSymptomsChange }: FilterControlsProps) {
  const toggleSymptom = (symptom: string) => {
    const next = new Set(activeSymptoms)
    if (next.has(symptom)) next.delete(symptom)
    else next.add(symptom)
    onSymptomsChange(next)
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
        {SYMPTOMS.map((s) => (
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
    </div>
  )
}
