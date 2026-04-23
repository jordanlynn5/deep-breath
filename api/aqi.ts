import type { VercelRequest, VercelResponse } from '@vercel/node'

const OPENAQ_KEY = process.env.OPENAQ_API_KEY ?? ''
const OPENAQ_BASE = 'https://api.openaq.org/v3'

const BANDS = [
  { pmLo: 0.0,   pmHi: 12.0,  aqiLo: 0,   aqiHi: 50  },
  { pmLo: 12.1,  pmHi: 35.4,  aqiLo: 51,  aqiHi: 100 },
  { pmLo: 35.5,  pmHi: 55.4,  aqiLo: 101, aqiHi: 150 },
  { pmLo: 55.5,  pmHi: 150.4, aqiLo: 151, aqiHi: 200 },
  { pmLo: 150.5, pmHi: 250.4, aqiLo: 201, aqiHi: 300 },
  { pmLo: 250.5, pmHi: 350.4, aqiLo: 301, aqiHi: 400 },
  { pmLo: 350.5, pmHi: 500.4, aqiLo: 401, aqiHi: 500 },
]

function pm25ToAqi(pm25: number): number {
  const band = BANDS.find((b) => pm25 <= b.pmHi) ?? BANDS[BANDS.length - 1]
  return Math.round(
    ((band.aqiHi - band.aqiLo) / (band.pmHi - band.pmLo)) * (pm25 - band.pmLo) + band.aqiLo
  )
}

function aqiToLevel(aqi: number): string {
  if (aqi <= 50)  return 'good'
  if (aqi <= 100) return 'moderate'
  if (aqi <= 150) return 'sensitive'
  if (aqi <= 200) return 'unhealthy'
  if (aqi <= 300) return 'very-unhealthy'
  return 'hazardous'
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const city = req.query.city as string | undefined
  if (!city) return res.status(400).json({ error: 'city required' })

  try {
    const { lat, lon } = await geocode(city)
    const headers: Record<string, string> = OPENAQ_KEY ? { 'X-API-Key': OPENAQ_KEY } : {}

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
    if (!pm25Sensor) throw new Error('No PM2.5 sensor at nearest station')

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
    return res.status(200).json({
      aqi,
      level: aqiToLevel(aqi),
      stationName: location.name,
      city,
    })
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message })
  }
}
