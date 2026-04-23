import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import CheckinPage from './CheckinPage'

async function rateAllVitals(user: ReturnType<typeof userEvent.setup>) {
  for (let i = 0; i < 5; i++) {
    await user.click(screen.getByRole('button', { name: 'Rating 3 of 5' }))
  }
}

describe('CheckinPage', () => {
  it('starts on the air quality step', () => {
    render(<CheckinPage />)
    expect(screen.getByText(/air quality index/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start check-in/i })).toBeInTheDocument()
  })

  it('advances to vitals step after Start Check-in', async () => {
    render(<CheckinPage />)
    await userEvent.setup().click(screen.getByRole('button', { name: /start check-in/i }))
    expect(screen.getByText(/how is your energy/i)).toBeInTheDocument()
  })

  it('branches to reflection when user has no symptoms', async () => {
    const user = userEvent.setup()
    render(<CheckinPage />)
    await user.click(screen.getByRole('button', { name: /start check-in/i }))
    await rateAllVitals(user)
    expect(screen.getByText(/respiratory symptoms/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /^no$/i }))
    expect(screen.getByLabelText(/reflection/i)).toBeInTheDocument()
  })

  it('branches to symptom picker when user has symptoms', async () => {
    const user = userEvent.setup()
    render(<CheckinPage />)
    await user.click(screen.getByRole('button', { name: /start check-in/i }))
    await rateAllVitals(user)
    expect(screen.getByText(/respiratory symptoms/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /^yes$/i }))
    expect(screen.getByRole('button', { name: 'Cough' })).toBeInTheDocument()
  })
})
