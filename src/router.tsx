import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import OnboardingPage from '@/pages/OnboardingPage'
import CheckinPage from '@/pages/CheckinPage'
import HistoryPage from '@/pages/HistoryPage'
import SettingsPage from '@/pages/SettingsPage'

export const router = createBrowserRouter([
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
      { path: '*', element: <Navigate to="/checkin" replace /> },
    ],
  },
])
