import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ReflectionStep from './ReflectionStep'

describe('ReflectionStep', () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    onSkip: vi.fn(),
  }

  it('renders a textarea', () => {
    render(<ReflectionStep {...defaultProps} />)
    expect(screen.getByLabelText(/reflection/i)).toBeInTheDocument()
  })

  it('calls onSkip when Skip is clicked', async () => {
    const onSkip = vi.fn()
    render(<ReflectionStep {...defaultProps} onSkip={onSkip} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /skip/i }))
    expect(onSkip).toHaveBeenCalledOnce()
  })

  it('calls onSubmit with text when Next is clicked', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ReflectionStep {...defaultProps} onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText(/reflection/i), 'Good day')
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(onSubmit).toHaveBeenCalledWith('Good day')
  })
})
