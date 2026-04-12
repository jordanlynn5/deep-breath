import { render } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import HeatmapPlaceholder from './HeatmapPlaceholder'

describe('HeatmapPlaceholder', () => {
  it('renders 35 day cells', () => {
    const { container } = render(<HeatmapPlaceholder />)
    const cells = container.querySelectorAll('div.aspect-square')
    expect(cells).toHaveLength(35)
  })

  it('renders a legend', () => {
    const { getByText } = render(<HeatmapPlaceholder />)
    expect(getByText('Less')).toBeInTheDocument()
    expect(getByText('More')).toBeInTheDocument()
  })
})
