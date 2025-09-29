import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getMarkdownContent } from '../../lib/markdown'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

interface Project {
  title: string
  summary: string
  technologies: string[]
}

export async function generateStaticParams() {
  return [
    { slug: 'legal-flashcards' },
    { slug: 'copper-metal-drawing' },
    { slug: 'elderly-limb-identification' }
  ]
}

const projects: Record<string, Project> = {
  "legal-flashcards": {
    title: "Smart Flashcards for Legal Exam Preparation",
    summary: "Revolutionary AI-powered study tool that transforms legal exam preparation through intelligent content generation and adaptive learning.",
    technologies: ["AI/ML", "NoSQL", "Real-time Sync", "Cross-device Development", "Natural Language Processing"]
  },
  "copper-metal-drawing": {
    title: "AI Optimization for Copper Metal Drawing Process",
    summary: "Groundbreaking research applying AI algorithms to optimize industrial copper metal drawing processes, achieving significant efficiency improvements.",
    technologies: ["AI/ML", "Manufacturing Optimization", "Process Control", "Data Analytics"]
  },
  "elderly-limb-identification": {
    title: "AI-Powered Elderly Limb Condition Monitoring System",
    summary: "Innovative AI-powered system for monitoring and identifying limb conditions in elderly patients, earning top recognition for both technical excellence and design innovation.",
    technologies: ["AI/ML", "Computer Vision", "Healthcare Technology", "User Experience Design"]
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const markdownContent = getMarkdownContent('projects', slug)
  const project = projects[slug]

  if (!markdownContent || !project) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <article className="prose prose-gray max-w-none">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{project.summary}</p>

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

        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => <h3 className="text-2xl font-semibold mb-4 mt-8">{children}</h3>,
              h2: ({children}) => <h3 className="text-base font-semibold mb-4 mt-8">{children}</h3>,
              h3: ({children}) => <h3 className="text-base font-semibold mb-4 mt-8">{children}</h3>,
              p: ({children}) => <p className="text-sm text-gray-700 leading-relaxed mb-4">{children}</p>,
              ul: ({children}) => <ul className="list-disc list-inside mb-4 text-sm text-gray-700 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:ml-4 [&_ul]:mb-2">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-sm text-gray-700">{children}</ol>,
              li: ({children}) => <li className="mb-1 text-sm leading-relaxed">{children}</li>,
              strong: ({children}) => <strong className="font-semibold">{children}</strong>,
              em: ({children}) => <em className="italic">{children}</em>,
              code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>,
              pre: ({children}) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}