import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import StepIndicator from './StepIndicator'

describe('StepIndicator', () => {
  it('renders the correct number of segments', () => {
    const { container } = render(<StepIndicator currentStep={0} totalSteps={6} />)
    const segments = container.querySelectorAll('div.flex-1')
    expect(segments).toHaveLength(6)
  })

  it('fills segments up to the current step', () => {
    const { container } = render(<StepIndicator currentStep={2} totalSteps={6} />)
    const segments = container.querySelectorAll('div.flex-1')
    expect(segments[0]?.className).toContain('bg-teal-500')
    expect(segments[2]?.className).toContain('bg-teal-500')
    expect(segments[3]?.className).toContain('bg-gray-200')
  })

  it('exposes progressbar role with current value', () => {
    render(<StepIndicator currentStep={1} totalSteps={6} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '2')
    expect(bar).toHaveAttribute('aria-valuemax', '6')
  })
})
