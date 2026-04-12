interface NotificationPermissionStepProps {
  onEnable: () => void
  onSkip: () => void
}

export default function NotificationPermissionStep({ onEnable, onSkip }: NotificationPermissionStepProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-teal-600 dark:text-teal-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          Enable Notifications
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Get a gentle reminder to check in each day. You can change this anytime in Settings.
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <button
          type="button"
          onClick={onEnable}
          className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
        >
          Enable Notifications
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full px-8 py-3 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Not Now
        </button>
      </div>
    </div>
  )
}
