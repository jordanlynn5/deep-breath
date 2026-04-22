import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import SettingsPage from './SettingsPage'

describe('SettingsPage', () => {
  it('renders the settings heading', () => {
    render(<SettingsPage />)
    expect(screen.getByRole('heading', { name: /settings/i, level: 1 })).toBeInTheDocument()
  })

  it('renders all section headings', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('Appearance')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders version info', () => {
    render(<SettingsPage />)
    expect(screen.getByText('0.1.0')).toBeInTheDocument()
  })
})
