import Link from 'next/link'
import { Linkedin, Twitter, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className=" text-white"  style={{
        background: "linear-gradient(to right, #0b1d35, #0f6a92)",
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Transform your supply chain performance
          </h2>
          <p className="text-lg mb-8">
            Book your free consultation today to start moving your business forward.
          </p>
          <Link href="/signup">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-500 hover:text-white font-semibold px-8"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Legal Text */}
        <div className="text-sm text-center mb-8 text-blue-100">
          <p>Supply chain services are provided by Freshtrack International Limited</p>
        </div>

        {/* Links and Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
              <span>© Freshtrack {new Date().getFullYear()}</span>
              <Link href="/terms" className="hover:underline">
                Terms and Conditions
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/code-of-conduct" className="hover:underline">
                Code of Conduct
              </Link>
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-6">
              <Link 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

