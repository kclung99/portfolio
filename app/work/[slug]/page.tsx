import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '../../lib/utils'

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
  logo: string
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
    { slug: 'secux' },
    { slug: 'psi' }
  ]
}

const workExperiences: Record<string, WorkExperience> = {
  secux: {
    title: "Software Engineer",
    company: "SecuX Technology",
    period: "May.2024 - June.2025",
    summary: "Led blockchain technology expansion and backend optimization for cryptocurrency wallet solutions.",
    logo: getAssetPath("/secux.jpg"),
    content: {
      overview: "During my time at SecuX Technology, I spearheaded multiple high-impact initiatives that significantly enhanced the company's blockchain wallet solutions and backend infrastructure. My work directly contributed to substantial revenue growth and operational improvements.",
      sections: [
        {
          title: "Blockchain Network Expansion",
          content: "Spearheaded the expansion of blockchain network support in the company's cold-wallet application, doubling supported networks within six months, resulting in 34% overall transaction volume growth. This involved deep integration with various blockchain protocols and ensuring secure transaction handling across multiple networks."
        },
        {
          title: "Swap Service Development",
          content: "Directed backend development of a new swap service generating tens of thousands in monthly revenue, architecting a universal provider interface and overseeing the full transaction pipeline and asset handling. The service enables seamless cryptocurrency exchanges within the wallet ecosystem."
        },
        {
          title: "Performance Optimization",
          content: "Optimized backend performance by implementing concurrency mechanisms and caching strategies, reducing request overhead by 50% and achieving nearly 20x throughput improvement. These optimizations significantly enhanced user experience and system scalability."
        },
        {
          title: "DID System Development",
          content: "Developed a decentralized identification (DID) system, contributing to system architecture, deployment, and testing, which secured two government-funded projects valued at tens of thousands annually. This work positioned the company at the forefront of decentralized identity solutions."
        }
      ]
    }
  },
  psi: {
    title: "Software Engineer",
    company: "Phoenix Silicon International Corporation",
    period: "Aug.2022 - Jan.2024",
    summary: "Spearheaded complete system overhaul of electronic wafer mapping systems for semiconductor manufacturing.",
    logo: getAssetPath("/psi.png"),
    content: {
      overview: "At Phoenix Silicon International Corporation, I led a comprehensive transformation of the company's electronic wafer mapping (eMap) infrastructure. This project involved replacing legacy systems with modern, high-performance solutions that dramatically improved operational efficiency and cost savings.",
      sections: [
        {
          title: "System Overhaul Project",
          content: "Led the complete overhaul of the electronic wafer map (eMap) system, replacing 30+ legacy programs, achieving a 90x improvement in processing speed, saving the company tens of thousands annually. This massive undertaking required careful planning, phased implementation, and extensive testing to ensure zero downtime during the transition."
        },
        {
          title: "Database Engineering",
          content: "Engineered a scalable relational database that reduced data storage by 50%, minimized overhead, enhanced consistency, and ensured long-term operational scalability. The new database architecture significantly improved data integrity and query performance across the organization."
        },
        {
          title: "Processing Pipeline Optimization",
          content: "Designed and implemented a high-performance E-Map processing pipeline that optimizes resource utilization, reducing scheduling trigger time by 92% and significantly enhancing operational efficiency. This pipeline became a critical component of the company's manufacturing workflow."
        }
      ]
    }
  }
}

export default function WorkExperiencePage({ params }: WorkExperiencePageProps) {
  const experience = workExperiences[params.slug]

  if (!experience) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link
          href="/work"
          className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
        >
          ← Back to Work Experience
        </Link>
      </div>

      <article className="prose prose-gray max-w-none">
        <header className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <Image
                src={experience.logo}
                alt={`${experience.company} Logo`}
                width={64}
                height={64}
                className="w-16 h-16 object-contain rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h2 className="text-xl text-gray-700">{experience.company}</h2>
                <span className="text-gray-600">{experience.period}</span>
              </div>
            </div>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">{experience.summary}</p>
        </header>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{experience.content.overview}</p>
          </section>

          {experience.content.sections.map((section, index) => (
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