export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "Understand your business goals, target users, and technical constraints through strategic workshops.",
      color: "bg-primary-100 text-primary-600",
    },
    {
      number: "02",
      title: "Research & Strategy",
      description:
        "Analyze competitors, validate assumptions, and create a user-centered product strategy.",
      color: "bg-green-100 text-green-600",
    },
    {
      number: "03",
      title: "Design & Prototype",
      description:
        "Create wireframes, high-fidelity designs, and interactive prototypes for testing.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      number: "04",
      title: "Test & Refine",
      description:
        "Validate designs with real users, iterate based on feedback, and prepare for development.",
      color: "bg-accent-100 text-accent-600",
    },
  ];

  return (
    <section id="process" className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Simple Bit Design works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A proven process refined through dozens of successful projects.
            Transparent, collaborative, and focused on results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${step.color} font-bold text-lg mb-6`}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
