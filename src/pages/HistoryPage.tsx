import { useState } from 'react'
import { getCheckIns } from '@/utils/storage'
import FilterControls from '@/components/history/FilterControls'
import HeatmapPlaceholder from '@/components/history/HeatmapPlaceholder'
import ChartPlaceholder from '@/components/history/ChartPlaceholder'

const RANGE_DAYS = { '7D': 7, '30D': 30, '90D': 90 }

export default function HistoryPage() {
  const [range, setRange] = useState<'7D' | '30D' | '90D'>('30D')
  const [activeSymptoms, setActiveSymptoms] = useState<Set<string>>(new Set())
  const allCheckins = getCheckIns()
  const cutoff = Date.now() - RANGE_DAYS[range] * 24 * 60 * 60 * 1000
  const filtered = allCheckins.filter((c) => c.timestamp >= cutoff)
  const chartCheckins = activeSymptoms.size > 0
    ? filtered.filter((c) => c.symptoms.some((s) => activeSymptoms.has(s)))
    : filtered

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-light text-gray-800 dark:text-gray-100">History</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your patterns over time.
        </p>
      </div>

      <FilterControls
        range={range}
        onRangeChange={setRange}
        activeSymptoms={activeSymptoms}
        onSymptomsChange={setActiveSymptoms}
      />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Daily Heatmap
        </h2>
        <div className="rounded-2xl bg-white p-4 dark:bg-gray-800">
          <HeatmapPlaceholder checkins={filtered} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Wellness vs. Air Quality
        </h2>
        <div className="rounded-2xl bg-white p-4 dark:bg-gray-800">
          <ChartPlaceholder checkins={chartCheckins} />
        </div>
      </section>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-gray-400">
          No check-ins in this period yet. Complete your first one!
        </p>
      )}
    </div>
  )
}
