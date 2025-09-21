import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getMarkdownContent } from '../../lib/markdown'

interface WorkExperiencePageProps {
  params: {
    slug: string
  }
}

interface WorkExperience {
  title: string
  company: string
  period: string
  summary: string
}

export async function generateStaticParams() {
  return [
    { slug: 'secux' },
    { slug: 'psi' }
  ]
}

const workExperiences: Record<string, WorkExperience> = {
  secux: {
    title: "Software Engineer",
    company: "SecuX Technology",
    period: "May.2024 - June.2025",
    summary: "Led blockchain technology expansion and backend optimization for cryptocurrency wallet solutions."
  },
  psi: {
    title: "Software Engineer",
    company: "Phoenix Silicon International Corporation",
    period: "Aug.2022 - Jan.2024",
    summary: "Spearheaded complete system overhaul of electronic wafer mapping systems for semiconductor manufacturing."
  }
}

export default function WorkExperiencePage({ params }: WorkExperiencePageProps) {
  const markdownContent = getMarkdownContent('work', params.slug)
  const experience = workExperiences[params.slug]

  if (!markdownContent || !experience) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <article className="prose prose-gray max-w-none">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{experience.title}</h1>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h2 className="text-base text-gray-600">{experience.company}</h2>
            <span className="text-gray-600 text-sm">{experience.period}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{experience.summary}</p>
        </header>

        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => <h3 className="text-xl font-semibold mb-4 mt-8">{children}</h3>,
              h2: ({children}) => <h3 className="text-xl font-semibold mb-4 mt-8">{children}</h3>,
              h3: ({children}) => <h3 className="text-xl font-semibold mb-4 mt-8">{children}</h3>,
              p: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
              ul: ({children}) => <ul className="list-disc list-inside mb-4 text-gray-700">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-gray-700">{children}</ol>,
              li: ({children}) => <li className="mb-1">{children}</li>,
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