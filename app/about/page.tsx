export default function About() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Kuan-Cheng Lung</h1>

      <div className="space-y-6">
        <div>
          <p className="text-lg text-gray-700 mb-4">
            Software Engineer with expertise in blockchain technology, full-stack development, and system optimization.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <a href="tel:+15303767858" className="hover:text-black transition-colors">
              +1 (530) 376-7858
            </a>
            <a href="mailto:kclung99@gmail.com" className="hover:text-black transition-colors">
              kclung99@gmail.com
            </a>
            <a href="https://github.com/kclung99" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              github.com/kclung99
            </a>
            <a href="https://www.linkedin.com/in/kclung99" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              linkedin.com/in/kclung99
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">University of Illinois Urbana-Champaign (UIUC)</h3>
                <span className="text-sm text-gray-600">[expected] Aug.2025 - Dec.2026</span>
              </div>
              <p className="text-gray-700">Master of Science in Information Management (MSIM)</p>
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">National Taiwan University (NTU)</h3>
                <span className="text-sm text-gray-600">Sept.2018 - June.2022</span>
              </div>
              <p className="text-gray-700">Bachelor of Laws</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Skills & Technical Knowledge</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">Languages</h3>
              <p className="text-sm text-gray-700">Python, Java, C#, JavaScript/TypeScript, Solidity, HTML/CSS</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Frameworks & Tools</h3>
              <p className="text-sm text-gray-700">ASP.NET Core, Spring, Next.js, Node.js, Docker, Git</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Databases</h3>
              <p className="text-sm text-gray-700">PostgreSQL, SQL Server, Oracle Database</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}