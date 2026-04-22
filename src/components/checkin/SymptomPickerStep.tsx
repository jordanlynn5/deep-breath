import { useState } from 'react'
import TapButton from './TapButton'

const symptoms = ['Cough', 'Wheeze', 'Tight Chest', 'Shortness of Breath'] as const

interface SymptomPickerStepProps {
  onContinue: (selected: string[]) => void
}

export default function SymptomPickerStep({ onContinue }: SymptomPickerStepProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [none, setNone] = useState(false)

  const toggle = (symptom: string) => {
    setNone(false)
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(symptom)) {
        next.delete(symptom)
      } else {
        next.add(symptom)
      }
      return next
    })
  }

  const selectNone = () => {
    setSelected(new Set())
    setNone(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          Which symptoms?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select all that apply.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {symptoms.map((symptom) => (
          <TapButton
            key={symptom}
            selected={selected.has(symptom)}
            onClick={() => toggle(symptom)}
            variant="symptom"
          >
            {symptom}
          </TapButton>
        ))}
      </div>
      <button
        type="button"
        onClick={selectNone}
        className={`mx-auto rounded-full px-6 py-2 text-sm font-medium transition-colors ${
          none
            ? 'bg-teal-500 text-white'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
      >
        None of the above
      </button>
      <div className="mt-auto flex justify-center">
        <button
          type="button"
          onClick={() => onContinue(Array.from(selected))}
          className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
