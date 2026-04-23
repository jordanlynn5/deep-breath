import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import DoneStep from './DoneStep'

describe('DoneStep', () => {
  it('renders the success heading', () => {
    render(<DoneStep name="" />)
    expect(screen.getByText("You're All Set!")).toBeInTheDocument()
  })

  it('renders personalized message when name is provided', () => {
    render(<DoneStep name="Jordan" />)
    expect(screen.getByText(/welcome, jordan/i)).toBeInTheDocument()
  })

  it('links to the check-in page', () => {
    render(<DoneStep name="" />)
    const link = screen.getByRole('link', { name: /start check-in/i })
    expect(link).toHaveAttribute('href', '/checkin')
  })
})
