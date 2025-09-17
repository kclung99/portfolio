import { notFound } from 'next/navigation'
import Link from 'next/link'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

interface Project {
  title: string
  summary: string
  technologies: string[]
  content: {
    overview: string
    sections: Array<{
      title: string
      content: string
    }>
  }
}

export async function generateStaticParams() {
  return [
    { slug: 'legal-flashcards' }
  ]
}

const projects: Record<string, Project> = {
  "legal-flashcards": {
    title: "Smart Flashcards for Legal Exam Preparation",
    summary: "Revolutionary AI-powered study tool that transforms legal exam preparation through intelligent content generation and adaptive learning.",
    technologies: ["AI/ML", "NoSQL", "Real-time Sync", "Cross-device Development", "Natural Language Processing"],
    content: {
      overview: "The Smart Flashcards application represents a breakthrough in legal education technology, specifically designed to address the unique challenges of bar exam preparation. By leveraging advanced AI algorithms and domain-specific knowledge processing, this application transforms the traditional study experience into an intelligent, adaptive learning system.",
      sections: [
        {
          title: "AI-Powered Content Generation",
          content: "Engineered an AI-powered flashcard app tailored for bar exam prep, cutting notetaking time by 30% and automating flashcard generation to accelerate study workflows. The system uses natural language processing to extract key legal concepts and automatically generate relevant study materials, eliminating the manual effort traditionally required in flashcard creation."
        },
        {
          title: "Legal-Domain Processing Pipeline",
          content: "Architected a legal-domain-specific processing pipeline with automated referencing, reducing search time by 30% and overcoming limitations of general-purpose AI models. This specialized pipeline understands legal terminology, case law structures, and statutory references, providing more accurate and contextually relevant study materials than generic AI solutions."
        },
        {
          title: "Adaptive Spaced Repetition",
          content: "Devised and deployed a custom spaced-repetition algorithm with NoSQL-backed real-time sync, boosting recall accuracy by up to 80% and delivering seamless cross-device study experiences. The algorithm adapts to individual learning patterns, optimizing review schedules based on performance metrics and ensuring maximum retention efficiency."
        },
        {
          title: "Technical Architecture",
          content: "Built on a scalable cloud infrastructure utilizing NoSQL databases for flexible data modeling and real-time synchronization across multiple devices. The application features offline capabilities, ensuring uninterrupted study sessions regardless of connectivity, with automatic sync when connection is restored."
        }
      ]
    }
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects[params.slug]

  if (!project) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link
          href="/projects"
          className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
        >
          ← Back to Projects
        </Link>
      </div>

      <article className="prose prose-gray max-w-none">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">{project.summary}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{project.content.overview}</p>
          </section>

          {project.content.sections.map((section, index) => (
            <section key={index}>
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}