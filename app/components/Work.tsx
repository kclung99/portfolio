export default function Work() {
  const experiences = [
    {
      title: "Software Engineer",
      company: "SecuX Technology",
      period: "May.2024 - June.2025",
      achievements: [
        "Spearheaded the expansion of blockchain network support in the company's cold-wallet application, doubling supported networks within six months, resulting in 34% overall transaction volume growth.",
        "Directed backend development of a new swap service generating tens of thousands in monthly revenue, architecting a universal provider interface and overseeing the full transaction pipeline and asset handling.",
        "Optimized backend performance by implementing concurrency mechanisms and caching strategies, reducing request overhead by 50% and achieving nearly 20x throughput improvement.",
        "Developed a decentralized identification (DID) system, contributing to system architecture, deployment, and testing, which secured two government-funded projects valued at tens of thousands annually."
      ]
    },
    {
      title: "Software Engineer",
      company: "Phoenix Silicon International Corporation",
      period: "Aug.2022 - Jan.2024",
      achievements: [
        "Led the complete overhaul of the electronic wafer map (eMap) system, replacing 30+ legacy programs, achieving a 90x improvement in processing speed, saving the company tens of thousands annually.",
        "Engineered a scalable relational database that reduced data storage by 50%, minimized overhead, enhanced consistency, and ensured long-term operational scalability.",
        "Designed and implemented a high-performance E-Map processing pipeline that optimizes resource utilization, reducing scheduling trigger time by 92% and significantly enhancing operational efficiency."
      ]
    }
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Professional Experience</h1>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-gray-200 pl-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
              <div>
                <h2 className="text-xl font-semibold">{exp.title}</h2>
                <h3 className="text-lg text-gray-700">{exp.company}</h3>
              </div>
              <span className="text-sm text-gray-600 mt-1 sm:mt-0">{exp.period}</span>
            </div>

            <ul className="space-y-2">
              {exp.achievements.map((achievement, achievementIndex) => (
                <li key={achievementIndex} className="text-gray-700 text-sm leading-relaxed">
                  • {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}