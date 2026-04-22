import { render, screen } from '@/test/test-utils'
import { describe, it, expect } from 'vitest'
import PageTransition from './PageTransition'

describe('PageTransition', () => {
  it('renders children', () => {
    render(
      <PageTransition>
        <p>Page content</p>
      </PageTransition>,
    )
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })
})
