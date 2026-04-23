import { useState, useEffect } from 'react'
import { aqiToLevel } from '@/utils/aqi'
import type { AqiSnapshot } from '@/types'

interface CacheEntry { snapshot: AqiSnapshot; fetchedAt: number }

const CACHE_TTL_MS = 60 * 60 * 1000

function cacheKey(city: string) {
  return `db_aqi_${city.toLowerCase().replace(/\s+/g, '_')}`
}

function readCache(city: string): AqiSnapshot | null {
  try {
    const raw = localStorage.getItem(cacheKey(city))
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    return Date.now() - entry.fetchedAt < CACHE_TTL_MS ? entry.snapshot : null
  } catch { return null }
}

function writeCache(city: string, snapshot: AqiSnapshot): void {
  try {
    localStorage.setItem(cacheKey(city), JSON.stringify({ snapshot, fetchedAt: Date.now() }))
  } catch { /* ignore */ }
}

async function fetchAqi(city: string): Promise<AqiSnapshot> {
  const res = await fetch(`/api/aqi?city=${encodeURIComponent(city)}`)
  if (!res.ok) {
    const err = await res.json() as { error: string }
    throw new Error(err.error ?? `AQI fetch failed: ${res.status}`)
  }
  const data = await res.json() as { aqi: number; level: string; stationName: string; city: string }
  return {
    aqi: data.aqi,
    level: aqiToLevel(data.aqi),
    stationName: data.stationName,
    city: data.city,
  }
}

export interface UseAirQualityResult {
  snapshot: AqiSnapshot | null
  loading: boolean
  error: string | null
}

export function useAirQuality(city: string): UseAirQualityResult {
  const [snapshot, setSnapshot] = useState<AqiSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!city) { setLoading(false); return }
    const cached = readCache(city)
    if (cached) { setSnapshot(cached); setLoading(false); return }
    setLoading(true)
    setError(null)
    fetchAqi(city)
      .then((s) => { writeCache(city, s); setSnapshot(s) })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [city])

  return { snapshot, loading, error }
}
