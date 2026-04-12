interface WelcomeStepProps {
  name: string
  onNameChange: (name: string) => void
  onContinue: () => void
}

export default function WelcomeStep({ name, onNameChange, onContinue }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-light text-teal-700 dark:text-teal-300">
          Deep Breath
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Your daily air &amp; wellbeing journal
        </p>
      </div>
      <div className="w-full max-w-xs">
        <label htmlFor="name-input" className="mb-2 block text-sm text-gray-600 dark:text-gray-400">
          What should we call you?
        </label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-center text-gray-800 outline-none transition-colors focus:border-teal-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
      >
        Continue
      </button>
    </div>
  )
}
