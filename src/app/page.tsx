import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import BackToTop from '@/components/ui/BackToTop'
import AnimatedBackground from '@/components/ui/AnimatedBackground' 

import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Education from '@/sections/Education'
import Certifications from '@/sections/Certifications'
import Goals from '@/sections/Goals'
import Interests from '@/sections/Interests'
import Contact from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Goals />
        <Interests />
        <Contact />
      </main>
      
      <Footer />
      <BackToTop />
    </>
  )
}