import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '../lib/utils'

export default function Work() {
  const experiences = [
    {
      id: "secux",
      title: "Software Engineer",
      company: "SecuX Technology",
      period: "May.2024 - June.2025",
      summary: "Led blockchain technology expansion and backend optimization for cryptocurrency wallet solutions.",
      logo: getAssetPath("/secux.jpg"),
      highlights: [
        "Doubled supported blockchain networks within 6 months",
        "Generated tens of thousands in monthly revenue through swap service",
        "Achieved 20x throughput improvement through optimization"
      ]
    },
    {
      id: "psi",
      title: "Software Engineer",
      company: "Phoenix Silicon International Corporation",
      period: "Aug.2022 - Jan.2024",
      summary: "Spearheaded complete system overhaul of electronic wafer mapping systems for semiconductor manufacturing.",
      logo: getAssetPath("/psi.png"),
      highlights: [
        "90x improvement in processing speed",
        "50% reduction in data storage",
        "92% reduction in scheduling trigger time"
      ]
    }
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Professional Experience</h1>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <Link key={exp.id} href={`/work/${exp.id}`}>
            <div className="group cursor-pointer border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} Logo`}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                        {exp.title}
                      </h2>
                      <h3 className="text-lg text-gray-700">{exp.company}</h3>
                    </div>
                    <span className="text-sm text-gray-600 mt-1 sm:mt-0">{exp.period}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{exp.summary}</p>

              <div className="space-y-1">
                {exp.highlights.map((highlight, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {highlight}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-blue-600 group-hover:text-blue-700 transition-colors">
                Read more →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}