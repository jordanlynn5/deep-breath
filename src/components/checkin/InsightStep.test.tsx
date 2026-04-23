import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import InsightStep from './InsightStep'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    json: () => Promise.resolve({ insight: 'Test insight from API.' }),
  }))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('InsightStep', () => {
  it('renders the insight card', () => {
    render(<InsightStep onDone={vi.fn()} aqi={null} />)
    expect(screen.getByText(/today's insight/i)).toBeInTheDocument()
  })

  it('shows fallback copy when no check-ins exist (no fetch called)', async () => {
    render(<InsightStep onDone={vi.fn()} aqi={null} />)
    expect(await screen.findByText(/keep tracking/i)).toBeInTheDocument()
    expect(vi.mocked(fetch)).not.toHaveBeenCalled()
  })

  it('shows fallback copy when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    // seed a check-in so the fetch path is taken
    const store: Record<string, string> = {
      db_checkins: JSON.stringify([{
        id: '2026-04-22T00:00:00.000Z',
        date: '2026-04-22',
        timestamp: Date.now(),
        vitals: { energy: 3, mood: 3, sleep: 3, breathing: 3, focus: 3 },
        lowVitalTags: [],
        hasSymptoms: false,
        symptoms: [],
        reflection: '',
        aqi: null,
      }]),
    }
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store[k] ?? null,
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    })
    render(<InsightStep onDone={vi.fn()} aqi={null} />)
    expect(await screen.findByText(/keep tracking/i)).toBeInTheDocument()
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
