import type { CheckIn } from '@/types'

interface Props {
  checkins: CheckIn[]
}

function wellnessScore(c: CheckIn): number {
  const vals = Object.values(c.vitals)
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

function scoreToColor(score: number): string {
  if (score >= 4.5) return '#0d9488'
  if (score >= 3.5) return '#5eead4'
  if (score >= 2.5) return '#f59e0b'
  if (score >= 1.5) return '#f97316'
  return '#ef4444'
}

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function HeatmapPlaceholder({ checkins }: Props) {
  const byDate = new Map(checkins.map((c) => [c.date, c]))

  // Last 35 days (5 weeks × 7), oldest first
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (34 - i))
    return d.toISOString().slice(0, 10)
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="flex flex-col justify-between pt-1 text-[10px] text-gray-400">
          {dayLabels.map((label, i) => (
            <span key={`${label}-${i}`}>{label}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((date) => {
            const checkin = byDate.get(date)
            const color = checkin
              ? scoreToColor(wellnessScore(checkin))
              : 'rgba(148, 163, 184, 0.15)'
            return (
              <div
                key={date}
                className="aspect-square rounded"
                style={{ backgroundColor: color }}
                title={checkin
                  ? `${date}: wellness ${wellnessScore(checkin).toFixed(1)}/5`
                  : `${date}: no entry`}
              />
            )
          })}
        </div>
      </div>
      <div className="flex items-center justify-end gap-1.5 text-[10px] text-gray-400">
        <span>Low</span>
        {['#ef4444', '#f97316', '#f59e0b', '#5eead4', '#0d9488'].map((c) => (
          <div key={c} className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: c }} />
        ))}
        <span>High</span>
      </div>
    </div>
  )
}
