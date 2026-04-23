import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import FilterControls from './FilterControls'

function renderControls(range: '7D' | '30D' | '90D' = '30D') {
  const onRangeChange = vi.fn()
  render(<FilterControls range={range} onRangeChange={onRangeChange} />)
  return { onRangeChange }
}

describe('FilterControls', () => {
  it('renders three time range buttons', () => {
    renderControls()
    expect(screen.getByRole('button', { name: '7D' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '30D' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '90D' })).toBeInTheDocument()
  })

  it('marks the active range as pressed', () => {
    renderControls('30D')
    expect(screen.getByRole('button', { name: '30D' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '7D' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onRangeChange when a range button is clicked', async () => {
    const { onRangeChange } = renderControls('30D')
    await userEvent.setup().click(screen.getByRole('button', { name: '7D' }))
    expect(onRangeChange).toHaveBeenCalledWith('7D')
  })

  it('toggles symptom filters', async () => {
    renderControls()
    const btn = screen.getByRole('button', { name: 'Cough' })
    await userEvent.setup().click(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'true')
  })

  it('renders a pollutant selector', () => {
    renderControls()
    expect(screen.getByLabelText(/pollutant/i)).toBeInTheDocument()
  })
})
