export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Hi, I'm Craig Dennis
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              I'm a product designer with a passion for helping technical
              founders transform their ideas into products that users love and
              investors fund.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Currently working at Smith.ai, I've helped design products that
              serve thousands of users and have contributed to millions in
              funding rounds. I understand both the technical constraints and
              business pressures that startups face.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              My approach combines strategic thinking with hands-on design
              execution. I don't just make things look pretty—I solve problems
              that drive business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary">
                Let's Work Together
              </a>
              <a
                href="https://craigmdennis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View Full Portfolio
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">
              What I bring to your project
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white/20 rounded-lg p-2 mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Technical Understanding
                  </h4>
                  <p className="text-white/90">
                    I speak developer and understand technical constraints
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 rounded-lg p-2 mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Fast Iteration</h4>
                  <p className="text-white/90">
                    Quick turnaround times without compromising quality
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 rounded-lg p-2 mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Data-Driven Decisions</h4>
                  <p className="text-white/90">
                    Every design choice backed by user research and metrics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
