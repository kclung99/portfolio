'use client'

import { useState } from 'react'
import Navigation from './components/Navigation'
import About from './components/About'
import Work from './components/Work'
import Projects from './components/Projects'

export default function Home() {
  const [activeTab, setActiveTab] = useState('about')

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <About />
      case 'work':
        return <Work />
      case 'projects':
        return <Projects />
      default:
        return <About />
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
