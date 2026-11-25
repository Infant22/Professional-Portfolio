import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ClydeHero } from './components/sections/ClydeHero'
import { ClydeAbout } from './components/sections/ClydeAbout'
import { ClydeSkills } from './components/sections/ClydeSkills'
import { ClydeProjects } from './components/sections/ClydeProjects'
import { ClydeExperience } from './components/sections/ClydeExperience'
import { ClydeContact } from './components/sections/ClydeContact'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-[#a1a480]/20 selection:text-gray-900">
      {/* Clyde Sticky Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Clyde Hero Section */}
        <ClydeHero />

        {/* Clyde About Section */}
        <ClydeAbout />

        {/* Clyde Skills Section */}
        <ClydeSkills />

        {/* Clyde Projects Section */}
        <ClydeProjects />

        {/* Clyde Experience Section */}
        <ClydeExperience />

        {/* Clyde Contact Section */}
        <ClydeContact />
      </main>

      {/* Clyde Minimalist Footer */}
      <Footer />
    </div>
  )
}
