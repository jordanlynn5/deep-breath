import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LocationStep from './LocationStep'

describe('LocationStep', () => {
  const defaultProps = {
    city: '',
    onCityChange: vi.fn(),
    onContinue: vi.fn(),
  }

  it('renders the heading and description', () => {
    render(<LocationStep {...defaultProps} />)
    expect(screen.getByText('Where are you based?')).toBeInTheDocument()
    expect(screen.getByText(/find air quality data/i)).toBeInTheDocument()
  })

  it('calls onCityChange when typing', async () => {
    const onCityChange = vi.fn()
    render(<LocationStep {...defaultProps} onCityChange={onCityChange} />)
    await userEvent.setup().type(screen.getByPlaceholderText(/oakland/i), 'S')
    expect(onCityChange).toHaveBeenCalledWith('S')
  })

  it('calls onContinue when city is valid and Continue is clicked', async () => {
    const onContinue = vi.fn()
    render(<LocationStep {...defaultProps} city="Oakland, CA" onContinue={onContinue} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /continue/i }))
    expect(onContinue).toHaveBeenCalledOnce()
  })

  it('does not call onContinue when city is empty', async () => {
    const onContinue = vi.fn()
    render(<LocationStep {...defaultProps} city="" onContinue={onContinue} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /continue/i }))
    expect(onContinue).not.toHaveBeenCalled()
  })
})
