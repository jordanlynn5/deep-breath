interface AirQualityStepProps {
  onStart: () => void
}

export default function AirQualityStep({ onStart }: AirQualityStepProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[var(--color-aqi-good)]/20 ring-4 ring-[var(--color-aqi-good)]/30">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-light text-[var(--color-aqi-good)]">42</span>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Good
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Oakland — Laney College
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-light text-gray-800 dark:text-gray-100">
          Ready to check in?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Air quality is looking good today.
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
      >
        Start Check-in
      </button>
    </div>
  )
}
