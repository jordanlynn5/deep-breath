import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import NotificationTimeStep from './NotificationTimeStep'

describe('NotificationTimeStep', () => {
  it('renders the heading', () => {
    render(<NotificationTimeStep onContinue={vi.fn()} />)
    expect(screen.getByText('Reminder Time')).toBeInTheDocument()
  })

  it('renders four time options', () => {
    render(<NotificationTimeStep onContinue={vi.fn()} />)
    expect(screen.getByText('8:00 AM')).toBeInTheDocument()
    expect(screen.getByText('12:00 PM')).toBeInTheDocument()
    expect(screen.getByText('6:00 PM')).toBeInTheDocument()
    expect(screen.getByText('9:00 PM')).toBeInTheDocument()
  })

  it('highlights selected time', async () => {
    render(<NotificationTimeStep onContinue={vi.fn()} />)
    const btn = screen.getByText('8:00 AM')
    await userEvent.setup().click(btn)
    expect(btn.className).toContain('bg-teal-500')
  })

  it('calls onContinue with selected time', async () => {
    const onContinue = vi.fn()
    render(<NotificationTimeStep onContinue={onContinue} />)
    await userEvent.setup().click(screen.getByText('6:00 PM'))
    await userEvent.setup().click(screen.getByRole('button', { name: /continue/i }))
    expect(onContinue).toHaveBeenCalledWith('6:00 PM')
  })
})
