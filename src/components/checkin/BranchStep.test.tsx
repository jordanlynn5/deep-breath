import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import BranchStep from './BranchStep'

describe('BranchStep', () => {
  it('renders the symptoms question', () => {
    render(<BranchStep onAnswer={vi.fn()} />)
    expect(screen.getByText(/respiratory symptoms/i)).toBeInTheDocument()
  })

  it('calls onAnswer with false when clicking No', async () => {
    const onAnswer = vi.fn()
    render(<BranchStep onAnswer={onAnswer} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /^no$/i }))
    expect(onAnswer).toHaveBeenCalledWith(false)
  })

  it('calls onAnswer with true when clicking Yes', async () => {
    const onAnswer = vi.fn()
    render(<BranchStep onAnswer={onAnswer} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /^yes$/i }))
    expect(onAnswer).toHaveBeenCalledWith(true)
  })
})
