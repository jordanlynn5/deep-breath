import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import OnboardingProgress from './OnboardingProgress'

describe('OnboardingProgress', () => {
  it('renders the correct number of dots', () => {
    const { container } = render(<OnboardingProgress currentStep={0} totalSteps={5} />)
    const dots = container.querySelectorAll('.rounded-full')
    expect(dots).toHaveLength(5)
  })

  it('highlights dots up to the current step', () => {
    const { container } = render(<OnboardingProgress currentStep={2} totalSteps={5} />)
    const dots = container.querySelectorAll('.rounded-full')
    expect(dots[0]?.className).toContain('bg-teal-500')
    expect(dots[1]?.className).toContain('bg-teal-500')
    expect(dots[2]?.className).toContain('bg-teal-500')
    expect(dots[3]?.className).toContain('bg-gray-300')
  })

  it('has a progressbar role', () => {
    render(<OnboardingProgress currentStep={1} totalSteps={5} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
