import Link from 'next/link'

export default function Work() {
  const experiences = [
    {
      id: "secux",
      title: "Software Engineer",
      company: "SecuX Technology",
      period: "May.2024 - June.2025",
      summary: "Led blockchain technology expansion and backend optimization for cryptocurrency wallet solutions."
    },
    {
      id: "psi",
      title: "Software Engineer",
      company: "Phoenix Silicon International Corporation",
      period: "Aug.2022 - Jan.2024",
      summary: "Led complete system overhaul of electronic wafer mapping systems for semiconductor manufacturing."
    }
  ]

  return (
    <div className="max-w-4xl">
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <Link href={`/work/${exp.id}`} className="text-base font-medium text-blue-600 underline hover:no-underline">
                {exp.company}
              </Link>
              <span className="text-sm text-gray-600 mt-1 sm:mt-0">{exp.period}</span>
            </div>
            <p className="text-gray-600 mb-1 text-sm">{exp.title}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{exp.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}