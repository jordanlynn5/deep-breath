import type { AqiLevel } from '@/types'

interface AqiBand {
  pmLo: number; pmHi: number; aqiLo: number; aqiHi: number
}

const BANDS: AqiBand[] = [
  { pmLo: 0.0,   pmHi: 12.0,  aqiLo: 0,   aqiHi: 50  },
  { pmLo: 12.1,  pmHi: 35.4,  aqiLo: 51,  aqiHi: 100 },
  { pmLo: 35.5,  pmHi: 55.4,  aqiLo: 101, aqiHi: 150 },
  { pmLo: 55.5,  pmHi: 150.4, aqiLo: 151, aqiHi: 200 },
  { pmLo: 150.5, pmHi: 250.4, aqiLo: 201, aqiHi: 300 },
  { pmLo: 250.5, pmHi: 350.4, aqiLo: 301, aqiHi: 400 },
  { pmLo: 350.5, pmHi: 500.4, aqiLo: 401, aqiHi: 500 },
]

export function pm25ToAqi(pm25: number): number {
  const band = BANDS.find((b) => pm25 <= b.pmHi) ?? BANDS[BANDS.length - 1]
  return Math.round(
    ((band.aqiHi - band.aqiLo) / (band.pmHi - band.pmLo)) * (pm25 - band.pmLo) + band.aqiLo
  )
}

export function aqiToLevel(aqi: number): AqiLevel {
  if (aqi <= 50)  return 'good'
  if (aqi <= 100) return 'moderate'
  if (aqi <= 150) return 'sensitive'
  if (aqi <= 200) return 'unhealthy'
  if (aqi <= 300) return 'very-unhealthy'
  return 'hazardous'
}

export function aqiLevelToCssVar(level: AqiLevel): string {
  return `var(--color-aqi-${level})`
}

export const AQI_LABELS: Record<AqiLevel, string> = {
  good: 'Good',
  moderate: 'Moderate',
  sensitive: 'Unhealthy for Sensitive Groups',
  unhealthy: 'Unhealthy',
  'very-unhealthy': 'Very Unhealthy',
  hazardous: 'Hazardous',
}
