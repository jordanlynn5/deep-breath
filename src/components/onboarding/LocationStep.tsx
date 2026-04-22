import { useState } from 'react'

interface LocationStepProps {
  city: string
  onCityChange: (city: string) => void
  onContinue: () => void
}

export default function LocationStep({ city, onCityChange, onContinue }: LocationStepProps) {
  const [touched, setTouched] = useState(false)
  const isValid = city.trim().length > 1

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-teal-600 dark:text-teal-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          Where are you based?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          We'll find air quality data for your city.
        </p>
      </div>
      <div className="w-full max-w-xs">
        <input
          type="text"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="e.g. Oakland, CA"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-center text-gray-800 outline-none transition-colors focus:border-teal-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
        {touched && !isValid && (
          <p className="mt-2 text-xs text-red-400">Please enter your city.</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setTouched(true)
          if (isValid) onContinue()
        }}
        className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600 disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  )
}
