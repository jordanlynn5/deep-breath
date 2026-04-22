import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AppShell from '@/components/layout/AppShell'
import OnboardingPage from '@/pages/OnboardingPage'
import CheckinPage from '@/pages/CheckinPage'
import HistoryPage from '@/pages/HistoryPage'
import SettingsPage from '@/pages/SettingsPage'

const routes = [
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    element: <AppShell />,
    children: [
      { path: '/checkin', element: <CheckinPage /> },
      { path: '/history', element: <HistoryPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
]

function renderWithRouter(initialEntries: string[]) {
  const router = createMemoryRouter(routes, { initialEntries })
  return render(<RouterProvider router={router} />)
}

describe('Router', () => {
  it('renders onboarding page at /onboarding', () => {
    renderWithRouter(['/onboarding'])
    expect(screen.getByLabelText(/what should we call you/i)).toBeInTheDocument()
  })

  it('renders check-in page at /checkin inside AppShell', () => {
    renderWithRouter(['/checkin'])
    expect(screen.getByRole('button', { name: /start check-in/i })).toBeInTheDocument()
    expect(screen.getAllByText('Deep Breath').length).toBeGreaterThan(0)
  })

  it('renders history page at /history inside AppShell', () => {
    renderWithRouter(['/history'])
    expect(screen.getByRole('heading', { name: /history/i, level: 1 })).toBeInTheDocument()
    expect(screen.getAllByText('Deep Breath').length).toBeGreaterThan(0)
  })

  it('renders settings page at /settings inside AppShell', () => {
    renderWithRouter(['/settings'])
    expect(screen.getByRole('heading', { name: /settings/i, level: 1 })).toBeInTheDocument()
    expect(screen.getAllByText('Deep Breath').length).toBeGreaterThan(0)
  })

  it('onboarding page does not show bottom nav', () => {
    renderWithRouter(['/onboarding'])
    expect(screen.queryByText('Check-in')).not.toBeInTheDocument()
  })
})
