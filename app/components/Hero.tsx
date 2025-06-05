export default function Hero() {
  return (
    <section className="section-padding pt-32 bg-gradient-to-br from-primary-50 to-white">
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Transform your startup idea into a{" "}
            <span className="text-primary-600">fundable product</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-slide-up">
            Expert product design from prototype to your first 1000 users. I
            help technical founders build products that users love and investors
            fund.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <a href="#contact" className="btn-primary">
              Start Your Project
            </a>
            <a href="#work" className="btn-secondary">
              View My Work
            </a>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-3xl transform rotate-1"></div>
          <div className="relative bg-white rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  $2M+
                </div>
                <div className="text-gray-600">Raised by clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  50K+
                </div>
                <div className="text-gray-600">Users reached</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  95%
                </div>
                <div className="text-gray-600">Client satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
