import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import BottomNav from './BottomNav'

describe('BottomNav', () => {
  it('renders three navigation tabs', () => {
    render(<BottomNav />)
    expect(screen.getByText('Check-in')).toBeInTheDocument()
    expect(screen.getByText('History')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders nav links with correct hrefs', () => {
    render(<BottomNav />)
    expect(screen.getByText('Check-in').closest('a')).toHaveAttribute('href', '/checkin')
    expect(screen.getByText('History').closest('a')).toHaveAttribute('href', '/history')
    expect(screen.getByText('Settings').closest('a')).toHaveAttribute('href', '/settings')
  })

  it('highlights the active tab', () => {
    render(<BottomNav />, { routerProps: { initialEntries: ['/checkin'] } })
    const checkinLink = screen.getByText('Check-in').closest('a')
    expect(checkinLink?.className).toContain('text-teal-600')
  })
})
