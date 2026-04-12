import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TapButton from './TapButton'

describe('TapButton', () => {
  it('renders children', () => {
    render(
      <TapButton selected={false} onClick={vi.fn()}>
        3
      </TapButton>,
    )
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('reflects selected state with aria-pressed', () => {
    render(
      <TapButton selected onClick={vi.fn()}>
        3
      </TapButton>,
    )
    expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(
      <TapButton selected={false} onClick={onClick}>
        3
      </TapButton>,
    )
    await userEvent.setup().click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies rating variant styles by default', () => {
    render(
      <TapButton selected={false} onClick={vi.fn()}>
        3
      </TapButton>,
    )
    expect(screen.getByRole('button').className).toContain('rounded-full')
  })

  it('applies symptom variant styles when specified', () => {
    render(
      <TapButton selected={false} onClick={vi.fn()} variant="symptom">
        Cough
      </TapButton>,
    )
    expect(screen.getByRole('button').className).toContain('rounded-xl')
  })

  it('uses aria-label when provided', () => {
    render(
      <TapButton selected={false} onClick={vi.fn()} ariaLabel="Rating 3 of 5">
        3
      </TapButton>,
    )
    expect(screen.getByRole('button', { name: 'Rating 3 of 5' })).toBeInTheDocument()
  })
})
