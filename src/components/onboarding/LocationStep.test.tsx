import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LocationStep from './LocationStep'

describe('LocationStep', () => {
  const defaultProps = {
    onAllow: vi.fn(),
    onSkip: vi.fn(),
  }

  it('renders the heading and description', () => {
    render(<LocationStep {...defaultProps} />)
    expect(screen.getByText('Enable Location')).toBeInTheDocument()
    expect(screen.getByText(/nearby air quality/i)).toBeInTheDocument()
  })

  it('calls onAllow when clicking Allow Location', async () => {
    const onAllow = vi.fn()
    render(<LocationStep {...defaultProps} onAllow={onAllow} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /allow location/i }))
    expect(onAllow).toHaveBeenCalledOnce()
  })

  it('calls onSkip when clicking Skip', async () => {
    const onSkip = vi.fn()
    render(<LocationStep {...defaultProps} onSkip={onSkip} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /skip/i }))
    expect(onSkip).toHaveBeenCalledOnce()
  })
})
