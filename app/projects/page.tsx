import Link from 'next/link'

export default function Projects() {
  const projects = [
    {
      id: "legal-flashcards",
      title: "Smart Flashcards for Legal Exam Preparation",
      summary: "Revolutionary AI-powered study tool that transforms legal exam preparation through intelligent content generation and adaptive learning."
    },
    {
      id: "copper-metal-drawing",
      title: "AI Optimization for Copper Metal Drawing Process",
      summary: "Groundbreaking research applying AI algorithms to optimize industrial copper metal drawing processes, achieving significant efficiency improvements."
    },
    {
      id: "elderly-limb-identification",
      title: "AI-Powered Elderly Limb Condition Monitoring System",
      summary: "Innovative AI-powered system for monitoring and identifying limb conditions in elderly patients, earning top recognition for both technical excellence and design innovation."
    }
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Projects</h1>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id}>
            <Link href={`/projects/${project.id}`} className="text-base font-medium text-blue-600 underline hover:no-underline">
              {project.title}
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mt-1">{project.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}