import { render, screen, userEvent } from '@/test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SymptomPickerStep from './SymptomPickerStep'

describe('SymptomPickerStep', () => {
  it('renders all symptom options', () => {
    render(<SymptomPickerStep onContinue={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Cough' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Wheeze' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tight Chest' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Shortness of Breath' })).toBeInTheDocument()
  })

  it('renders a None of the above button', () => {
    render(<SymptomPickerStep onContinue={vi.fn()} />)
    expect(screen.getByRole('button', { name: /none of the above/i })).toBeInTheDocument()
  })

  it('toggles symptom selection', async () => {
    render(<SymptomPickerStep onContinue={vi.fn()} />)
    const btn = screen.getByRole('button', { name: 'Cough' })
    await userEvent.setup().click(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'true')
  })

  it('passes selected symptoms to onContinue', async () => {
    const onContinue = vi.fn()
    const user = userEvent.setup()
    render(<SymptomPickerStep onContinue={onContinue} />)
    await user.click(screen.getByRole('button', { name: 'Cough' }))
    await user.click(screen.getByRole('button', { name: 'Wheeze' }))
    await user.click(screen.getByRole('button', { name: /continue/i }))
    expect(onContinue).toHaveBeenCalledWith(['Cough', 'Wheeze'])
  })
})
