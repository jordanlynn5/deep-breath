import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import OnboardingPage from '@/pages/OnboardingPage'
import CheckinPage from '@/pages/CheckinPage'
import HistoryPage from '@/pages/HistoryPage'
import SettingsPage from '@/pages/SettingsPage'
import { hasCompletedOnboarding } from '@/utils/storage'

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  if (!hasCompletedOnboarding()) {
    return <Navigate to="/onboarding" replace />
  }
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    element: <AppShell />,
    children: [
      {
        path: '/checkin',
        element: <RequireOnboarding><CheckinPage /></RequireOnboarding>,
      },
      {
        path: '/history',
        element: <RequireOnboarding><HistoryPage /></RequireOnboarding>,
      },
      {
        path: '/settings',
        element: <RequireOnboarding><SettingsPage /></RequireOnboarding>,
      },
      { path: '*', element: <Navigate to="/checkin" replace /> },
    ],
  },
])
