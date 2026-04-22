import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import ChartPlaceholder from './ChartPlaceholder'

describe('ChartPlaceholder', () => {
  it('renders the chart container', () => {
    render(<ChartPlaceholder />)
    expect(screen.getByTestId('chart-placeholder')).toBeInTheDocument()
  })
})
