
export default function Home() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">hi, I'm ... KC</h1>
        <p className="text-sm text-gray-600 mb-6">
          Software Engineer with expertise in blockchain technology, full-stack development, and system optimization.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
          <div className="space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="font-medium text-base">SecuX Technology</h3>
                <span className="text-sm text-gray-600 mt-1 sm:mt-0">May.2024 - June.2025</span>
              </div>
              <p className="text-gray-600 mb-1 text-sm">Software Engineer</p>
              <p className="text-gray-600 text-sm">Led blockchain technology expansion and backend optimization for cryptocurrency wallet solutions.</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="font-medium text-base">Phoenix Silicon International Corporation</h3>
                <span className="text-sm text-gray-600 mt-1 sm:mt-0">Aug.2022 - Jan.2024</span>
              </div>
              <p className="text-gray-600 mb-1 text-sm">Software Engineer</p>
              <p className="text-gray-600 text-sm">Spearheaded complete system overhaul of electronic wafer mapping systems for semiconductor manufacturing.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="font-medium text-base">University of Illinois Urbana-Champaign (UIUC)</h3>
                <span className="text-sm text-gray-600 mt-1 sm:mt-0">[expected] Aug.2025 - Dec.2026</span>
              </div>
              <p className="text-gray-600 text-sm">Master of Science in Information Management (MSIM)</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="font-medium text-base">National Taiwan University (NTU)</h3>
                <span className="text-sm text-gray-600 mt-1 sm:mt-0">Sept.2018 - June.2022</span>
              </div>
              <p className="text-gray-600 text-sm">Bachelor of Laws</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
