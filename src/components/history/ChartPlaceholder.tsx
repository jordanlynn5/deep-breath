import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { CheckIn } from '@/types'

interface Props {
  checkins: CheckIn[]
}

export default function ChartPlaceholder({ checkins }: Props) {
  const data = checkins
    .slice()
    .reverse()
    .map((c) => {
      const vals = Object.values(c.vitals)
      const wellness = vals.reduce((a, b) => a + b, 0) / vals.length
      return {
        day: c.date.slice(5),
        wellness: Math.round(wellness * 10) / 10,
        aqi: c.aqi?.aqi ?? null,
      }
    })
    .filter((d) => d.aqi !== null)

  if (data.length < 2) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400" data-testid="chart-placeholder">
        Complete 2+ check-ins to see your trend.
      </div>
    )
  }

  return (
    <div className="h-64 w-full" data-testid="chart-placeholder">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(20, 184, 166, 0.3)',
              borderRadius: '0.5rem',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="wellness"
            stroke="#14b8a6"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Wellness"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="aqi"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="AQI"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
