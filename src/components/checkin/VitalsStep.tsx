import { useState } from 'react'
import TapButton from './TapButton'
import type { VitalName } from '@/types'

const vitalPrompts: Record<VitalName, string> = {
  energy: 'How is your energy?',
  mood: 'How is your mood?',
  sleep: 'How did you sleep?',
  breathing: 'How is your breathing?',
  focus: 'How is your focus?',
}

const vitalOrder: VitalName[] = ['energy', 'mood', 'sleep', 'breathing', 'focus']

interface VitalsStepProps {
  onComplete: (ratings: Record<VitalName, number>) => void
}

export default function VitalsStep({ onComplete }: VitalsStepProps) {
  const [vitalIndex, setVitalIndex] = useState(0)
  const [ratings, setRatings] = useState<Partial<Record<VitalName, number>>>({})

  const currentVital = vitalOrder[vitalIndex]

  const handleSelect = (rating: number) => {
    const nextRatings = { ...ratings, [currentVital]: rating }
    setRatings(nextRatings)
    if (vitalIndex < vitalOrder.length - 1) {
      setVitalIndex(vitalIndex + 1)
    } else {
      onComplete(nextRatings as Record<VitalName, number>)
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-teal-600 dark:text-teal-400">
          {vitalIndex + 1} of {vitalOrder.length}
        </p>
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          {vitalPrompts[currentVital]}
        </h2>
      </div>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((rating) => (
          <TapButton
            key={rating}
            selected={ratings[currentVital] === rating}
            onClick={() => handleSelect(rating)}
            ariaLabel={`Rating ${rating} of 5`}
          >
            {rating}
          </TapButton>
        ))}
      </div>
      <div className="flex gap-3 text-xs text-gray-400">
        <span className="flex-1 text-left">Low</span>
        <span className="flex-1 text-right">High</span>
      </div>
    </div>
  )
}
