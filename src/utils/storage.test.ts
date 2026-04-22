import { describe, it, expect, beforeEach, vi } from 'vitest'
import { saveCheckIn, getCheckIns, getStreak, getTodayCheckIn } from './storage'
import type { CheckIn } from '@/types'

// jsdom's localStorage is unreliable in this test environment — use an in-memory stub
const store: Record<string, string> = {}
vi.stubGlobal('localStorage', {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value },
  removeItem: (key: string) => { delete store[key] },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]) },
})

function makeCheckIn(date: string, overrides: Partial<CheckIn> = {}): CheckIn {
  return {
    id: `${date}T12:00:00.000Z`,
    date,
    timestamp: new Date(date).getTime(),
    vitals: { energy: 4, mood: 4, sleep: 4, breathing: 4, focus: 4 },
    lowVitalTags: [],
    hasSymptoms: false,
    symptoms: [],
    reflection: '',
    aqi: null,
    ...overrides,
  }
}

beforeEach(() => {
  localStorage.clear()
})

describe('saveCheckIn / getCheckIns', () => {
  it('persists a check-in and retrieves it', () => {
    saveCheckIn(makeCheckIn('2026-04-22'))
    const result = getCheckIns()
    expect(result).toHaveLength(1)
    expect(result[0].date).toBe('2026-04-22')
  })

  it('replaces an existing check-in for the same date', () => {
    saveCheckIn(makeCheckIn('2026-04-22', { reflection: 'first' }))
    saveCheckIn(makeCheckIn('2026-04-22', { reflection: 'second' }))
    const result = getCheckIns()
    expect(result).toHaveLength(1)
    expect(result[0].reflection).toBe('second')
  })

  it('returns empty array when no check-ins exist', () => {
    expect(getCheckIns()).toEqual([])
  })
})

describe('getStreak', () => {
  it('returns 0 with no data', () => {
    expect(getStreak()).toBe(0)
  })

  it('counts consecutive days correctly', () => {
    const today = new Date()
    for (let i = 0; i < 3; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      saveCheckIn(makeCheckIn(d.toISOString().slice(0, 10)))
    }
    expect(getStreak()).toBe(3)
  })

  it('breaks on a gap in days', () => {
    const today = new Date()
    saveCheckIn(makeCheckIn(today.toISOString().slice(0, 10)))
    const threeDaysAgo = new Date(today)
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    saveCheckIn(makeCheckIn(threeDaysAgo.toISOString().slice(0, 10)))
    expect(getStreak()).toBe(1)
  })
})

describe('getTodayCheckIn', () => {
  it('returns null when no check-in exists for today', () => {
    expect(getTodayCheckIn()).toBeNull()
  })

  it("returns today's check-in when it exists", () => {
    const today = new Date().toISOString().slice(0, 10)
    saveCheckIn(makeCheckIn(today))
    expect(getTodayCheckIn()?.date).toBe(today)
  })
})
