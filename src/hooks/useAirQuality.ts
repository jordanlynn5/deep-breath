import { useState, useEffect } from 'react'
import { pm25ToAqi, aqiToLevel } from '@/utils/aqi'
import type { AqiSnapshot } from '@/types'

interface CacheEntry { snapshot: AqiSnapshot; fetchedAt: number }

const CACHE_TTL_MS = 60 * 60 * 1000
const OPENAQ_KEY = import.meta.env.VITE_OPENAQ_API_KEY as string | undefined
const OPENAQ_BASE = 'https://api.openaq.org/v3'

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

async function geocode(city: string): Promise<{ lat: number; lon: number }> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`,
    { headers: { 'User-Agent': 'DeepBreathApp/1.0' } }
  )
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`)
  const data = await res.json() as Array<{ lat: string; lon: string }>
  if (!data.length) throw new Error(`City not found: ${city}`)
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
}

async function fetchAqi(city: string): Promise<AqiSnapshot> {
  const { lat, lon } = await geocode(city)
  const headers: HeadersInit = OPENAQ_KEY ? { 'X-API-Key': OPENAQ_KEY } : {}

  const locRes = await fetch(
    `${OPENAQ_BASE}/locations?coordinates=${lat},${lon}&radius=25000&parameters_id=2&limit=5&monitor=true`,
    { headers }
  )
  if (!locRes.ok) throw new Error(`OpenAQ locations error: ${locRes.status}`)
  const locData = await locRes.json() as {
    results: Array<{
      id: number
      name: string
      sensors: Array<{ id: number; parameter: { name: string } }>
    }>
  }

  if (!locData.results?.length) throw new Error(`No PM2.5 station found near ${city}`)

  const location = locData.results[0]
  const pm25Sensor = location.sensors.find((s) => s.parameter.name === 'pm25')
  if (!pm25Sensor) throw new Error('No PM2.5 sensor found at nearest station')

  const latestRes = await fetch(
    `${OPENAQ_BASE}/locations/${location.id}/latest`,
    { headers }
  )
  if (!latestRes.ok) throw new Error(`OpenAQ latest error: ${latestRes.status}`)
  const latestData = await latestRes.json() as {
    results: Array<{ sensorsId: number; value: number }>
  }

  const pm25Reading = latestData.results.find((r) => r.sensorsId === pm25Sensor.id)
  if (!pm25Reading) throw new Error('No current PM2.5 reading available')

  const aqi = pm25ToAqi(pm25Reading.value)
  const level = aqiToLevel(aqi)
  return { aqi, level, stationName: location.name, city }
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
