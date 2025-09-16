import { notFound } from 'next/navigation'
import Link from 'next/link'

interface AwardPageProps {
  params: {
    slug: string
  }
}

const awards: Record<string, any> = {
  "copper-metal-drawing": {
    title: "Application of Artificial Intelligence Technology in the Optimization of Copper Metal Drawing Process",
    type: "Best Conference Paper Award",
    event: "2024 International Conference on Technology, Leisure, and Humanities Management Application Techniques",
    location: "Taiwan",
    year: "2024",
    summary: "Groundbreaking research applying AI algorithms to optimize industrial copper metal drawing processes, achieving significant efficiency improvements.",
    content: {
      overview: "This research represents a significant advancement in the application of artificial intelligence to industrial manufacturing processes. By developing novel AI optimization algorithms specifically tailored for copper metal drawing operations, this work demonstrates how machine learning can revolutionize traditional manufacturing workflows and achieve measurable improvements in efficiency and quality.",
      sections: [
        {
          title: "Research Background",
          content: "Copper metal drawing is a critical process in manufacturing industries, traditionally relying on manual optimization and experience-based adjustments. The inherent complexity of the process, involving multiple variables such as temperature, pressure, speed, and material properties, makes it an ideal candidate for AI-driven optimization. This research addressed the gap between traditional manufacturing methods and modern computational intelligence."
        },
        {
          title: "AI Algorithm Development",
          content: "The core innovation lies in the development of specialized machine learning algorithms that can analyze real-time process data and dynamically adjust parameters for optimal performance. These algorithms were trained on extensive datasets of historical process data, incorporating both successful and suboptimal outcomes to learn the complex relationships between input parameters and output quality."
        },
        {
          title: "Implementation and Results",
          content: "The AI system was successfully implemented in real manufacturing environments, demonstrating measurable improvements in process efficiency, material waste reduction, and product quality consistency. The research validated the practical applicability of AI in traditional manufacturing settings and provided a framework for similar applications across other industrial processes."
        },
        {
          title: "Industry Impact",
          content: "This work has significant implications for the manufacturing industry, offering a pathway to modernize traditional processes through intelligent automation. The research has been recognized by industry experts and academic peers, earning the Best Conference Paper Award among international submissions, highlighting its contribution to both theoretical knowledge and practical applications."
        }
      ]
    }
  },
  "elderly-limb-identification": {
    title: "Application of Artificial Intelligence in the Development of the Identification System of the Limb State of Elderly",
    type: "Gold Medal & Best Product Design",
    event: "2022 KIDE Kaohsiung International Invention and Design Exhibition",
    location: "Kaohsiung",
    year: "2022",
    summary: "Innovative AI-powered system for monitoring and identifying limb conditions in elderly patients, earning top recognition for both technical excellence and design innovation.",
    content: {
      overview: "This project addresses a critical healthcare challenge by developing an intelligent system for monitoring and assessing limb conditions in elderly populations. Combining advanced computer vision, machine learning algorithms, and user-centered design principles, the system provides healthcare professionals with accurate, non-invasive tools for early detection and continuous monitoring of age-related mobility issues.",
      sections: [
        {
          title: "Healthcare Challenge",
          content: "Age-related limb conditions and mobility issues are increasingly prevalent in aging populations worldwide. Early detection and continuous monitoring are crucial for maintaining quality of life and preventing serious complications. However, traditional assessment methods are often subjective, time-consuming, and require specialized expertise that may not be readily available in all healthcare settings."
        },
        {
          title: "AI-Powered Solution",
          content: "The developed system utilizes advanced computer vision and machine learning techniques to analyze limb movement patterns, identify potential issues, and provide objective assessments. The AI algorithms were trained on diverse datasets to ensure accuracy across different demographics and condition types, enabling reliable detection of early-stage mobility issues that might be missed by conventional methods."
        },
        {
          title: "User-Centered Design",
          content: "Beyond technical innovation, the project emphasized user experience design, ensuring the system is accessible and intuitive for both healthcare professionals and elderly users. The interface design considers the specific needs and limitations of elderly users, incorporating principles of accessibility and ease of use without compromising on functionality or accuracy."
        },
        {
          title: "Recognition and Impact",
          content: "The project's success was recognized with dual awards: Gold Medal for technical excellence and Best Product Design for innovation in user experience. This recognition from the international invention and design community validates both the technical merit of the AI system and its potential for real-world healthcare applications, demonstrating how technology can be effectively designed to serve vulnerable populations."
        }
      ]
    }
  }
}

export default function AwardPage({ params }: AwardPageProps) {
  const award = awards[params.slug]

  if (!award) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link
          href="/awards"
          className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
        >
          ← Back to Awards
        </Link>
      </div>

      <article className="prose prose-gray max-w-none">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
              {award.type}
            </span>
            <span className="text-gray-500">{award.year}</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{award.title}</h1>
          <p className="text-gray-600 mb-4">
            {award.event} • {award.location}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">{award.summary}</p>
        </header>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{award.content.overview}</p>
          </section>

          {award.content.sections.map((section: any, index: number) => (
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