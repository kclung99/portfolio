import Link from 'next/link'

export default function Awards() {
  const awards = [
    {
      id: "copper-metal-drawing",
      title: "Application of Artificial Intelligence Technology in the Optimization of Copper Metal Drawing Process",
      type: "Best Conference Paper Award",
      event: "2024 International Conference on Technology, Leisure, and Humanities Management Application Techniques",
      location: "Taiwan",
      year: "2024",
      summary: "Groundbreaking research applying AI algorithms to optimize industrial copper metal drawing processes, achieving significant efficiency improvements.",
      highlights: [
        "Developed novel AI optimization algorithms for metal drawing processes",
        "Achieved measurable improvements in industrial manufacturing efficiency",
        "Recognized as best paper among international research submissions"
      ]
    },
    {
      id: "elderly-limb-identification",
      title: "Application of Artificial Intelligence in the Development of the Identification System of the Limb State of Elderly",
      type: "Gold Medal & Best Product Design",
      event: "2022 KIDE Kaohsiung International Invention and Design Exhibition",
      location: "Kaohsiung",
      year: "2022",
      summary: "Innovative AI-powered system for monitoring and identifying limb conditions in elderly patients, earning top recognition for both technical excellence and design innovation.",
      highlights: [
        "Created AI system for elderly healthcare monitoring",
        "Won both Gold Medal and Best Product Design awards",
        "Combined technical innovation with user-centered design principles"
      ]
    }
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Awards</h1>

      <div className="space-y-6">
        {awards.map((award) => (
          <Link key={award.id} href={`/awards/${award.id}`}>
            <div className="group cursor-pointer border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all">
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                    {award.type}
                  </span>
                  <span className="text-sm text-gray-500">{award.year}</span>
                </div>
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors mb-2">
                  {award.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {award.event} • {award.location}
                </p>
                <p className="text-gray-700 leading-relaxed">{award.summary}</p>
              </div>

              <div className="space-y-1 mb-4">
                {award.highlights.map((highlight, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {highlight}
                  </div>
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