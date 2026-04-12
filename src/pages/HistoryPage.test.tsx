import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import HistoryPage from './HistoryPage'

describe('HistoryPage', () => {
  it('renders the history heading', () => {
    render(<HistoryPage />)
    expect(screen.getByRole('heading', { name: /history/i, level: 1 })).toBeInTheDocument()
  })

  it('renders filter controls', () => {
    render(<HistoryPage />)
    expect(screen.getByRole('button', { name: '30D' })).toBeInTheDocument()
  })

  it('renders the heatmap section', () => {
    render(<HistoryPage />)
    expect(screen.getByText(/daily heatmap/i)).toBeInTheDocument()
  })

  it('renders the chart section', () => {
    render(<HistoryPage />)
    expect(screen.getByText(/wellness vs\. air quality/i)).toBeInTheDocument()
    expect(screen.getByTestId('chart-placeholder')).toBeInTheDocument()
  })
})
