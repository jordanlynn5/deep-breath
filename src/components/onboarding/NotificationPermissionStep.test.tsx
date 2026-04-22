import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import NotificationPermissionStep from './NotificationPermissionStep'

describe('NotificationPermissionStep', () => {
  const defaultProps = {
    onEnable: vi.fn(),
    onSkip: vi.fn(),
  }

  it('renders the heading', () => {
    render(<NotificationPermissionStep {...defaultProps} />)
    expect(screen.getByRole('heading', { name: /enable notifications/i })).toBeInTheDocument()
  })

  it('calls onEnable when clicking Enable', async () => {
    const onEnable = vi.fn()
    render(<NotificationPermissionStep {...defaultProps} onEnable={onEnable} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /enable notifications/i }))
    expect(onEnable).toHaveBeenCalledOnce()
  })

  it('calls onSkip when clicking Not Now', async () => {
    const onSkip = vi.fn()
    render(<NotificationPermissionStep {...defaultProps} onSkip={onSkip} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /not now/i }))
    expect(onSkip).toHaveBeenCalledOnce()
  })
})
