import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import VitalsStep from './VitalsStep'

describe('VitalsStep', () => {
  it('starts with the energy prompt', () => {
    render(<VitalsStep onComplete={vi.fn()} />)
    expect(screen.getByText(/how is your energy/i)).toBeInTheDocument()
  })

  it('renders 5 rating buttons', () => {
    render(<VitalsStep onComplete={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Rating 1 of 5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Rating 5 of 5' })).toBeInTheDocument()
  })

  it('advances to the next vital after selecting', async () => {
    render(<VitalsStep onComplete={vi.fn()} />)
    await userEvent.setup().click(screen.getByRole('button', { name: 'Rating 3 of 5' }))
    expect(screen.getByText(/how is your mood/i)).toBeInTheDocument()
  })

  it('calls onComplete with ratings after all 5 vitals', async () => {
    const onComplete = vi.fn()
    const user = userEvent.setup()
    render(<VitalsStep onComplete={onComplete} />)
    for (let i = 0; i < 5; i++) {
      await user.click(screen.getByRole('button', { name: 'Rating 4 of 5' }))
    }
    expect(onComplete).toHaveBeenCalledWith({
      energy: 4,
      mood: 4,
      sleep: 4,
      breathing: 4,
      focus: 4,
    })
  })
})
