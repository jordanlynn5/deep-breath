interface Section {
  title: string
  items: { label: string; value: string }[]
}

const sections: Section[] = [
  {
    title: 'Profile',
    items: [
      { label: 'Name', value: 'Jordan' },
      { label: 'Location', value: 'Oakland, CA' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { label: 'Daily reminder', value: '9:00 PM' },
      { label: 'Permission', value: 'Enabled' },
    ],
  },
  {
    title: 'Appearance',
    items: [{ label: 'Theme', value: 'Auto' }],
  },
  {
    title: 'Data',
    items: [
      { label: 'Check-ins', value: '23' },
      { label: 'Storage', value: 'localStorage' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Version', value: '0.1.0' },
      { label: 'Built for', value: 'EcoHack 2026' },
    ],
  },
]

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-light text-gray-800 dark:text-gray-100">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Preferences and data.
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-2">
          <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {section.title}
          </h2>
          <div className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
            {section.items.map((item, idx) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-4 py-3 text-sm ${
                  idx !== section.items.length - 1
                    ? 'border-b border-gray-100 dark:border-gray-700'
                    : ''
                }`}
              >
                <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
