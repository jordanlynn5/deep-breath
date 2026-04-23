import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useAirQuality } from './useAirQuality'

// Build a minimal localStorage mock
function makeLocalStorageMock() {
  const store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { Object.keys(store).forEach((k) => delete store[k]) }),
    get length() { return Object.keys(store).length },
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
    _store: store,
  }
}

let localStorageMock: ReturnType<typeof makeLocalStorageMock>
let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  localStorageMock = makeLocalStorageMock()
  vi.stubGlobal('localStorage', localStorageMock)
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useAirQuality', () => {
  it('returns loading=false and no snapshot when city is empty string', async () => {
    const { result } = renderHook(() => useAirQuality(''))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.snapshot).toBeNull()
    expect(result.current.error).toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns cached snapshot without calling fetch when cache is fresh', async () => {
    const cachedSnapshot = {
      aqi: 42,
      level: 'good' as const,
      stationName: 'Test Station',
      city: 'Dublin',
    }
    const cacheKey = 'db_aqi_dublin'
    localStorageMock._store[cacheKey] = JSON.stringify({
      snapshot: cachedSnapshot,
      fetchedAt: Date.now(),
    })

    const { result } = renderHook(() => useAirQuality('Dublin'))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.snapshot).toEqual(cachedSnapshot)
    expect(result.current.error).toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('sets error and loading=false when fetch fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useAirQuality('Berlin'))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.snapshot).toBeNull()
    expect(result.current.error).toBe('Network error')
  })

  it('sets error and loading=false when /api/aqi returns non-ok response', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ error: 'Rate limited' }),
    } as unknown as Response)

    const { result } = renderHook(() => useAirQuality('Paris'))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.snapshot).toBeNull()
    expect(result.current.error).toBe('Rate limited')
  })
})
