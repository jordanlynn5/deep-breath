import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import WelcomeStep from './WelcomeStep'

describe('WelcomeStep', () => {
  const defaultProps = {
    name: '',
    onNameChange: vi.fn(),
    onContinue: vi.fn(),
  }

  it('renders the app title and subtitle', () => {
    render(<WelcomeStep {...defaultProps} />)
    expect(screen.getByText('Deep Breath')).toBeInTheDocument()
    expect(screen.getByText(/air quality shapes/i)).toBeInTheDocument()
  })

  it('renders a name input', () => {
    render(<WelcomeStep {...defaultProps} />)
    expect(screen.getByLabelText(/what should we call you/i)).toBeInTheDocument()
  })

  it('calls onNameChange when typing', async () => {
    const onNameChange = vi.fn()
    render(<WelcomeStep {...defaultProps} onNameChange={onNameChange} />)
    const input = screen.getByLabelText(/what should we call you/i)
    await userEvent.setup().type(input, 'J')
    expect(onNameChange).toHaveBeenCalledWith('J')
  })

  it('calls onContinue when clicking Continue', async () => {
    const onContinue = vi.fn()
    render(<WelcomeStep {...defaultProps} onContinue={onContinue} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /continue/i }))
    expect(onContinue).toHaveBeenCalledOnce()
  })
})
