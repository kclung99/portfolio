import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">hi, I&apos;m ... KC</h1>
        <p className="text-sm text-gray-600 mb-6">
          currently a grad student @ uiuc.  <br />
          <br />
          I&apos;m a software engineer working with backend and blockchain mainly.  <br />
          <Link href="/work" className="text-blue-600 underline hover:no-underline">here</Link>&apos;s a more detailed look at what I&apos;ve worked on. <br />
          <br />
          I also explore random stuffs on the side, tech or not. <br />
          you can check out those projects <Link href="/projects" className="text-blue-600 underline hover:no-underline">here</Link>.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-4">work experience</h3>
          <div className="space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="font-medium text-base">SecuX Technology</h3>
                <span className="text-sm text-gray-600 mt-1 sm:mt-0">May.2024 - June.2025</span>
              </div>
              <p className="text-gray-600 mb-1 text-sm">Software Engineer</p><br />
              <p className="text-gray-600 text-sm">I owned the entire backend service for our cold wallet app, ranges from network expansion, optimization to devops. I also architected and built out our first SaaS (crypto swap service) while involved heavily in a b2b DID (decentralized identity) project at the same time. really had a blast here.</p>
            </div>
            <br />
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="font-medium text-base">Phoenix Silicon International Corporation</h3>
                <span className="text-sm text-gray-600 mt-1 sm:mt-0">Aug.2022 - Jan.2024</span>
              </div>
              <p className="text-gray-600 mb-1 text-sm">Software Engineer</p><br />
              <p className="text-gray-600 text-sm">I led the complete overhaul of the electronic wafer map (eMap) processing system. it aggregated multiple data sources while supporting overlaying, rotating, tagging, etc. I also built a library straight from machine specs supporting over a dozen wafer formats processing. hard but prideful work here.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">education</h2>
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
