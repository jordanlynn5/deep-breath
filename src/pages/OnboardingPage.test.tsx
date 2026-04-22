import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import OnboardingPage from './OnboardingPage'

describe('OnboardingPage', () => {
  it('starts on the welcome step', () => {
    render(<OnboardingPage />)
    expect(screen.getByLabelText(/what should we call you/i)).toBeInTheDocument()
  })

  it('advances to the location step on Continue', async () => {
    render(<OnboardingPage />)
    await userEvent.setup().click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText('Where are you based?')).toBeInTheDocument()
  })

  it('advances through all steps to the Done step', async () => {
    const user = userEvent.setup()
    render(<OnboardingPage />)
    // Step 0: Welcome
    await user.click(screen.getByRole('button', { name: /continue/i }))
    // Step 1: Location — type a city then continue
    await user.type(screen.getByPlaceholderText(/oakland/i), 'Oakland, CA')
    await user.click(screen.getByRole('button', { name: /continue/i }))
    // Step 2: Notification Time
    await user.click(screen.getByRole('button', { name: /continue/i }))
    // Step 3: Notification Permission
    await user.click(screen.getByRole('button', { name: /not now/i }))
    // Step 4: Done
    expect(screen.getByText("You're All Set!")).toBeInTheDocument()
  })

  it('passes entered name to the Done step', async () => {
    const user = userEvent.setup()
    render(<OnboardingPage />)
    await user.type(screen.getByLabelText(/what should we call you/i), 'Jordan')
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.type(screen.getByPlaceholderText(/oakland/i), 'Oakland, CA')
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('button', { name: /not now/i }))
    expect(screen.getByText(/welcome, jordan/i)).toBeInTheDocument()
  })
})
