import { describe, it, expect } from 'vitest'
import { pm25ToAqi, aqiToLevel } from './aqi'

describe('pm25ToAqi', () => {
  it('returns 0 for 0 µg/m³', () => expect(pm25ToAqi(0)).toBe(0))
  it('returns 50 for 12 µg/m³ (band boundary)', () => expect(pm25ToAqi(12)).toBe(50))
  it('returns 100 for 35.4 µg/m³ (band boundary)', () => expect(pm25ToAqi(35.4)).toBe(100))
  it('handles mid-band value', () => {
    expect(pm25ToAqi(8.4)).toBeGreaterThan(0)
    expect(pm25ToAqi(8.4)).toBeLessThan(50)
  })
})

describe('aqiToLevel', () => {
  it('returns good for AQI ≤ 50', () => expect(aqiToLevel(42)).toBe('good'))
  it('returns moderate for AQI 51–100', () => expect(aqiToLevel(75)).toBe('moderate'))
  it('returns sensitive for AQI 101–150', () => expect(aqiToLevel(120)).toBe('sensitive'))
  it('returns unhealthy for AQI 151–200', () => expect(aqiToLevel(175)).toBe('unhealthy'))
  it('returns very-unhealthy for AQI 201–300', () => expect(aqiToLevel(250)).toBe('very-unhealthy'))
  it('returns hazardous for AQI > 300', () => expect(aqiToLevel(400)).toBe('hazardous'))
})
