export default function Projects() {
  const project = {
    title: "Smart Flashcards for Legal Exam Preparation",
    description: "An AI-powered flashcard application tailored for bar exam preparation, featuring intelligent content generation and spaced repetition algorithms.",
    achievements: [
      "Engineered an AI-powered flashcard app tailored for bar exam prep, cutting notetaking time by 30% and automating flashcard generation to accelerate study workflows.",
      "Architected a legal-domain-specific processing pipeline with automated referencing, reducing search time by 30% and overcoming limitations of general-purpose AI models.",
      "Devised and deployed a custom spaced-repetition algorithm with NoSQL-backed real-time sync, boosting recall accuracy by up to 80% and delivering seamless cross-device study experiences."
    ],
    technologies: ["AI/ML", "NoSQL", "Real-time Sync", "Cross-device Development", "Natural Language Processing"]
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>

      <div className="border-l-2 border-gray-200 pl-6">
        <h2 className="text-xl font-semibold mb-3">{project.title}</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Key Achievements</h3>
          <ul className="space-y-2">
            {project.achievements.map((achievement, index) => (
              <li key={index} className="text-gray-700 text-sm leading-relaxed">
                • {achievement}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}