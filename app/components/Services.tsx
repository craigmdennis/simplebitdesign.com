export default function Services() {
  const services = [
    {
      title: "Product Strategy",
      description:
        "Define your product vision, user personas, and feature roadmap based on market research and user insights.",
      icon: "🎯",
    },
    {
      title: "UX/UI Design",
      description:
        "Create intuitive, conversion-focused designs that users love and that support your business goals.",
      icon: "🎨",
    },
    {
      title: "Prototyping",
      description:
        "Build interactive prototypes to test ideas quickly and validate concepts before development.",
      icon: "⚡",
    },
    {
      title: "Design System",
      description:
        "Establish consistent design patterns and components that scale with your growing team.",
      icon: "🔧",
    },
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            End-to-end product design
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From initial concept to polished product ready for launch. I handle
            the complete design process so you can focus on building and
            growing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
