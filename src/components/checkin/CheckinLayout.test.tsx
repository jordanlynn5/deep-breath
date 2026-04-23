import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CheckinLayout from './CheckinLayout'

describe('CheckinLayout', () => {
  it('renders the step indicator and children', () => {
    render(
      <CheckinLayout currentStep={1} totalSteps={6}>
        <p>step body</p>
      </CheckinLayout>,
    )
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByText('step body')).toBeInTheDocument()
  })

  it('renders Back button when onBack is provided', async () => {
    const onBack = vi.fn()
    render(
      <CheckinLayout currentStep={1} totalSteps={6} onBack={onBack}>
        <p>body</p>
      </CheckinLayout>,
    )
    await userEvent.setup().click(screen.getByRole('button', { name: /back/i }))
    expect(onBack).toHaveBeenCalledOnce()
  })

  it('renders Next button and calls onNext', async () => {
    const onNext = vi.fn()
    render(
      <CheckinLayout currentStep={1} totalSteps={6} onNext={onNext}>
        <p>body</p>
      </CheckinLayout>,
    )
    await userEvent.setup().click(screen.getByRole('button', { name: /next/i }))
    expect(onNext).toHaveBeenCalledOnce()
  })

  it('uses custom nextLabel when provided', () => {
    render(
      <CheckinLayout currentStep={5} totalSteps={6} onNext={vi.fn()} nextLabel="Done">
        <p>body</p>
      </CheckinLayout>,
    )
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument()
  })

  it('disables Next when nextDisabled is true', () => {
    render(
      <CheckinLayout currentStep={1} totalSteps={6} onNext={vi.fn()} nextDisabled>
        <p>body</p>
      </CheckinLayout>,
    )
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })
})
