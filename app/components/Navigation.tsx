'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const tabs = [
    { name: 'about', path: '/' },
    { name: 'work', path: '/work' },
    { name: 'projects', path: '/projects' }
  ]

  return (
    <nav className="border-b border-gray-200 mb-8">
      <div className="flex justify-center space-x-8">
        {tabs.map((tab) => {
          const isActive = mounted && (pathname === tab.path || (tab.path === '/' && pathname === '/'))
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