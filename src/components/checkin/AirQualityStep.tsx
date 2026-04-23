import { getProfile } from '@/utils/storage'
import { useAirQuality } from '@/hooks/useAirQuality'
import { aqiLevelToCssVar, AQI_LABELS } from '@/utils/aqi'
import type { AqiSnapshot } from '@/types'

interface AirQualityStepProps {
  onStart: (snapshot: AqiSnapshot | null) => void
}

export default function AirQualityStep({ onStart }: AirQualityStepProps) {
  const city = getProfile()?.city ?? ''
  const { snapshot, loading, error } = useAirQuality(city)

  const colorVar = snapshot ? aqiLevelToCssVar(snapshot.level) : 'var(--color-aqi-good)'
  const aqiNum = snapshot?.aqi ?? '—'
  const label = snapshot ? AQI_LABELS[snapshot.level] : '—'
  const stationLine = city || 'your city'

  const AppHeader = (
    <div className="flex flex-col items-center gap-1">
      <h1 className="text-2xl font-light text-teal-700 dark:text-teal-300">Deep Breath</h1>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        Track how air quality shapes how you feel.
      </p>
    </div>
  )

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        {AppHeader}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Air Quality Index</p>
          <div className="h-36 w-36 animate-pulse rounded-full bg-gray-100 dark:bg-gray-800" />
          <p className="text-sm text-gray-400">
            Fetching air quality for {city || 'your city'}…
          </p>
        </div>
        <button type="button" onClick={() => onStart(null)}
          className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600">
          Start anyway
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      {AppHeader}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Air Quality Index
        </p>
        <div
          className="flex h-36 w-36 items-center justify-center rounded-full"
          style={{
            backgroundColor: `color-mix(in srgb, ${colorVar} 20%, transparent)`,
            boxShadow: `0 0 0 4px color-mix(in srgb, ${colorVar} 30%, transparent)`,
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-5xl font-light" style={{ color: colorVar }}>{aqiNum}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {label}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Today in{' '}
          <span className="font-medium text-gray-700 dark:text-gray-200">{stationLine}</span>
          {error && <span className="ml-2 text-xs text-amber-500">(AQI unavailable)</span>}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-light text-gray-800 dark:text-gray-100">Ready to check in?</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {snapshot
            ? snapshot.aqi <= 50
              ? 'Air quality is looking good today.'
              : snapshot.aqi <= 100
                ? 'Air quality is moderate today.'
                : 'Air quality may affect how you feel today.'
            : error
              ? 'Could not fetch air quality — check in anyway.'
              : 'Check in to track how you feel.'}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onStart(snapshot)}
        className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
      >
        Start Check-in
      </button>
    </div>
  )
}
