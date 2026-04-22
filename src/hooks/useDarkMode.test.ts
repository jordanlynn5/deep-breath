import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useDarkMode } from './useDarkMode'

describe('useDarkMode', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('starts light by default', () => {
    const { result } = renderHook(() => useDarkMode())
    expect(result.current[0]).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('toggles the dark class on html', () => {
    const { result } = renderHook(() => useDarkMode())
    act(() => result.current[1]())
    expect(result.current[0]).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles back to light', () => {
    const { result } = renderHook(() => useDarkMode())
    act(() => result.current[1]())
    act(() => result.current[1]())
    expect(result.current[0]).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
