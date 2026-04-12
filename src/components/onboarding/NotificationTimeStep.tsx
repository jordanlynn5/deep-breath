import { useState } from 'react'

const timeOptions = ['8:00 AM', '12:00 PM', '6:00 PM', '9:00 PM'] as const

interface NotificationTimeStepProps {
  onContinue: (time: string) => void
}

export default function NotificationTimeStep({ onContinue }: NotificationTimeStepProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-teal-600 dark:text-teal-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          Reminder Time
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          When would you like your daily check-in reminder?
        </p>
      </div>
      <div className="grid w-full max-w-xs grid-cols-2 gap-3">
        {timeOptions.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => setSelected(time)}
            className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              selected === time
                ? 'bg-teal-500 text-white'
                : 'bg-white text-gray-700 hover:bg-teal-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {time}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onContinue(selected ?? '9:00 PM')}
        className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
      >
        Continue
      </button>
    </div>
  )
}
