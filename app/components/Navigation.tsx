'use client'

import { useState } from 'react'

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = ['about', 'work', 'projects']

  return (
    <nav className="border-b border-gray-200 mb-8">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
              activeTab === tab
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  )
}