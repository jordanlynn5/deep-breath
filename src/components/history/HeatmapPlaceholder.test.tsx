import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import HeatmapPlaceholder from './HeatmapPlaceholder'
import type { CheckIn } from '@/types'

const makeCheckIn = (daysAgo: number, avg: number): CheckIn => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  const date = d.toISOString().slice(0, 10)
  return {
    id: date,
    date,
    timestamp: d.getTime(),
    vitals: { energy: avg, mood: avg, sleep: avg, breathing: avg, focus: avg },
    lowVitalTags: [],
    hasSymptoms: false,
    symptoms: [],
    reflection: '',
    aqi: null,
  }
}

describe('HeatmapPlaceholder', () => {
  it('renders 35 day cells', () => {
    const { container } = render(<HeatmapPlaceholder checkins={[]} />)
    const cells = container.querySelectorAll('div.aspect-square')
    expect(cells).toHaveLength(35)
  })

  it('renders a Low/High legend', () => {
    render(<HeatmapPlaceholder checkins={[]} />)
    expect(screen.getByText('Low')).toBeInTheDocument()
    expect(screen.getByText('High')).toBeInTheDocument()
  })

  it('colors today with teal for a high wellness score', () => {
    const { container } = render(<HeatmapPlaceholder checkins={[makeCheckIn(0, 5)]} />)
    const cells = Array.from(container.querySelectorAll('div.aspect-square'))
    const today = cells[cells.length - 1] as HTMLElement
    expect(today.style.backgroundColor).toBe('rgb(13, 148, 136)')
  })

  it('colors today with red for a low wellness score', () => {
    const { container } = render(<HeatmapPlaceholder checkins={[makeCheckIn(0, 1)]} />)
    const cells = Array.from(container.querySelectorAll('div.aspect-square'))
    const today = cells[cells.length - 1] as HTMLElement
    expect(today.style.backgroundColor).toBe('rgb(239, 68, 68)')
  })
})
