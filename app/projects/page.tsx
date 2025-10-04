import Link from 'next/link'

export default function Projects() {
  const projects = [
    {
      id: "legal-flashcards",
      title: "Smart Flashcards for Legal Exam Preparation",
      period: "Nov.2024 - Mar.2025",
      summary: "AI-powered study tool that transforms legal exam preparation through intelligent content generation and adaptive learning."
    },
    {
      id: "copper-metal-drawing",
      title: "AI Optimization for Copper Metal Drawing Process",
      period: "Aug.2024 - Oct.2024",
      summary: "Applying AI algorithms to optimize industrial copper metal drawing processes, achieving significant efficiency improvements."
    },
    {
      id: "elderly-limb-identification",
      title: "AI-Powered Elderly Limb Condition Monitoring System",
      period: "Aug.2022 - Oct.2022",
      summary: "AI-powered system for monitoring and identifying limb conditions in elderly patients, earning top recognition for both technical excellence and design innovation."
    }
  ]

  return (
    <div className="max-w-4xl">
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <div className="text-base font-medium">{project.title}</div>
              <span className="text-sm text-gray-600 mt-1 sm:mt-0">{project.period}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{project.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}