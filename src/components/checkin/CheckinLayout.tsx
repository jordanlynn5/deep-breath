import type { ReactNode } from 'react'
import StepIndicator from './StepIndicator'

interface CheckinLayoutProps {
  currentStep: number
  totalSteps: number
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  nextDisabled?: boolean
  children: ReactNode
}

export default function CheckinLayout({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  nextLabel = 'Next',
  nextDisabled = false,
  children,
}: CheckinLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col gap-6 py-4">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <div className="flex flex-1 flex-col">{children}</div>
      {(onBack || onNext) && (
        <div className="flex items-center justify-between gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="rounded-full px-6 py-2.5 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Back
            </button>
          ) : (
            <span />
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              className="rounded-full bg-teal-500 px-8 py-2.5 text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {nextLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
