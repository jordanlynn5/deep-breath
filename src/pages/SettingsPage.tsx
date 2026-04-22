import { useState } from 'react'
import { getProfile, saveProfile } from '@/utils/storage'

interface EditableRowProps {
  label: string
  value: string
  onSave: (val: string) => void
}

function EditableRow({ label, value, onSave }: EditableRowProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const commit = () => {
    if (draft.trim()) onSave(draft.trim())
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 text-sm">
        <span className="w-24 shrink-0 text-gray-600 dark:text-gray-400">{label}</span>
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && commit()}
          className="flex-1 rounded-lg border border-teal-300 bg-white px-2 py-1 text-gray-800 outline-none dark:bg-gray-700 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={commit}
          className="text-teal-600 hover:text-teal-700 dark:text-teal-400"
        >
          Save
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => { setDraft(value); setEditing(true) }}
      className="flex w-full items-center justify-between px-4 py-3 text-sm text-left hover:bg-teal-50 dark:hover:bg-gray-700/50 transition-colors"
    >
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 dark:text-gray-200">{value} <span className="ml-1 text-xs text-teal-500">Edit</span></span>
    </button>
  )
}

function StaticRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 text-sm ${!last ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 dark:text-gray-200">{value}</span>
    </div>
  )
}

export default function SettingsPage() {
  const profile = getProfile()
  const [name, setName] = useState(profile?.name || 'You')
  const [city, setCity] = useState(profile?.city || '')

  const handleSaveName = (val: string) => {
    setName(val)
    saveProfile({ name: val })
  }

  const handleSaveCity = (val: string) => {
    setCity(val)
    saveProfile({ city: val })
  }

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-light text-gray-800 dark:text-gray-100">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Preferences and data.
        </p>
      </div>

      {/* Profile */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Profile</h2>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
          <EditableRow label="Name" value={name} onSave={handleSaveName} />
          <EditableRow label="Location" value={city || 'Not set'} onSave={handleSaveCity} />
        </div>
      </section>

      {/* Notifications */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Notifications</h2>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
          <StaticRow label="Daily reminder" value="9:00 PM" />
          <StaticRow label="Permission" value="Enabled" last />
        </div>
      </section>

      {/* Appearance */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Appearance</h2>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
          <StaticRow label="Theme" value="Auto" last />
        </div>
      </section>

      {/* Data */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Data</h2>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
          <StaticRow label="Check-ins" value="23" />
          <StaticRow label="Storage" value="localStorage" last />
        </div>
      </section>

      {/* About */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">About</h2>
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
          <StaticRow label="Version" value="0.1.0" />
          <StaticRow label="Built for" value="EcoHack 2026" last />
        </div>
      </section>
    </div>
  )
}
