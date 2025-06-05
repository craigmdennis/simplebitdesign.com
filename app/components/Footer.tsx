export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">Simple Bit Design</div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transforming startup ideas into fundable products through expert
              product design.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://craigmdennis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Portfolio
              </a>
              <a
                href="https://linkedin.com/in/craigmdennis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/craigmdennis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Product Strategy
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  UX/UI Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Prototyping
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Design Systems
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="hover:text-white transition-colors"
                >
                  Process
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Simple Bit Design. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            Based in Sweden • Available worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
