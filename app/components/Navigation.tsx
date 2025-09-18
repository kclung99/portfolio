'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const tabs = [
    { name: 'about', path: '/' },
    { name: 'work', path: '/work' },
    { name: 'projects', path: '/projects' },
    { name: 'awards', path: '/awards' }
  ]

  return (
    <nav className="border-b border-gray-200 mb-8">
      <div className="flex space-x-8">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || (tab.path === '/' && pathname === '/')
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                isActive
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}