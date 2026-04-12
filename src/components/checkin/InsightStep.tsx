interface InsightStepProps {
  onDone: () => void
}

export default function InsightStep({ onDone }: InsightStepProps) {
  // Placeholder heatmap: 7 cols x 5 rows
  const heatmapDays = Array.from({ length: 35 }, (_, i) => {
    const intensity = [0, 0.2, 0.4, 0.6, 0.8][i % 5] ?? 0
    return { key: i, intensity }
  })

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-4xl">🌱</span>
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          Nice work
        </h2>
      </div>

      <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm dark:border-teal-900/40 dark:bg-gray-800">
        <p className="text-xs font-medium uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Today's Insight
        </p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Your energy tends to rise when the air quality index stays below 50.
          Keep breathing easy.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-white p-4 dark:bg-gray-800">
        <span className="text-2xl">🔥</span>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            3 day streak
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Keep it going!
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Last 5 weeks
        </p>
        <div className="grid grid-cols-7 gap-1">
          {heatmapDays.map(({ key, intensity }) => (
            <div
              key={key}
              className="aspect-square rounded-sm"
              style={{
                backgroundColor:
                  intensity === 0 ? 'var(--color-gray-200, #e5e7eb)' : `rgba(20, 184, 166, ${intensity})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto flex justify-center">
        <button
          type="button"
          onClick={onDone}
          className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
        >
          Done
        </button>
      </div>
    </div>
  )
}
