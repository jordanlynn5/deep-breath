interface BranchStepProps {
  onAnswer: (hasSymptoms: boolean) => void
}

export default function BranchStep({ onAnswer }: BranchStepProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          Any respiratory symptoms today?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Coughing, shortness of breath, chest tightness, etc.
        </p>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onAnswer(false)}
          className="flex h-24 w-32 items-center justify-center rounded-2xl bg-white text-lg font-medium text-gray-700 transition-colors hover:bg-teal-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          No
        </button>
        <button
          type="button"
          onClick={() => onAnswer(true)}
          className="flex h-24 w-32 items-center justify-center rounded-2xl bg-white text-lg font-medium text-gray-700 transition-colors hover:bg-teal-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Yes
        </button>
      </div>
    </div>
  )
}
