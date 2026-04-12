// 7 columns × 5 rows = 35 days
const intensities = Array.from({ length: 35 }, (_, i) => {
  const cycle = [0, 0.15, 0.3, 0.5, 0.7, 0.9, 0.4]
  return cycle[i % cycle.length] ?? 0
})

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function HeatmapPlaceholder() {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="flex flex-col justify-between pt-1 text-[10px] text-gray-400">
          {dayLabels.map((label, i) => (
            <span key={`${label}-${i}`}>{label}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {intensities.map((intensity, i) => (
            <div
              key={i}
              className="aspect-square rounded"
              style={{
                backgroundColor:
                  intensity === 0
                    ? 'rgba(148, 163, 184, 0.15)'
                    : `rgba(20, 184, 166, ${0.2 + intensity * 0.8})`,
              }}
              aria-label={`Day ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-1.5 text-[10px] text-gray-400">
        <span>Less</span>
        {[0.2, 0.4, 0.6, 0.8, 1].map((intensity) => (
          <div
            key={intensity}
            className="h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: `rgba(20, 184, 166, ${intensity})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
