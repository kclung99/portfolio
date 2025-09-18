import Link from 'next/link'

export default function Projects() {
  const projects = [
    {
      id: "legal-flashcards",
      title: "Smart Flashcards for Legal Exam Preparation",
      summary: "Revolutionary AI-powered study tool that transforms legal exam preparation through intelligent content generation and adaptive learning.",
      highlights: [
        "30% reduction in notetaking time through automated flashcard generation",
        "30% faster search with legal-domain-specific processing pipeline",
        "80% improvement in recall accuracy with custom spaced-repetition algorithm"
      ],
      technologies: ["AI/ML", "NoSQL", "Real-time Sync", "Cross-device Development", "Natural Language Processing"]
    },
    {
      id: "copper-metal-drawing",
      title: "AI Optimization for Copper Metal Drawing Process",
      summary: "Groundbreaking research applying AI algorithms to optimize industrial copper metal drawing processes, achieving significant efficiency improvements.",
      highlights: [
        "Developed novel AI optimization algorithms for metal drawing processes",
        "Achieved measurable improvements in industrial manufacturing efficiency",
        "Recognized as best paper among international research submissions"
      ],
      technologies: ["AI/ML", "Manufacturing Optimization", "Process Control", "Data Analytics"]
    },
    {
      id: "elderly-limb-identification",
      title: "AI-Powered Elderly Limb Condition Monitoring System",
      summary: "Innovative AI-powered system for monitoring and identifying limb conditions in elderly patients, earning top recognition for both technical excellence and design innovation.",
      highlights: [
        "Created AI system for elderly healthcare monitoring",
        "Won both Gold Medal and Best Product Design awards",
        "Combined technical innovation with user-centered design principles"
      ],
      technologies: ["AI/ML", "Computer Vision", "Healthcare Technology", "User Experience Design"]
    }
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>

      <div className="space-y-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className="group cursor-pointer border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all">
              <div className="mb-4">
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{project.summary}</p>
              </div>

              <div className="space-y-1 mb-4">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {highlight}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="text-sm text-blue-600 group-hover:text-blue-700 transition-colors">
                Read more →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}