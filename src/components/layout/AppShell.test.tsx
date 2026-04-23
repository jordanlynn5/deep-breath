import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import AppShell from './AppShell'

describe('AppShell', () => {
  it('renders the header', () => {
    render(
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<p>child</p>} />
        </Route>
      </Routes>,
    )
    expect(screen.getByText('Deep Breath')).toBeInTheDocument()
  })

  it('renders the bottom navigation', () => {
    render(
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<p>child</p>} />
        </Route>
      </Routes>,
    )
    expect(screen.getByText('Check-in')).toBeInTheDocument()
    expect(screen.getByText('History')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders child routes via Outlet', () => {
    render(
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<p>outlet content</p>} />
        </Route>
      </Routes>,
    )
    expect(screen.getByText('outlet content')).toBeInTheDocument()
  })
})
