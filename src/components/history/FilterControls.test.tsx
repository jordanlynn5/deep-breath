import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import FilterControls from './FilterControls'

describe('FilterControls', () => {
  it('renders three time range buttons', () => {
    render(<FilterControls />)
    expect(screen.getByRole('button', { name: '7D' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '30D' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '90D' })).toBeInTheDocument()
  })

  it('defaults to 30D selected', () => {
    render(<FilterControls />)
    expect(screen.getByRole('button', { name: '30D' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('switches time range on click', async () => {
    render(<FilterControls />)
    await userEvent.setup().click(screen.getByRole('button', { name: '7D' }))
    expect(screen.getByRole('button', { name: '7D' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('toggles symptom filters', async () => {
    render(<FilterControls />)
    const btn = screen.getByRole('button', { name: 'Cough' })
    await userEvent.setup().click(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'true')
  })

  it('renders a pollutant selector', () => {
    render(<FilterControls />)
    expect(screen.getByLabelText(/pollutant/i)).toBeInTheDocument()
  })
})
