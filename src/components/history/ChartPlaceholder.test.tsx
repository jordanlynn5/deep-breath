import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import ChartPlaceholder from './ChartPlaceholder'
import type { CheckIn } from '@/types'

const makeCheckIn = (daysAgo: number, aqi: number): CheckIn => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  const date = d.toISOString().slice(0, 10)
  return {
    id: date,
    date,
    timestamp: d.getTime(),
    vitals: { energy: 4, mood: 4, sleep: 4, breathing: 4, focus: 4 },
    lowVitalTags: [],
    hasSymptoms: false,
    symptoms: [],
    reflection: '',
    aqi: { aqi, level: 'good', stationName: 'Test', city: 'Test' },
  }
}

describe('ChartPlaceholder', () => {
  it('shows empty state when fewer than 2 AQI check-ins exist', () => {
    render(<ChartPlaceholder checkins={[]} />)
    expect(screen.getByTestId('chart-placeholder')).toBeInTheDocument()
    expect(screen.getByText(/complete 2\+ check-ins/i)).toBeInTheDocument()
  })

  it('renders the chart container when 2+ AQI check-ins exist', () => {
    const checkins = [makeCheckIn(0, 42), makeCheckIn(1, 38)]
    render(<ChartPlaceholder checkins={checkins} />)
    expect(screen.getByTestId('chart-placeholder')).toBeInTheDocument()
    expect(screen.queryByText(/complete 2\+/i)).not.toBeInTheDocument()
  })
})
