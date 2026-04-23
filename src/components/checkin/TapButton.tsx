import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type TapButtonVariant = 'rating' | 'symptom'

interface TapButtonProps {
  selected: boolean
  onClick: () => void
  variant?: TapButtonVariant
  ariaLabel?: string
  children: ReactNode
}

export default function TapButton({
  selected,
  onClick,
  variant = 'rating',
  ariaLabel,
  children,
}: TapButtonProps) {
  const base =
    'flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400'

  const variantClass =
    variant === 'rating'
      ? `h-14 w-14 rounded-full text-lg ${
          selected
            ? 'bg-teal-500 text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-teal-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }`
      : `h-20 rounded-xl px-4 text-sm ${
          selected
            ? 'bg-teal-500 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-teal-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }`

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={`${base} ${variantClass}`}
    >
      {children}
    </motion.button>
  )
}
