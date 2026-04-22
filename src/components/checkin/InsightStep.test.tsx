import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import InsightStep from './InsightStep'

describe('InsightStep', () => {
  it('renders the insight card', () => {
    render(<InsightStep onDone={vi.fn()} aqi={null} />)
    expect(screen.getByText(/today's insight/i)).toBeInTheDocument()
  })

  it('renders "First check-in!" when streak is 0', () => {
    render(<InsightStep onDone={vi.fn()} aqi={null} />)
    expect(screen.getByText(/first check-in!/i)).toBeInTheDocument()
  })

  it('renders 35 heatmap cells', () => {
    const { container } = render(<InsightStep onDone={vi.fn()} aqi={null} />)
    const cells = container.querySelectorAll('div.aspect-square')
    expect(cells).toHaveLength(35)
  })

  it('calls onDone when Done is clicked', async () => {
    const onDone = vi.fn()
    render(<InsightStep onDone={onDone} aqi={null} />)
    await userEvent.setup().click(screen.getByRole('button', { name: /done/i }))
    expect(onDone).toHaveBeenCalledOnce()
  })
})
