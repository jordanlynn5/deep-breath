import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AirQualityStep from './AirQualityStep'

describe('AirQualityStep', () => {
  it('renders the placeholder AQI value', () => {
    render(<AirQualityStep onStart={vi.fn()} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders the Air Quality Index label', () => {
    render(<AirQualityStep onStart={vi.fn()} />)
    expect(screen.getByText('Air Quality Index')).toBeInTheDocument()
  })

  it('renders a city location line', () => {
    render(<AirQualityStep onStart={vi.fn()} />)
    expect(screen.getByText(/today in/i)).toBeInTheDocument()
  })

  it('calls onStart when clicking Start Check-in', async () => {
    const onStart = vi.fn()
    render(<AirQualityStep onStart={onStart} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /start check-in/i }))
    expect(onStart).toHaveBeenCalledOnce()
  })
})
