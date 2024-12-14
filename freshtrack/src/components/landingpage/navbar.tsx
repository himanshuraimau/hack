"use client";
import Link from 'next/link'

export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600">Freshtrack</span>
          </div>
          <div className="flex items-center gap-10">
            <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-xl font-medium">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-xl font-medium">
              Pricing
            </button>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-xl font-medium">
              Login
            </Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-3">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

