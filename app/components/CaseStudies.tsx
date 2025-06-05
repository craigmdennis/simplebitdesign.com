export default function CaseStudies() {
  const cases = [
    {
      title: "AI Voice Assistant Platform",
      description:
        "Redesigned Smith.ai's voice assistant interface, improving user engagement by 40% and reducing support tickets by 25%.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      tags: ["AI/ML", "Voice UI", "B2B SaaS"],
      link: "https://craigmdennis.com/portfolio/building-the-next-generation-of-ai-voice-assisant/",
    },
    {
      title: "Sales Automation Platform",
      description:
        "Streamlined complex sales workflows into an intuitive interface, helping sales teams close 30% more deals.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["Sales Tech", "Automation", "Dashboard"],
      link: "https://craigmdennis.com/portfolio/automating-sales-outreach/",
    },
  ];

  return (
    <section id="work" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Products I've designed that helped startups raise funding and reach
            their first thousand users.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {cases.map((caseStudy, index) => (
            <div key={index} className="group">
              <div className="overflow-hidden rounded-xl mb-6">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {caseStudy.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {caseStudy.title}
              </h3>
              <p className="text-gray-600 mb-6">{caseStudy.description}</p>
              <a
                href={caseStudy.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                View Case Study
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
