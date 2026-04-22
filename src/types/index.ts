export type VitalName = 'energy' | 'mood' | 'sleep' | 'breathing' | 'focus'

export type AqiLevel = 'good' | 'moderate' | 'sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous'

export type NavTab = 'checkin' | 'history' | 'settings'

export interface AqiSnapshot {
  aqi: number
  level: AqiLevel
  stationName: string
  city: string
}

export interface CheckIn {
  id: string
  date: string
  timestamp: number
  vitals: Record<VitalName, number>
  lowVitalTags: string[]
  hasSymptoms: boolean
  symptoms: string[]
  reflection: string
  aqi: AqiSnapshot | null
}
