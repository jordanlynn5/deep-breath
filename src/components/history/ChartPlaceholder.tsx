import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

const sampleData = [
  { day: 'Mon', wellness: 3.2, aqi: 42 },
  { day: 'Tue', wellness: 3.5, aqi: 38 },
  { day: 'Wed', wellness: 2.8, aqi: 67 },
  { day: 'Thu', wellness: 3.0, aqi: 55 },
  { day: 'Fri', wellness: 3.8, aqi: 34 },
  { day: 'Sat', wellness: 4.2, aqi: 28 },
  { day: 'Sun', wellness: 4.0, aqi: 30 },
]

export default function ChartPlaceholder() {
  return (
    <div className="h-64 w-full" data-testid="chart-placeholder">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sampleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
