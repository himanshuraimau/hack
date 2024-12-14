import Navbar from "@/components/landingpage/navbar"
import Pricing from "@/components/landingpage/pricing"
import Features from "@/components/landingpage/features"
import Hero from "@/components/landingpage/hero"
import Footer from "@/components/footer"

export default function Home() {
  return (
  <div>
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  </div>
  )
}
