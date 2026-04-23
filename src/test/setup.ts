import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import type { ReactNode } from 'react'

// Mock AnimatePresence to immediately unmount exiting children — jsdom
// never completes framer-motion's exit animations, which otherwise leaves
// stale DOM around and breaks role queries during step transitions.
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
  }
})
