import Image from 'next/image'
import { getAssetPath } from './lib/utils'

export default function Home() {
  return (
    <div className="max-w-3xl">
      <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-8">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0">
            <Image
              src={getAssetPath("/cap.JPG")}
              alt="Kuan-Cheng Lung"
              width={160}
              height={160}
              className="w-full h-full object-cover rounded-full border-4 border-gray-200 shadow-lg"
              priority
            />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">Kuan-Cheng Lung</h1>
          <p className="text-lg text-gray-700 mb-4">
            Software Engineer with expertise in blockchain technology, full-stack development, and system optimization.
          </p>
          <a
            href={getAssetPath("/kuan-cheng-lung-resume.pdf")}
            download="Kuan-Cheng-Lung-Resume.pdf"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center md:justify-start">
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
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={getAssetPath("/uiuc.png")}
                  alt="UIUC Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">University of Illinois Urbana-Champaign (UIUC)</h3>
                  <span className="text-sm text-gray-600">[expected] Aug.2025 - Dec.2026</span>
                </div>
                <p className="text-gray-700">Master of Science in Information Management (MSIM)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={getAssetPath("/ntu.png")}
                  alt="NTU Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">National Taiwan University (NTU)</h3>
                  <span className="text-sm text-gray-600">Sept.2018 - June.2022</span>
                </div>
                <p className="text-gray-700">Bachelor of Laws</p>
              </div>
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
