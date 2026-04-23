import { useState } from 'react'
import type { CheckIn, VitalName } from '@/types'

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

const vitalLabels: Record<VitalName, string> = {
  energy: 'Energy',
  mood: 'Mood',
  sleep: 'Sleep',
  breathing: 'Breathing',
  focus: 'Focus',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

export default function HeatmapPlaceholder({ checkins }: Props) {
  const [selected, setSelected] = useState<CheckIn | null>(null)
  const byDate = new Map(checkins.map((c) => [c.date, c]))

  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (34 - i))
    return d.toISOString().slice(0, 10)
  })

  const handleClick = (date: string) => {
    const checkin = byDate.get(date)
    if (!checkin) return
    setSelected((prev) => prev?.date === date ? null : checkin)
  }

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
            const isSelected = selected?.date === date
            return (
              <button
                key={date}
                type="button"
                onClick={() => handleClick(date)}
                className={`aspect-square rounded transition-transform ${checkin ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-default'} ${isSelected ? 'ring-2 ring-teal-500 ring-offset-1' : ''}`}
                style={{ backgroundColor: color }}
                aria-label={checkin
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

      {selected && (
        <div className="mt-2 rounded-2xl bg-teal-50 p-4 dark:bg-gray-700/50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {formatDate(selected.date)}
            </span>
            {selected.aqi && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {selected.aqi.city} · AQI {selected.aqi.aqi}
              </span>
            )}
          </div>

          <div className="grid grid-cols-5 gap-2">
            {(Object.entries(selected.vitals) as [VitalName, number][]).map(([key, val]) => (
              <div key={key} className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                  {vitalLabels[key].slice(0, 3)}
                </span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {selected.symptoms.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selected.symptoms.map((s) => (
                <span key={s} className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                  {s}
                </span>
              ))}
            </div>
          )}

          {selected.reflection && (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              "{selected.reflection}"
            </p>
          )}
        </div>
      )}
    </div>
  )
}
