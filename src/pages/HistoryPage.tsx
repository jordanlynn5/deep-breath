import FilterControls from '@/components/history/FilterControls'
import HeatmapPlaceholder from '@/components/history/HeatmapPlaceholder'
import ChartPlaceholder from '@/components/history/ChartPlaceholder'

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-light text-gray-800 dark:text-gray-100">History</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your patterns over time.
        </p>
      </div>

      <FilterControls />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Daily Heatmap
        </h2>
        <div className="rounded-2xl bg-white p-4 dark:bg-gray-800">
          <HeatmapPlaceholder />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Wellness vs. Air Quality
        </h2>
        <div className="rounded-2xl bg-white p-4 dark:bg-gray-800">
          <ChartPlaceholder />
        </div>
      </section>
    </div>
  )
}
