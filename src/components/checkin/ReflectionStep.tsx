import { useState } from 'react'

interface ReflectionStepProps {
  onSubmit: (reflection: string) => void
  onSkip: () => void
}

export default function ReflectionStep({ onSubmit, onSkip }: ReflectionStepProps) {
  const [text, setText] = useState('')

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          How are you feeling?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Optional — a few words about your day.
        </p>
      </div>
      <label htmlFor="reflection-input" className="sr-only">
        Reflection
      </label>
      <textarea
        id="reflection-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Anything on your mind..."
        rows={6}
        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition-colors focus:border-teal-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      />
      <div className="mt-auto flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full px-6 py-2.5 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={() => onSubmit(text)}
          className="rounded-full bg-teal-500 px-8 py-2.5 text-white transition-colors hover:bg-teal-600"
        >
          Next
        </button>
      </div>
    </div>
  )
}
