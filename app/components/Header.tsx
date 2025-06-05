"use client";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-primary-600">
            Simple Bit Design
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#services"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#process"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Process
            </a>
            <a
              href="#work"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              About
            </a>
            <a href="#contact" className="btn-primary">
              Get Started
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a
                href="#services"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Services
              </a>
              <a
                href="#process"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Process
              </a>
              <a
                href="#work"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="btn-primary inline-block text-center"
              >
                Get Started
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
