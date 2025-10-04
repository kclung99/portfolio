import { notFound } from 'next/navigation'
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

export default async function WorkExperiencePage({ params }: WorkExperiencePageProps) {
  const { slug } = await params
  const markdownContent = getMarkdownContent('work', slug)
  const experience = workExperiences[slug]

  if (!markdownContent || !experience) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <article className="prose prose-gray max-w-none">
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
              em: ({children}) => {
                // Check if this is a figure caption (starts with "Figure")
                const text = children?.toString() || '';
                if (text.startsWith('Figure')) {
                  return <em className="italic text-gray-600 block text-center">{children}</em>;
                }
                return <em className="italic">{children}</em>;
              },
              code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>,
              pre: ({children}) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
              img: ({src, alt}) => <img src={src} alt={alt} className="w-auto h-80 mx-auto my-5 block" />,
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}