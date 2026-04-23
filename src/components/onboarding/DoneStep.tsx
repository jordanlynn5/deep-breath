import { Link } from 'react-router-dom'

interface DoneStepProps {
  name: string
}

export default function DoneStep({ name }: DoneStepProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10 text-teal-600 dark:text-teal-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          You're All Set!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {name ? `Welcome, ${name}! ` : ''}Time to take your first breath check-in.
        </p>
      </div>
      <Link
        to="/checkin"
        className="rounded-full bg-teal-500 px-8 py-3 text-white transition-colors hover:bg-teal-600"
      >
        Start Check-in
      </Link>
    </div>
  )
}
