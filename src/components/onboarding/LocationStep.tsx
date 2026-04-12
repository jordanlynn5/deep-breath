interface LocationStepProps {
  onAllow: () => void
  onSkip: () => void
}

export default function LocationStep({ onAllow, onSkip }: LocationStepProps) {
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
          Enable Location
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          We'll use your location to find nearby air quality stations and show you relevant data.
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <button
          type="button"
          onClick={onAllow}
          className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
        >
          Allow Location
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full px-8 py-3 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Skip for Now
        </button>
      </div>
    </div>
  )
}
