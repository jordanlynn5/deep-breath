import type { CheckIn } from '@/types'

export interface UserProfile {
  name: string
  city: string
  onboardingComplete: boolean
}

const PROFILE_KEY = 'db_profile'
const CHECKINS_KEY = 'db_checkins'

export function getProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    return raw ? (JSON.parse(raw) as UserProfile) : null
  } catch {
    return null
  }
}

export function saveProfile(profile: Partial<UserProfile>): void {
  try {
    const existing = getProfile() ?? { name: '', city: '', onboardingComplete: false }
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...existing, ...profile }))
  } catch {
    // localStorage unavailable (e.g. test environments)
  }
}

export function hasCompletedOnboarding(): boolean {
  return getProfile()?.onboardingComplete === true
}

export function saveCheckIn(checkIn: CheckIn): void {
  try {
    const existing = getCheckIns()
    const filtered = existing.filter((c) => c.date !== checkIn.date)
    localStorage.setItem(
      CHECKINS_KEY,
      JSON.stringify([checkIn, ...filtered].slice(0, 365))
    )
  } catch {
    // localStorage unavailable
  }
}

export function getCheckIns(): CheckIn[] {
  try {
    const raw = localStorage.getItem(CHECKINS_KEY)
    return raw ? (JSON.parse(raw) as CheckIn[]) : []
  } catch {
    return []
  }
}

export function getStreak(): number {
  const checkins = getCheckIns()
  if (checkins.length === 0) return 0
  const dates = new Set(checkins.map((c) => c.date))
  let streak = 0
  const today = new Date()
  for (let i = 0; i <= 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    if (dates.has(key)) {
      streak++
    } else if (i > 0) {
      break
    }
  }
  return streak
}

export function getTodayCheckIn(): CheckIn | null {
  const today = new Date().toISOString().slice(0, 10)
  return getCheckIns().find((c) => c.date === today) ?? null
}
