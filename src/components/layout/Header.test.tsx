import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import Header from './Header'

describe('Header', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('renders the app title', () => {
    render(<Header />)
    expect(screen.getByText('Deep Breath')).toBeInTheDocument()
  })

  it('renders a dark mode toggle button labeled for light mode initially', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  it('toggles dark mode class on click', async () => {
    render(<Header />)
    const btn = screen.getByRole('button', { name: /switch to dark mode/i })
    await userEvent.setup().click(btn)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })
})
