import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-teal-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="mx-auto w-full max-w-md flex-1 px-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
